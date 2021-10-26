import { Paper, InputBase, Button, IconButton } from "@material-ui/core";
import React, { useState, useContext } from "react";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles, fade } from "@material-ui/core/styles";
import StoreApi from "../../../utils/storeApi";

const useStyle = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(0, 1, 1, 1),
    paddingBottom: theme.spacing(4),
  },
  input: {
    margin: theme.spacing(1),
  },
  btnconfirm: {
    background: "green",
    color: "#fff",
    "&:hover": {
      background: fade("#5AAC44", 0.75),
    },
  },
  confirm: {
    margin: theme.spacing(0, 1, 1, 1),
  },
}));
function InputCard({ setOpen, listId, type }) {
  const classes = useStyle();
  const [title, setTitle] = useState("");
  const { addMoreCard, addMoreList } = useContext(StoreApi);
  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };
  const handleBtnConfirm = () => {
    if (type === "card") {
    console.log("abc");

      addMoreCard(title, listId);
      setTitle("");
      setOpen(false);
    } else {
      addMoreList(title);
      setTitle("");
      setOpen(false);
    }
  };

  return (
    <div>
      <div>
        <Paper className={classes.card}>
          <InputBase
            onChange={handleOnChange}
            multiline
            onBlur={() => setOpen(false)}
            fullwidth
            inputProps={{ className: classes.input }}
            value={title}
            placeholder={
              type === "card"
                ? "Enter title of this card..."
                : "Enter list title..."
            }
          ></InputBase>
        </Paper>
      </div>
      <div className={classes.confirm} >
        <Button className={classes.btnconfirm} onClick={handleBtnConfirm} >
          {type === "card" ? "Add Card" : "Add List"}
        </Button>
        <IconButton onClick={() => setOpen(false)}>
          <ClearIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default InputCard;
