import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import "./App.css";

class Navbar extends Component {
  render() {
    return (
      <div>
        <Menu mode="horizontal">
          <Menu.Item>
            <Link to="/">Welcome</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/Timer">Timer</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/History">History</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/Leaderboard">Leaderboard</Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default Navbar;
