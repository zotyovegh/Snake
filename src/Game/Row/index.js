import React from "react";
import Position from "../Position/Position"

const Row = (props) => {
  let rows = props.cells.map((data, index) => {
    return (
      <Position key={index} data={data} />
    );
  });

  return <div className="row">{positions}</div>
}
export default Row;