import React, { Fragment } from "react";
import Loader from "../loader/loader";
import classes from "./modal.module.css";

const modal = ({ clicked, show, image, title, date, body, loading }) => {
  return (
    <Fragment>
      {show ? (
        <div className={classes.wrapper}>
          <div className={classes.container}>
            {loading ? (
              <Loader />
            ) : (
              <Fragment>
                <button onClick={clicked}>X</button>
                <div className={classes.leadImage}>
                  <img src={image} alt="lead_image" />
                </div>
                {title}
                <div className={classes.body}>{body}</div>
                {date}
              </Fragment>
            )}
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default modal;
