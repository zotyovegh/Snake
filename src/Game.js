import React, { Component } from "react";
import "./index.css";
import Body from "./Objects/Body";
import Food from "./Objects/Food";
import WinningDialog from "./Winningdialog";

import Highscore from "./Highscore";

//Each snake body element should have an x and y coordinate
const startingGrid = [
  [0, 0],
  [4, 0],
  [8, 0],
];
class Game extends Component {
  state = {
    speed: 150,
    food: this.getStandardFoodCoordinates(),
    snakeBody: startingGrid,
    isWinningDialog: false,
    direction: "RIGHT",
    limit: 0,
  };
  limit = 0;
  previousBody = this.snakeBody;

  reset = () => {
    this.setState({
      speed: 150,
      food: this.getStandardFoodCoordinates(),
      snakeBody: startingGrid,
      isWinningDialog: false,
      direction: "RIGHT",
    });
  };

  getLastValue = (score) => {
    this.limit = score;
  };

  getStandardFoodCoordinates() {
    return [
      Math.floor((Math.random() * (98 - 1 + 1) + 1) / 4) * 4,
      Math.floor((Math.random() * (98 - 1 + 1) + 1) / 4) * 4,
    ];
  }

  getNewFoodCoordinates() {
    let coordinates = this.getStandardFoodCoordinates();
    let bodyElements = [...this.state.snakeBody];
    let status = "good";

    do {
      status = "good";
      for (var i = 0; i < bodyElements.length; i++) {
        let element = bodyElements[i];
        if (coordinates[0] === element[0] && coordinates[1] === element[1]) {
          status = "bad";
        }
      }
      if (status === "bad") {
        coordinates = this.getStandardFoodCoordinates();
      }
    } while (status !== "good");

    return coordinates;
  }

  componentDidMount() {
    setInterval(this.movement, this.state.speed);
    document.onkeydown = this.onKeyPressed;
  }

  checkBorderHit() {
    let head = this.state.snakeBody[this.state.snakeBody.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.gameOver();
    }
  }

  checkBodyElementHit() {
    let bodyElements = [...this.state.snakeBody];
    let head = bodyElements[bodyElements.length - 1];
    bodyElements.pop();
    bodyElements.forEach((bodyElement) => {
      if (head[0] === bodyElement[0] && head[1] === bodyElement[1]) {
        this.gameOver();
      }
    });
  }

  gameOver() {
    this.setState({ speed: 0, snakeBody: this.previousBody });
    this.setState({
      isWinningDialog: true,
    });
  }

  checkIfFoodHit() {
    let head = this.state.snakeBody[this.state.snakeBody.length - 1];
    let food = this.state.food;
    if (food[0] === head[0] && food[1] === head[1]) {
      let newBody = [...this.state.snakeBody];
      newBody.unshift([]);
      this.setState({ snakeBody: newBody, food: this.getNewFoodCoordinates() });
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
      case 68:
      case 99:
        this.setState({ direction: "RIGHT" });
        break;
      case 37:
      case 65:
      case 97:
        this.setState({ direction: "LEFT" });
        break;
      case 40:
      case 83:
      case 98:
        this.setState({ direction: "DOWN" });
        break;
      case 38:
      case 87:
      case 101:
        this.setState({ direction: "UP" });
        break;
    }
  };

  render() {
    return (
      <div className="game">
        <div className="board">
          <Body snake_body_element={this.state.snakeBody} />
          <Food position={this.state.food} />
          <div className="winningDialog">
            <WinningDialog
              category={this.state.category}
              isOpen={this.state.isWinningDialog}
              onClose={(e) => this.setState({ isWinningDialog: false })}
              onNewGame={this.reset}
              score={this.state.snakeBody.length}
              limit={this.limit}
            ></WinningDialog>
          </div>
        </div>
        <div className="highscore">
          <h1 id="title">Snake</h1>
          <Highscore lastValue={this.getLastValue} />
        </div>
      </div>
    );
  }
}

export default Game;
