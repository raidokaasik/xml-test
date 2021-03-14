import React from "react";
import classes from "./button.module.css";

const button = ({ clicked, editing, submit, name }) => {
  return (
    <div className={classes.button}>
      <button onClick={clicked}>{name}</button>
    </div>
  );
};

export default button;
