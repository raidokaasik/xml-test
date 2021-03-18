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
    case "Privacy":
    case "Security":
    case "Authentication":
    case "Identity":
      color = "#3243b8";
      break;
    case "Codes":
    case "Nginx":
    case "Kubernetes":
      color = "#3ead90";
      break;
    case "Technology":
    case "IT":
    case "OCR":
      color = "#2faeed";
      break;
    case "Machine Learning":
    case "Artificial Intelligence":
      color = "#d9b31c";
      break;

    case "Enterprise Tech":
    case "Business Technology":
    case "Enterprise":
    case "Grant Writing":
      color = "#24d146";
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
    case "The Web":
    case "Web Applications":
    case "Microservices":
    case "Software Development":
      color = "#e8721e";
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
