import React from "react";
import Tag from "./tag/tag";
import dateCalculator from "../../utils/dateCalculator";
import cleanName from "../../utils/cleanName";
import Button from "../button/button";
import Input from "../input/input";
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
  const desc =
    description.length >= 100
      ? `${description.substring(0, 100)}...`
      : description;
  const creator = cleanName(author) === null ? "" : `by ${cleanName(author)}`;
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
      {/* {editing ? (
        <div className={classes.titleNauthorEdit}>
          <input type="text" value={title} name="title" onChange={edit} />
          <input type="text" value={author} name="author" onChange={edit} />
        </div>
      ) : ( */}
      <div className={classes.titleNauthor}>
        {editing ? (
          <Input value={title} changed={edit} name="title" />
        ) : (
          <p>{title}</p>
        )}
        <section>
          {editing ? (
            <Input value={description} changed={edit} name="excerpt" />
          ) : (
            desc
          )}
        </section>
        <div className={classes.dateNAuthor}>
          <p>{creator}</p>
          <span>
            <p>{dateCalculator(date)} ago</p>
          </span>
        </div>
      </div>
      {/* )} */}
      <div className={classes.deleteEditOverlay}>
        {editing ? (
          <Button clicked={submit} name="Save" type="save" />
        ) : (
          <Button clicked={edit} name="Edit" type="edit" />
        )}
        <Button clicked={remove} type="delete" />
      </div>
    </div>
  );
};

export default Loadedcard;
