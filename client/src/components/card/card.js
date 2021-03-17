import React, { Fragment } from "react";
import Loader from "../loader/loader";
import dateCalculator from "../../utils/dateCalculator";
import cleanName from "../../utils/cleanName";
import Tag from "./tag/tag";
import classes from "./card.module.css";

const Card = ({
  pushingInProgress,
  loaded,
  loadDetails,
  contentLoading,
  title,
  author,
  date,
  categories,
  subMenuRender,
  id,
}) => {
  const subMenu = (
    <Fragment>
      <Tag
        disabled={pushingInProgress}
        name="Trends"
        small
        onClick={pushingInProgress ? null : loadDetails}
      />
      {categories
        ? categories.map((item, index) => (
            <Tag
              disabled={pushingInProgress}
              key={index}
              onClick={() => {
                return pushingInProgress ? null : subMenuRender(item, id, date);
              }}
              name={item._}
              small
              loaded={item.loaded}
            />
          ))
        : null}
    </Fragment>
  );
  const headLine =
    title.substring(0, 1).toUpperCase() + title.substring(1).toLowerCase();

  return (
    <div className={classes.data}>
      <div className={classes.content}>
        {contentLoading ? (
          <Loader />
        ) : (
          <Fragment>
            <div className={classes.header}>
              <p>
                {headLine.length > 50
                  ? `${headLine.substring(0, 50) + "..."}`
                  : `${headLine}`}
              </p>
            </div>
            <div className={classes.cut}></div>
            <div className={classes.subMenu}>{subMenu}</div>

            <div className={classes.dateNAuthor}>
              {/* <p>
                {cleanName(author) === null ? null : `by ${cleanName(author)}`}
              </p> */}
              <span>
                <h5>{dateCalculator(date)} ago</h5>
              </span>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Card;
