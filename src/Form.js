import React from "react";

export default class Form extends React.Component {
  state = {
    activity: "",
    time: "",
    date: ""
  };
  handleChange = evt => {
    evt.preventDefault();
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    usersRef.push(user);
    document.getElementById("activity").value = "";
    document.getElementById("time").value = "";
    document.getElementById("date").value = "";
  };

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

          <label>Time Completed:</label>
          <input
            type="text"
            name="time"
            id="time"
            onChange={this.handleChange}
          />

          <label>Date Completed: </label>
          <input
            type="text"
            name="date"
            id="date"
            onChange={this.handleChange}
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
