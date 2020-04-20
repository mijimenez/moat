import React from "react";
import "./sass/style.scss";

function Button(props) {
  return (
    <button {...props}>
      {props.value}
    </button>
  );
}

export default Button;
