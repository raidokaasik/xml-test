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
    description.length >= 85
      ? `${description.substring(0, 85)}...`
      : description;
  const creator = cleanName(author) === null ? "" : `by ${cleanName(author)}`;
  return (
    <div className={classes.loadedCard}>
      <Tag name={tag} />
      <div className={classes.imageWrapper}>
        <img
          className={classes.image}
          src={image}
          alt="feed_image"
          onClick={loadFull}
        />
      </div>
      <div className={classes.titleNauthor}>
        {editing ? (
          <Input value={title} changed={edit} name="title" />
        ) : (
          <p onClick={loadFull}>{title}</p>
        )}
        <section>
          {editing ? (
            <Input value={description} changed={edit} name="excerpt" />
          ) : (
            <p onClick={loadFull}>{desc}</p>
          )}
        </section>
        <div className={classes.dateNAuthor}>
          <p>{creator}</p>
          <span>
            <p>{dateCalculator(date)} ago</p>
          </span>
        </div>
      </div>
      <div className={classes.deleteEditOverlay}>
        {editing ? (
          <Button clicked={submit} type="save" />
        ) : (
          <Button clicked={edit} type="edit" />
        )}
        <Button clicked={remove} type="delete" />
      </div>
    </div>
  );
};

export default Loadedcard;
