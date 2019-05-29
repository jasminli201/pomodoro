import React, { Component } from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import Timer from "./Timer.js";
import History from "./History.js";
import Welcome from "./Welcome.js";
// import Leaderboard from "./Leaderboard.js";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/Timer" component={Timer} />
        <Route exact path="/History" component={History} />
        {/* <Route exact path="/Leaderboard" component={Leaderboard} /> */}
      </Router>
    );
  }
}

export default App;
