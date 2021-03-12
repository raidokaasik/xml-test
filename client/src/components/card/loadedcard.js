import React from "react";
import Tag from "./tag/tag";
import dateCalculator from "../../utils/dateCalculator";
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
        <div>
          <input type="text" value={title} name="title" onChange={edit} />
          <input type="text" value={author} name="author" onChange={edit} />
          <button onClick={submit}>save</button>
        </div>
      ) : (
        <div className={classes.titleNauthor}>
          <p>{title}</p>
          <p>{author}</p>
          <p>{dateCalculator(date)}</p>
        </div>
      )}
      <div className={classes.deleteEditOverlay}>
        <button onClick={edit}>Edit</button>
        <button onClick={remove}>X</button>
      </div>
    </div>
  );
};

export default Loadedcard;
