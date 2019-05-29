import React, { Component } from "react";
import firebase from "./firebase.js";
import "./App.css";

import { Row, Col, PageHeader, Layout, Card } from "antd";

class Submissions extends Component {
  constructor() {
    super();
    this.state = {
      activity: "",
      date: "",
      time: "",
      submissions: []
    };
  }

  componentDidMount() {
    const usersRef = firebase.database().ref("users");
    usersRef.on("value", snapshot => {
      let users = snapshot.val();
      let submissionsList = [];
      for (let user in users) {
        submissionsList.push({
          id: user,
          activity: users[user].activity,
          date: users[user].date,
          time: users[user].time
        });
      }
      this.setState({
        submissions: submissionsList
      });
      console.log(this.state.submissions);
    });
  }

  handleClick() {
    this.setState({
      open: false
    });
  }

  render() {
    const { Content, Footer } = Layout;

    return (
      <div>
        <Row>
          <Col span={15} style={{ textAlign: "center" }}>
            <PageHeader
              style={{ background: "#ffff6", textAlign: "center" }}
              title="Current Submissions"
            />
            {this.state.submissions.map(submission => {
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

export default Submissions;
