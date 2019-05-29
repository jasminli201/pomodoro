import React from "react";
import firebase from "./firebase.js";
import { throws } from "assert";

export default class Form extends React.Component {
  state = {
    activity: "",
    date: "",
    time: ""
  };

  handleChange = evt => {
    evt.preventDefault();
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    document.getElementById("activity").value = "";
    document.getElementById("time").value = "";
    document.getElementById("date").value = "";
    //Need to access firebase on the certain user and push the activity,date and time up
    const usersRef = firebase.database().ref("users");
    const user = {
      activity: this.state.activity,
      date: this.convertDigitIn(this.state.date),
      time: this.state.time
    };
    usersRef.push(user);
  };

  convertDigitIn(str) {
    return str
      .split("/")
      .reverse()
      .join("/");
  }

  logout() {
    firebase.auth().signOut();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Activity Completed: </label>
          <input
            type="text"
            name="activity"
            id="activity"
            onChange={this.handleChange}
          />

          <label>Date Completed:</label>
          <input
            type="date"
            name="date"
            id="date"
            onChange={this.handleChange}
          />

          <label>Time Completed: </label>
          <input
            type="time"
            name="time"
            id="time"
            onChange={this.handleChange}
          />

          <input type="submit" value="Submit" />
        </form>
        <h2>{this.state.activity}</h2>
        <h2>{this.state.date}</h2>
        <h2>{this.state.time}</h2>
        <button onClick={this.logout}>Logout</button>
        <h3>The current user id is: {this.props.user.uid}</h3>
      </div>
    );
  }
}
