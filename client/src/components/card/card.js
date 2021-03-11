import React from "react";
import Loader from "../loader/loader";
import classes from "./card.module.css";

const Card = ({ title, content, id, close, add, loading, author, date }) => {
  return (
    <div className={classes.cardWrapper}>
      {loading ? (
        <Loader />
      ) : (
        <div className={classes.card}>
          {/* Remove button */}
          <div className={classes.deleteEditOverlay}>
            <button onClick={close}>X</button>
          </div>
          <button onClick={add}>Load</button>
          <h3>{title}</h3>
          <p>{content}</p>
          <p>{author}</p>
          <p>{date}</p>
        </div>
      )}
    </div>
  );
};

export default Card;
