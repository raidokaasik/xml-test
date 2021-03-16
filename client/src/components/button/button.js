import React from "react";
import classes from "./button.module.css";

const button = ({ clicked, editing, submit, name, type }) => {
  const icon =
    type === "delete" ? (
      <i className="far fa-trash-alt"></i>
    ) : type === "edit" ? (
      <i className="far fa-edit"></i>
    ) : type === "save" ? (
      <i className="far fa-save"></i>
    ) : null;
  const text = name ? <p>{name}</p> : null;
  return (
    <button className={classes.button} onClick={clicked}>
      {icon}
      {text}
    </button>
  );
};

export default button;
