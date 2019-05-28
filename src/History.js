import React, { Component } from 'react';
import './App.css';
import firebase from "./firebase.js";


//Map User History
/*const mapResults = userData => {
    return userData.map(row => 
    <li>Name: {row.Name}, Date: {row.Date}, Time: {row.Time}</li>);
  };*/

class history extends Component {
    constructor (props){
        super(props);
        this.state={
           userData = null
        };
    }
  
    componentDidMount() {
        const tasksRef= firebase.database().ref(/*pass from login*/);
        tasksRef.on('value', snapshot => {
          this.setState({userData: Object.values(snapshot.val())});
        });
        
        console.log(this.state.userData);
      }
      
  
      //simple list of tasks with info, add table 
    render() {
    return (
      <div>
          <h1>Log History</h1>
          {(this.state.userData !== null) && (mapResults(this.state.userData))}
      </div>

    );

  }
}
export default History;