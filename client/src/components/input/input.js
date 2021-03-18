import React from "react";
import classes from "./input.module.css";

const input = ({ changed, value, name }) => {
  return (
    <div className={classes.input}>
      <span>
        <i className="far fa-edit"></i>
        <input type="text" value={value} name={name} onChange={changed} />
      </span>
    </div>
  );
};

export default input;
