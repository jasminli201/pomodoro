import React, { Component } from "react";
import "./App.css";
import Navbar from "./Navbar.js";
import firebase from "./firebase.js";
import Chart from 'react-google-charts';


const data = userData => {
    var School=0;
    var Work=0;
    var Leisure=0; 
    var Other=0; 
    var i;
    if (userData !== null) {
      for (i = 0; i < userData.length; i++) {
          if (userData[i].label === "School"){ School++;};
          if (userData[i].label == "Work"){ Work++;};
          if (userData[i].label == "Leisure"){ Leisure++;};
          if (userData[i].label == "Other"){ Other++;};

        
        };
    }
    return [
        ['Task Type', 'Tasks Completed'],
        ["School",School],
        ["Work", Work],
        ["Leisure", Leisure],
        ["Other", Other],
    ];
      };
 



class Graph extends Component {
    constructor(props) {
      super(props);
      this.state = {
        userData: null,

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
                if (snapshot.val() != null) {
                  this.setState({ userData: Object.values(snapshot.val()) });
                }
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
       <h1>Data Graphs</h1>
       <Chart
  width={'800px'}
  height={'600px'}
  chartType="BarChart"
  loader={<div>Loading Chart</div>}
  data={data(this.state.userData)}
  options={{
    title: 'Tasks Completed by Type',
    chartArea: { width: '50%' },
    hAxis: {
      title: 'Tasks Completed',
      minValue: 0,
    },
    vAxis: {
      title: 'Task Type',
    },
  }}
  // For tests
  rootProps={{ 'data-testid': '1' }}
/>
          </div>
        );
      }
    }
    export default Graph;
         
    