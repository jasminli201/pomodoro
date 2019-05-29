import React, { Component } from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import Timer from "./Timer.js";
// import History from "./History.js";
// import Profile from "./Profile.js";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/Timer" component={Timer} />
        {/* <Route exact path="/History" component={History} /> */}
        {/* <Route exact path="/Profile" component={Profile} /> */}
      </Router>
    );
  }
}

export default App;
