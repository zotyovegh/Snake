import React, { Component } from "react";
import "./index.css";
import Body from "./Objects/Body";
import Food from "./Objects/Food";

//Each snake body element should have an x and y coordinate

class Game extends Component {
  state = {
    food: [
      Math.floor((Math.random() * (98 - 1 + 1) + 1) / 2) * 2,
      Math.floor((Math.random() * (98 - 1 + 1) + 1) / 2) * 2,
    ],
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
        <Food position={this.state.food} />
      </div>
    );
  }
}

export default Game;
