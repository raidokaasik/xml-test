import React from "react";
import Search from "../../searchInput/searchInput";
import Cut from "../../UIelements/cutline/cut";
import classes from "./myFeedHeader.module.css";

const header = ({ changed, sorter, sortLatest, menuOnClick }) => {
  return (
    <div className={classes.feedHeaderContainer}>
      <div className={classes.header}>
        <section>
          <button onClick={menuOnClick} className={classes.newsMenuButton}>
            <i class="fas fa-bars"></i>
          </button>
          <h1>My Feed</h1>
        </section>
        <div className={classes.sorter}>
          {!sortLatest ? (
            <i className="fas fa-arrow-up"></i>
          ) : (
            <i className="fas fa-arrow-down"></i>
          )}
          <p onClick={sorter}>sort</p>
          <Search changed={changed} />
        </div>
      </div>
    </div>
  );
};

export default header;
