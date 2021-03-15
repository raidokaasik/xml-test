import React from "react";
import Search from "../../searchInput/searchInput";
import classes from "./myFeedHeader.module.css";

const header = ({ changed, sorter, sortLatest }) => {
  return (
    <div className={classes.header}>
      <h1>My Feed</h1>
      <div className={classes.sorter} onClick={sorter}>
        {!sortLatest ? (
          <i className="fas fa-arrow-up"></i>
        ) : (
          <i className="fas fa-arrow-down"></i>
        )}
        <p>sort</p>
      </div>
      <Search changed={changed} />
    </div>
  );
};

export default header;
