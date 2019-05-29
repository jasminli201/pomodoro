import React from "react";
import firebase from "./firebase.js";
import 'antd/dist/antd.css';
import './index.css';
import { Input} from 'antd';

export default class Forms extends React.Component {
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
    const usersRef = firebase.database().ref("users/" + this.props.user.uid);
    const user = {
      activity: this.state.activity,
      date: this.state.date,
      time: this.state.time
    };
    usersRef.push(user);
  };

  logout() {
    firebase.auth().signOut();
  }

  render() {
    const Search = Input.Search;
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
        <button onClick={this.logout}>Logout</button>


        <Search
      label= "Activity Completed"
      placeholder="Activity"
      enterButton="Submit"
      size="medium"
      onChange={this.handleChange}
      onSearch={this.handleSubmit}
    />


      </div>
    );
  }
}
