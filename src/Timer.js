import React, { Component } from "react";
import Navbar from "./Navbar.js";
import Form from "./Form.js";
import Submissions from "./Submissions.js";
import {
  Statistic,
  Row,
  Col,
  Layout,
  PageHeader,
  Button,
  Carousel
} from "antd";

const { Content, Footer } = Layout;

const Countdown = Statistic.Countdown;

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
      time: Date.now() + 1000 * 60 * 25
    });
  };

  render() {
    return (
      <div>
        <Navbar />
        <Row gutter={16}>
          <Col span={8} style={{ textAlign: "center" }}>
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
          <Col span={8} style={{ textAlign: "center" }}>
            <Form user={this.props.user} />
          </Col>
         
        </Row>
      </div>
    );
  }
}

export default Timer;