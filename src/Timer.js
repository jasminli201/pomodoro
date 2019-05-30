import React, { Component } from "react";
import Navbar from "./Navbar.js";
import Form from "./Form.js";


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
var seconds=0;

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      time: 0
    };
  }

  componentDidMount(){
    this.setState({
      time:seconds
    });
  };

  onFinish = () => {
    alert("finished!");
  };

  handleClick = () => {
      seconds= Date.now() + 1000 * 60 * 25;
    this.setState({
      time: seconds,
    });
  };

  reset=()=>{
    seconds=0;
  }

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
            <Form user={this.props.user} reset={this.reset}   />
            
          </Col>
         
        </Row>
      </div>
    );
  }
}

export default Timer;