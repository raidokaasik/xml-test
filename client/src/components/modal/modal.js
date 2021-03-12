import React, { Fragment } from "react";
import Loader from "../loader/loader";
import Tag from "../card/tag/tag";
import classes from "./modal.module.css";

const modal = ({
  clicked,
  show,
  image,
  title,
  content,
  date,
  tag,
  body,
  loading,
  author,
}) => {
  return (
    <Fragment>
      {show ? (
        <div className={classes.wrapper}>
          <div className={classes.container}>
            {loading ? (
              <Loader />
            ) : (
              <Fragment>
                <div className={classes.modalHeader}>
                  <div className={classes.tag}>
                    <Tag name={tag} />
                  </div>
                  <div className={classes.leadImage}>
                    <img src={image} alt="lead_image" />
                  </div>
                  <p>{title}</p>
                  <button onClick={clicked}>X</button>
                </div>
                <div className={classes.body}>{body}</div>
                <div className={classes.content}>{content}</div>
                <p>{date}</p>
                <p>{author}</p>
              </Fragment>
            )}
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default modal;
