import React from "react";
import classes from "./tag.module.css";

const tag = ({ name, small, onClick, disabled }) => {
  let color = "";
  switch (name) {
    case "Trends":
      color = "#e32d64";
      break;
    case "Google":
    case "Google Drive":
    case "Google Photos":
    case "Google One":
    case "Google Pixel":
      color = "#b0614c";
      break;
    case "Digital Marketing":
      color = "#853fe0";
      break;
    case "Security":
      color = "#3243b8";
      break;
    case "Privacy":
      color = "#3ead90";
      break;
    case "Technology":
    case "IT":
    case "Enterprise Tech":
    case "Business Technology":
      color = "#2faeed";
      break;
    case "OCR":
      color = "#f0de1f";
      break;
    case "Artificial Intelligence":
      color = "#f0de1f";
      break;
    case "Machine Learning":
      color = "#f0de1f";
      break;
    case "Enterprise":
      color = "#f0de1f";
      break;
    case "Retail":
      color = "#f0de1f";
      break;
    case "eCommerce":
      color = "#f0de1f";
      break;
    case "Advertising":
      color = "#f0de1f";
      break;
    case "Authentication":
      color = "#f0de1f";
      break;
    default:
      break;
  }
  const tag = (
    <div
      onClick={onClick}
      className={classes.container}
      style={{ backgroundColor: color }}
    >
      <p>{name}</p>
      {small ? <i className="fas fa-play"></i> : null}
    </div>
  );
  const button = (
    <button
      disabled={disabled}
      onClick={onClick}
      className={classes.containerSmall}
      style={{ backgroundColor: color }}
    >
      <p>{name}</p>
      {small ? <i className="fas fa-play"></i> : null}
    </button>
  );

  return small ? button : tag;
};

export default tag;
