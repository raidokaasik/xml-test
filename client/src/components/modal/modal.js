import React, { Fragment } from "react";
import classes from "./modal.module.css";

const modal = ({ clicked, show, image, title, date, body }) => {
  return (
    <Fragment>
      {show ? (
        <div className={classes.wrapper}>
          <div className={classes.container}>
            <button onClick={clicked}>X</button>
            <div className={classes.leadImage}>
              <img src={image} alt="lead_image" />
            </div>
            {title}
            <div className={classes.body}>{body}</div>
            {date}
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default modal;
