import React from "react";
import classes from "./tag.module.css";

const tag = ({ name }) => {
  let color = "";
  switch (name) {
    case "Trends":
      color = "#d938a3";
      break;
    case "Google":
    case "Google Drive":
    case "Google Photos":
    case "Google One":
    case "Google Pixel":
      color = "#f0de1f";
      break;
    case "Digital Marketing":
      color = "#853fe0";
      break;
    case "Security":
      color = "#3243b8";
      break;
    case "Privacy":
      color = "#32e6b9";
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

  return (
    <div className={classes.container} style={{ backgroundColor: color }}>
      {name}
    </div>
  );
};

export default tag;
