import React from "react";

export default (props) => {
  return (
    <div>
      {props.snake_body_element.map((element, i) => {
        const position = {
          top: `${element[1]}%`,
          left: `${element[0]}%`,
        };
        return (
          <div className="snake_body_element" key={i} style={position}></div>
        );
      })}
    </div>
  );
};
