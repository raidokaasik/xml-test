import React, { Fragment } from "react";
import classes from "./blackscreen.module.css";

const blackscreen = (props) => {
  return (
    <Fragment>
      {props.show ? (
        <div className={classes.container} onClick={props.clicked}></div>
      ) : null}
    </Fragment>
  );
};
export default blackscreen;
