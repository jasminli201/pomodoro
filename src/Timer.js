import React, { Component } from "react";
import Navbar from "./Navbar.js";
// import Form from "./Form.js";
import { Button } from "antd";
import { Statistic, Row, Col, Layout, PageHeader } from "antd";

const { Content, Footer } = Layout;

const Countdown = Statistic.Countdown;
const deadline = Date.now() + 1000 * 60 * 25.01;

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      time: 0
    };
  }

  onFinish = () => {
    alert("finished!");
  };

  handleClick = () => {
    this.setState({
      time: deadline
    });
  };

  render() {
    return (
      <div>
        <Navbar />
        <Row gutter={16}>
          <Col span={6} style={{ textAlign: "center" }}>
            <PageHeader
              style={{ background: "#ffff6", textAlign: "center" }}
              title="Timer"
            />
            <Content>
              <Countdown value={this.state.time} onFinish={this.onFinish} />
            </Content>
            <Footer style={{ background: "#fff6", textAlign: "center" }}>
              <Button onClick={this.handleClick}>Start</Button>
            </Footer>
          </Col>
          <Col span={12} style={{ textAlign: "center" }}>
            {/* <Form /> */}
          </Col>
          <Col span={6} />
        </Row>
      </div>
    );
  }
}

export default Timer;
