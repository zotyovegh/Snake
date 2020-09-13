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
    direction: "RIGHT",
  };

  render() {
    return (
      <div className="board">
        <Body snake_body_element={this.state.snakeBody} />
        <Food position={this.state.food} />
      </div>
    );
  }

  componentDidMount() {
    setInterval(this.movement, 150);
    document.onkeydown = this.onKeyPressed;
  }

  movement = () => {
    let bodyElements = [...this.state.snakeBody];
    let head = bodyElements[bodyElements.length - 1];

    switch (this.state.direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
    }

    bodyElements.push(head);
    bodyElements.shift();
    this.setState({
      snakeBody: bodyElements,
    });
  };

  onKeyPressed = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 39:
        this.setState({ direction: "RIGHT" });
        break;
      case 37:
        this.setState({ direction: "LEFT" });
        break;
      case 40:
        this.setState({ direction: "DOWN" });
        break;
      case 38:
        this.setState({ direction: "UP" });
        break;
    }
  };
}

export default Game;
