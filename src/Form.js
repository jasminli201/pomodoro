import React from "react";
import firebase from "./firebase.js";
import { Card } from "antd";

const usersList = [];

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
    // document.getElementById("time").value = "";
    // document.getElementById("date").value = "";
    //Need to access firebase on the certain user and push the activity, date and time up
    const usersRef = firebase.database().ref("users/" + this.props.user.uid);
    const user = {
      activity: this.state.activity,
      date: this.getDate(),
      time: this.getTime()
    };
    usersRef.push(user);
    usersList.push(user);
    console.log(user);
    console.log(usersList);
    // this.createCard(user);
  };

  getDate = () => {
    var tempDate = new Date();
    var date =
      tempDate.getMonth() +
      1 +
      "/" +
      tempDate.getDate() +
      "/" +
      tempDate.getFullYear();
    const currDate = date;
    return currDate;
    // this.setState({
    //   date: currDate
    // });
  };

  getTime = () => {
    var tempDate = new Date();
    var hour = tempDate.getHours();
    var time = "AM";
    if (hour > 12) {
      hour = hour - 12;
      time = "PM";
    }
    var time = hour + ":" + tempDate.getMinutes() + " " + time;
    const currTime = time;
    return currTime;
  };

  // createCard = () => {
  //   return (
  //     <Card title={usersList.activity}>
  //       <p>date={usersList.date}</p>
  //       <p>time={usersList.time}</p>
  //     </Card>
  //   );
  // };

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

          {/* <label>Date Completed:</label>
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
          /> */}

          <input type="submit" value="Submit" />
        </form>
        <button onClick={this.logout}>Logout</button>
        {usersList.map(submission => {
          return (
            <Card
              title={submission.activity}
              style={{
                background: "#ffff6",
                width: 300,
                textAlign: "center"
              }}
            >
              <p>Date: {submission.date}</p>
              <p>Time: {submission.time}</p>
            </Card>
          );
        })}
        {this.createCard}
      </div>
    );
  }
}
