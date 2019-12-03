import React from "react";

import "./Button.css";

function Button(props) {
  return (
      <a href={`${props.href}`}>
        <button className={`${props.className}`}>{props.buttonText}</button>
      </a>
  );
}

export default Button;
