import React, { Component } from "react";
import "./App.css";
import Navbar from "./Navbar.js";
import firebase from "./firebase.js";

import "antd/dist/antd.css";
import "./index.css";
import { Table, Divider, Tag, PageHeader, Row, Col } from "antd";

//table creation
const columns = [
  {
    title: "Activity",
    dataIndex: "activity",
    key: "activity",
    render: text => <a href="javascript:;">{text}</a>
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date"
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time"
  }
];

const data = userData => {
  var Data = [];
  var i;
  if (userData !== null) {
    for (i = 0; i < userData.length; i++) {
      const activity = {
        key: i + 1,
        activity: userData[i].activity,
        date: userData[i].date,
        time: userData[i].time
      };
      Data.push(activity);
    }
  }
  return Data;
};
//end table creation

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          // User is signed in.
          const tasksRef = firebase.database().ref("users/" + user.uid);
          console.log(tasksRef);
          tasksRef.on("value", snapshot => {
            if (snapshot.val() != null)
              this.setState({ userData: Object.values(snapshot.val()) });
          });
        }
      }.bind(this)
    );
  }

  //simple list of tasks with info, add table
  render() {
    return (
      <div>
        <Navbar />
        <PageHeader
          style={{ background: "#ffff6", textAlign: "center" }}
          title="Your History"
        />
        <Row>
          <Col span={1} />
          <Col span={22}>
            <Table columns={columns} dataSource={data(this.state.userData)} />
          </Col>
          <Col span={1} />
        </Row>
      </div>
    );
  }
}
export default History;
