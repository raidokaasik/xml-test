import React, { Fragment } from "react";
import classes from "./modal.module.css";

const modal = (props) => {
  return (
    <Fragment>
      {props.show ? (
        <div className={classes.wrapper}>
          <div className={classes.container}>
            <button onClick={props.clicked}>X</button>
            <div className={classes.leadImage}>
              <img src={props.image} alt="lead_image" />
            </div>
            {props.title}
            <div className={classes.body}>{props.body}</div>
            {props.date}
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default modal;
