import React from "react";
// import "./sass/style.scss";

function Button(props) {
  return (
  <button onClick={props.handleBtnClick} {...props}>{props.value}</button>
  );
}

export default Button;
