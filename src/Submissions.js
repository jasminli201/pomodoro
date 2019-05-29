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

  render() {
    const { Content, Footer } = Layout;

    return (
      <div>
        {/* {this.props.usersList} */}
        <Row>
          <Col span={15} style={{ textAlign: "center" }}>
            <PageHeader
              style={{ background: "#ffff6", textAlign: "center" }}
              title="Current Submissions"
            />
            {this.props.usersList.map(submission => {
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
