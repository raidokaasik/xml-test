import React from "react";
import classes from "./newsHeader.module.css";

const newsHeader = ({ closeButton, showButton }) => {
  return (
    <div className={classes.headerContainer}>
      <div className={classes.header}>
        <h1>News</h1>
        {showButton ? (
          <button className={classes.closeButton} onClick={closeButton}>
            <i class="fas fa-times"></i>
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default newsHeader;
