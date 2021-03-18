import React, { Fragment } from "react";
import Loader from "../loader/loader";
import cleanName from "../../utils/cleanName";
import Tag from "../card/tag/tag";
import classes from "./modal.module.css";

const modal = ({
  show,
  image,
  title,
  content,
  date,
  tag,
  loading,
  author,
  excerpt,
}) => {
  const newDate = new Date(Date.parse(date));

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
                  <div className={classes.leadImage}>
                    <div className={classes.tag}>
                      <Tag name={tag} />
                    </div>
                    <img src={image} alt="lead_image" />
                  </div>
                  <h1>{title}</h1>
                  <p className={classes.articleDate}>
                    {newDate.toLocaleString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className={classes.author}>
                    {author ? "by " + cleanName(author) : null}
                  </p>
                  <p className={classes.excerpt}>{excerpt}</p>
                </div>

                <div className={classes.content}>{content}</div>
              </Fragment>
            )}
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default modal;
