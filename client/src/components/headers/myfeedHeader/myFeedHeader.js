import React from "react";
import Search from "../../searchInput/searchInput";
import classes from "./myFeedHeader.module.css";

const header = ({ changed, sorter, sortLatest, menuOnClick }) => {
  return (
    <div className={classes.feedHeaderContainer}>
      <div className={classes.header}>
        <section>
          <button onClick={menuOnClick} className={classes.newsMenuButton}>
            <i className="fas fa-bars"></i>
          </button>
          <h1>My Feed</h1>
        </section>
        <div className={classes.sorter}>
          <span onClick={sorter}>
            {!sortLatest ? (
              <i className="fas fa-arrow-up"></i>
            ) : (
              <i className="fas fa-arrow-down"></i>
            )}
            <p>sort</p>
          </span>
          <Search changed={changed} />
        </div>
      </div>
    </div>
  );
};

export default header;
