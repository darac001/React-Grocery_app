import React from "react";

const Alert = ({ type, message, removeAlert, list }) => {
  

  return (
    // use backticks!
    <p className={`alert alert-${type}`}>{message}</p>
  );
};

export default Alert;
