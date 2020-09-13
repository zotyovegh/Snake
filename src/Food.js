import React from "react";

export default (props) => {
  const position = {
    top: `${props.position[1]}%`,
    left: `${props.position[0]}%`,
  };
  return <div className="food" style={position}></div>;
};
