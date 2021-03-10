import React from "react";
import classes from "./loadedcard.module.css";

const Loadedcard = ({ image, title, author, loadFull, remove }) => {
  return (
    <div className={classes.card}>
      <div>
        <div className={classes.tag}>tag</div>
        <div className={classes.imageWrapper}>
          <img className={classes.image} src={image} alt="feed_image" />
        </div>
        <p>{title}</p>
        <p>{author}</p>
        <button onClick={loadFull}>Load Modal</button>
        <button onClick={remove}>X</button>
      </div>
    </div>
  );
};

export default Loadedcard;
