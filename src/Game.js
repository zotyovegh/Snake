import React, { Component } from "react";
import "./index.css";
import Body from "./Body";

//Each snake body element should have an x and y coordinate

class Game extends Component {
  state = {
    snakeBody: [
      [0, 0],
      [2, 0],
      [4, 0],
    ],
  };

  render() {
    return (
      <div className="board">
        <Body snake_body_element={this.state.snakeBody} />
      </div>
    );
  }
}

export default Game;
