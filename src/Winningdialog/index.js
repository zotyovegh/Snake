import React, { Component } from "react";
import "./index.css";
//import firebase from "../../firebase";

class WinningDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };

    this.onNameChange = this.onNameChange.bind(this);
  }

  onNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  render() {
    let winningDialog = (
      <div className="winningStyles">
        <div className="Message">
          Congratulations, your score is {this.props.score} !!!
        </div>

        {(this.props.limit === -1 || this.props.limit > this.props.score) && (
          <div>
            <input type="text" id="name" onChange={this.onNameChange}></input>
            <button className="buttons" id="save" onClick={this.Score}>
              Save my score
            </button>
          </div>
        )}

        <div>
          <button
            className="buttons"
            id="newgame"
            onClick={this.props.onNewGame}
          >
            New Game
          </button>
        </div>
      </div>
    );

    if (!this.props.isOpen) {
      winningDialog = null;
    }
    return <div>{winningDialog}</div>;
  }

  onSaveScore = (e) => {
    /* firebase.firestore().collection(this.props.category).add({
      name: this.state.name,
      highscore: this.props.score,
    });*/
    this.props.onClose();
  };
}
export default WinningDialog;
