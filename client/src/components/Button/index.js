import React from "react";
// import "./style.css";

function Button(props) {
  return (
  <button onClick={props.handleBtnClick} {...props}>{props.value}</button>
  );
}

export default Button;
