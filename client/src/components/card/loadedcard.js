import React, {Fragment} from "react";
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
  error,
}) => {
  const errorMessage = <p>Content could not be loaded</p>;
  return (
    <div className={classes.card}>
      {/* <div className={classes.tag}>tag</div> */}
      {error ? (
        errorMessage
      ) : (
        <Fragment>
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
            </div>
          )}
          <div className={classes.deleteEditOverlay}>
            <button onClick={edit}>Edit</button>
            <button onClick={remove}>X</button>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Loadedcard;
