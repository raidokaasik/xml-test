import React from "react";
import classes from "./card.module.css";

const Card = ({title, content, id, close, add}) => {
  return (
    <div className={classes.card}>
      {/* Remove button */}
      <div className={classes.deleteEditOverlay}>
        <button onClick={close}>X</button>
      </div>
      <button onClick={add}>Load</button>
      <p>{title}</p>
      <div className={classes.contentContainer}>BOX</div>
      <p>{content}</p>
    </div>
  );
};

export default Card;
