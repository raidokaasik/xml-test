import React from "react";
import classes from "./searchInput.module.css";

const search = ({ changed }) => {
  return (
    <div className={classes.searchBar}>
      <span>
        <i className="fas fa-search"></i>
        <input type="text" placeholder="Categories" onChange={changed}></input>
      </span>
    </div>
  );
};

export default search;
