import React from "react";
import Tag from "./tag/tag";
import dateCalculator from "../../utils/dateCalculator";
import cleanName from "../../utils/cleanName";
import Button from "../../components/button/button";
import classes from "./loadedcard.module.css";

const Loadedcard = ({
  image,
  title,
  author,
  loadFull,
  remove,
  edit,
  editing,
  submit,
  tag,
  date,
  description,
}) => {
  return (
    <div className={classes.card}>
      <Tag name={tag} />
      <div className={classes.imageWrapper}>
        <img
          className={classes.image}
          src={image}
          alt="feed_image"
          onClick={loadFull}
        />
      </div>
      {editing ? (
        <div className={classes.titleNauthorEdit}>
          <input type="text" value={title} name="title" onChange={edit} />
          <input type="text" value={author} name="author" onChange={edit} />
        </div>
      ) : (
        <div className={classes.titleNauthor}>
          <p>{title}</p>
          <section>
            {description.length >= 100
              ? `${description.substring(0, 100)}...`
              : description}
          </section>
          <div className={classes.dateNAuthor}>
            <p>
              {cleanName(author) === null ? null : `by ${cleanName(author)}`}
            </p>
            <span>
              <p>{dateCalculator(date)} ago</p>
            </span>
          </div>
        </div>
      )}
      <div className={classes.deleteEditOverlay}>
        {editing ? (
          <Button clicked={submit} name="Save" />
        ) : (
          <Button clicked={edit} name="Edit" />
        )}
        <Button clicked={remove} name="X" />
      </div>
    </div>
  );
};

export default Loadedcard;
