import React, { Component } from "react";
import firebase from "./firebase.js";
import Form from "./Form.js";
import Login from "./Login.js";

class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    return (
      <div>{this.state.user ? <Form user={this.state.user} /> : <Login />}</div>
    );
  }
}

export default Welcome;
