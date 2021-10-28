import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import InputContainer from "./component/List/Input/InputContainer";
import List from "./component/List/List";
import Store from "./utils/store";
import StoreApi from "./utils/storeApi";
import { makeStyles } from "@material-ui/core/styles";
import { DragDropContext } from "react-beautiful-dnd";
const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
    background: "#1c4966",
    overflowY: "auto",
  },
}));
function App() {
  const [data, setData] = useState(Store);
  const classes = useStyle();
  const addMoreCard = (title, listId) => {
    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      title,
    };
    const list = data.lists[listId];
    list.cards = [...list.cards, newCard];
    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    };
    setData(newState);
  };
  const addMoreList = (title) => {
    const newListId = uuid();
    console.log(newListId);
    const newlist = {
      id: newListId,
      title,
      cards: [],
    };
    const newState = {
      listIds: [...data.listIds, newListId],
      lists: {
        ...data.lists,
        [newListId]: newlist,
      },
    };
    setData(newState);
  };
  const updateListTitle = (title, listId) => {
    const list = data.lists[listId];
    list.title = title;
    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    };
    setData(newState);
  };
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    console.log(destination, source, draggableId);
    if (!destination) {
      return;
    }
    const sourceList = data.lists[source.droppableId];
    const destinatonList = data.lists[destination.droppableId];
    const draggingCard = sourceList.cards.filter(
      (card) => card.id === draggableId
    )[0];

    if (source.droppableId === destination.droppableId) {
      sourceList.cards.splice(source.index, 1);
      destinatonList.cards.splice(destination.index, 0, draggingCard);
      const newSate = {
        ...data,
        listd: {
          ...data.lists,
          [sourceList.id]: destinatonList,
        },
      };
      setData(newSate);
    } else {
      sourceList.cards.splice(source.index, 1);
      destinatonList.cards.splice(destination.index, 0, draggingCard);
      const newState={
        ...data,
        lists:{
          ...data.lists,
          [sourceList.id]:sourceList,
          [destinatonList.id]:destinatonList
        }
      }
      setData(newState);
    }
  };
  return (
    <StoreApi.Provider value={{ addMoreCard, addMoreList, updateListTitle }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={classes.root}>
          {data.listIds.map((listId) => {
            const list = data.lists[listId];
            return <List list={list} key={listId} />;
          })}
          <InputContainer type="list" />
        </div>
      </DragDropContext>
    </StoreApi.Provider>
  );
}

export default App;
