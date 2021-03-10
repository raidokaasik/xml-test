import React from "react";
import classes from "./editcard.module.css";

const Editcard = ({ value, submit, name }) => {
  return (
    <div className={classes.card}>
      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Put it here"
          name={name}
          value={value}
        />
        <input type="submit" name="save" value="save" />
      </form>
    </div>
  );
};

export default Editcard;
