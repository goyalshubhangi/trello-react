import React, { useContext, useState } from "react";
import { Typography, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import storeApi from "../../utils/storeApi";
const useStyle = makeStyles((theme) => ({
  editableTitleContainer: {
    margin: theme.spacing(1),
    display: "flex ",
  },
  editableTitle: {
    marginLeft: theme.spacing(1),
    flexGrow: 1,
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  input: {
    margin: theme.spacing(1),
    "&:focus": {
      backgroundColor: "#ddd",
      fontSize: "1.2rem",
      fontWeight: "bold",
    },
  },
}));
function Title({ title,listId }) {
  const [newTitle, setNewTitle] = useState(title);
  const { updateListTitle } = useContext(storeApi);
  const [open, setOpen] = useState(title);
  const classes = useStyle();
  const handleOnChange = (e) => {
    setNewTitle(e.target.value);
  };
  const handleOnBlur = () => {
    setOpen(false);
    updateListTitle(newTitle,listId);
  };
  return (
    <div>
      {open ? (
        <div>
          <InputBase
            onChange={handleOnChange}
            value={newTitle}
            autoFocus
            inputProps={{
              className: classes.input,
            }}
            fullWidth
            onBlur={handleOnBlur}
          />
        </div>
      ) : (
        <div className={classes.editableTitleContainer}>
          <Typography
            onClick={() => setOpen(!open)}
            className={classes.editableTitle}
          >
            {" "}
            {title}
          </Typography>
          <MoreHorizIcon />
        </div>
      )}
    </div>
  );
}
export default Title;
