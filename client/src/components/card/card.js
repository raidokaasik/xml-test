import React from "react";
import Loader from "../loader/loader";
import dateCalculator from "../../utils/dateCalculator";
import cleanName from "../../utils/cleanName";
import classes from "./card.module.css";

const Card = ({
  pushingInProgress,
  loaded,
  loadDetails,
  contentLoading,
  title,
  author,
  date,
}) => {
  const headLine =
    title.substring(0, 1).toUpperCase() + title.substring(1).toLowerCase();

  return (
    <div className={loaded ? classes.dataDisabled : classes.data}>
      {pushingInProgress ? null : (
        <div className={classes.deleteEditOverlay}>
          <div className={classes.add} onClick={loadDetails}>
            <i className="fas fa-play"></i>
          </div>
        </div>
      )}
      {contentLoading ? (
        <Loader />
      ) : (
        <div className={classes.content}>
          <div className={classes.header}>
            <p>
              {headLine.length > 85
                ? `"${headLine.substring(0, 80)}..."`
                : `"${headLine}"`}
            </p>
            {/* <div
              className={pushingInProgress ? classes.addDisabled : classes.add}
              onClick={loadDetails}
            >
              <i className="fas fa-play"></i>
            </div> */}
          </div>
          <div className={classes.cut}></div>
          <div className={classes.dateNAuthor}>
            <p>
              {cleanName(author) === null ? null : `by ${cleanName(author)}`}
            </p>
            <span>
              <h5>{dateCalculator(date)} ago</h5>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
