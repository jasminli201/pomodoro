import React from "react";
import firebase from "./firebase.js";
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  PageHeader,
  Layout,
  Collapse
} from "antd";
import { Redirect } from "react-router-dom";

var usersLists = [];
const { Header, Footer, Sider, Content } = Layout;
const Panel = Collapse.Panel;
const customPanelStyle = {
  background: "#f7f7f7",
  borderRadius: 4,
  marginBottom: 24,
  overflow: "hidden"
};

export default class Form extends React.Component {
  state = {
    activity: "",
    usersList: [],
    redirect: false
  };

  handleChange = evt => {
    evt.preventDefault();
    this.setState({ [evt.target.name]: evt.target.value });
    console.log(evt.target.value);
  };

  handleSubmit = event => {
    const activityName = this.state.activity;
    firebase.auth().onAuthStateChanged(
      function(user) {
        event.preventDefault();
        document.getElementById("activity").value = "";
        //Need to access firebase on the certain user and push the activity, date and time up
        const usersRef = firebase.database().ref("users/" + user.uid);
        const User = {
          activity: activityName,
          date: this.getDate(),
          time: this.getTime()
        };
        usersRef.push(User);
        usersLists.push(User);
        this.setState({ usersList: usersLists });
        console.log(User);
      }.bind(this)
    );
    console.log(this.state.activity);
    this.setState({
      activity: ""
    });
  };

  componentDidMount() {
    this.setState({
      usersList: usersLists
    });
  }

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
    var time =
      hour +
      ":" +
      ((tempDate.getMinutes() < 10 ? "0" : "") + tempDate.getMinutes()) +
      " " +
      time;
    const currTime = time;
    return currTime;
  };

  logout = () => {
    firebase.auth().signOut();
    usersLists = [];
    this.setState({
      redirect: true,
      usersList: []
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect from="/Timer" to="/" />;
    }
  };

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <Row>
          <Col span={3} />
          <Col
            span={9}
            style={{ textAlign: "center", justifyContent: "center" }}
          >
            {this.state.usersList !== null &&
              this.state.usersList.map(submission => {
                return (
                  <Collapse>
                    <Panel
                      style={customPanelStyle}
                      header={submission.activity}
                    >
                      <p>Date: {submission.date}</p>
                      <p>Time: {submission.time}</p>
                    </Panel>
                  </Collapse>
                );
              })}
          </Col>
          <Col span={2} />
          <Col span={10}>
            <Input
              type="text"
              name="activity"
              id="activity"
              style={{ width: 350 }}
              onChange={this.handleChange}
              value={this.state.activity}
              placeholder="completed activity"
            />
            <Footer style={{ background: "#fff6", textAlign: "center" }}>
              <Button
                style={{ background: "#1890ff", color: "#fffff6" }}
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </Footer>
            <Button
              style={{ background: "white", color: "#1890ff" }}
              onClick={this.logout}
            >
              Logout
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
