import React, { Component } from "react";
import "./index.css";
import Body from "./Objects/Body";
import Food from "./Objects/Food";

//Each snake body element should have an x and y coordinate

class Game extends Component {
  state = {
    speed: 150,
    food: this.getFoodCoordinates(),
    snakeBody: [
      [0, 0],
      [4, 0],
      [8, 0],
    ],

    direction: "RIGHT",
  };

  previousBody = this.snakeBody;

  render() {
    return (
      <div className="board">
        <Body snake_body_element={this.state.snakeBody} />
        <Food position={this.state.food} />
      </div>
    );
  }

  getFoodCoordinates() {
    return [
      Math.floor((Math.random() * (98 - 1 + 1) + 1) / 4) * 4,
      Math.floor((Math.random() * (98 - 1 + 1) + 1) / 4) * 4,
    ];
  }

  componentDidMount() {
    setInterval(this.movement, this.state.speed);
    document.onkeydown = this.onKeyPressed;
  }

  checkBorderHit() {
    let head = this.state.snakeBody[this.state.snakeBody.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.setState({ speed: 0, snakeBody: this.previousBody });
    }
  }

  checkBodyElementHit() {
    let bodyElements = [...this.state.snakeBody];
    let head = bodyElements[bodyElements.length - 1];
    bodyElements.pop();
    bodyElements.forEach((bodyElement) => {
      if (head[0] == bodyElement[0] && head[1] == bodyElement[1]) {
        this.setState({ speed: 0, snakeBody: this.previousBody });
      }
    });
  }

  checkIfFoodHit() {
    let head = this.state.snakeBody[this.state.snakeBody.length - 1];
    let food = this.state.food;
    if (food[0] == head[0] && food[1] == head[1]) {
      let newBody = [...this.state.snakeBody];
      newBody.unshift([]);
      this.setState({ snakeBody: newBody, food: this.getFoodCoordinates() });
    }
  }

  movement = () => {
    let bodyElements = [...this.state.snakeBody];
    let head = bodyElements[bodyElements.length - 1];

    switch (this.state.direction) {
      case "RIGHT":
        head = [head[0] + 4, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 4, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 4];
        break;
      case "UP":
        head = [head[0], head[1] - 4];
        break;
    }

    bodyElements.push(head);
    bodyElements.shift();
    if (this.state.speed !== 0) {
      this.previousBody = this.state.snakeBody;
      this.setState({
        snakeBody: bodyElements,
      });
    }
    this.checkBorderHit();
    this.checkBodyElementHit();
    this.checkIfFoodHit();
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
