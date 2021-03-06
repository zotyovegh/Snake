import React, { useState, useEffect } from "react";
import "./index.css";
import firebase from "../firebase";
import logo from "./GithubLogo.png";

function useTimes() {
  const [cat, setTimes] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("names")
      .orderBy("highscore", "desc")
      .limit(10)
      .onSnapshot((snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTimes(newData);
      });
    return () => unsubscribe();
  }, ["names"]);
  return cat;
}

const Highscore = (props) => {
  const names = useTimes("names");

  var namesLast = 0;

  if (names.length < 10) {
    namesLast = -1;
  } else {
    namesLast = names[9] && names[9].highscore;
  }
  props.lastValue(namesLast);

  return (
    <div>
      <div className="main">
        <div className="title">Highscores</div>
        <ol>
          {names.map((data) => (
            <li className="item" key={data.id}>
              <div>
                <div className="name">{data.name}</div>
                <div className="score">{data.highscore}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="logo">
        <a href="https://github.com/zotyovegh/Snake">
          {" "}
          <img width="150" height="35" src={logo} />
        </a>
      </div>
    </div>
  );
};
export default Highscore;
