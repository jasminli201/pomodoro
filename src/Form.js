import React from "react";
import firebase from "./firebase.js";
import { Card, Row, Col, Input, Button, PageHeader, Layout } from "antd";

const usersLists = [];
import { Redirect } from "react-router-dom";

const { Header, Footer, Sider, Content } = Layout;

export default class Form extends React.Component {
  state = {
    activity: "",
    date: "",
    time: "",
    usersList:[],
    redirect: false
  };

  handleChange = evt => {
    evt.preventDefault();
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleSubmit = event => {
    firebase.auth().onAuthStateChanged(
      function(user) {
        event.preventDefault();
        document.getElementById("activity").value = "";
        // document.getElementById("time").value = "";
        // document.getElementById("date").value = "";
        //Need to access firebase on the certain user and push the activity, date and time up
        const usersRef = firebase.database().ref("users/" + user.uid);
        const User = {
          activity: this.state.activity,
          date: this.getDate(),
          time: this.getTime()
        };
        usersRef.push(User);
        usersLists.push(User);
        this.setState({ usersList: usersLists });
        console.log(User);
       
      }.bind(this)
    );
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

  logout = () => {
    firebase.auth().signOut();
    this.setState({
      redirect: true
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  };

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <Row>
          <Col span={3} />
          <Col span={12}>
            <PageHeader
              style={{ background: "#ffff6", textAlign: "center" }}
              title="Enter completed activity:"
            />
            <Input
              type="text"
              name="activity"
              id="activity"
              onChange={this.handleChange}
            />
            <Footer style={{ background: "#fff6", textAlign: "center" }}>
              <Button onClick={this.handleSubmit}>Submit</Button>
            </Footer>
            <Button onClick={this.logout}>Logout</Button>
          </Col>
          <Col span={9} style={{ textAlign: "center" }}>
            {(this.state.usersList !== null) && this.state.usersList.map(submission => {
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
          </Col>
        </Row>
      </div>
    );
  }
}
