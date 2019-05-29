import React, { Component } from 'react';
import './App.css';
import firebase from "./firebase.js";

import 'antd/dist/antd.css';
import './index.css';
import { Table, Divider, Tag } from 'antd';

//table creation

const columns = [
    {
      title: 'Activity',
      dataIndex: 'activity',
      key: 'activity',
      render: text => <a href="javascript:;">{text}</a>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
  
  ];
  
  /*var data = [
   {
      key: '1',
      activity: 'John Brown',
      date: 32,
      time: 'New York No. 1 Lake Park',
     
    },
  ];*/

   const data = userData => {
   var Data = [];
   var i;
   if (userData !== null){
   for (i = 0; i < userData.length; i++) {
       const activity={
           key : i+1,
           activity : (userData[i]).activity,
           date : (userData[i]).date,
           time : (userData[i]).time,
     }
     Data.push(activity)
   };
   
 };
return Data;
};
//end table creation



class History extends Component {
    constructor (props){
        super(props);
        this.state={
           userData : null,
     
        };
    }
  
    componentDidMount() {
        const tasksRef= firebase.database().ref("users");
        console.log (tasksRef);
        tasksRef.on('value', snapshot => {
          console.log(Object.values(snapshot.val()));
        });
        tasksRef.on('value', snapshot => {
            this.setState({userData: Object.values(snapshot.val())});
          });
        
       
}
      
  
      //simple list of tasks with info, add table 
    render() {
    return (
      <div>
          <h1>Log History</h1>
         
          <Table columns={columns} dataSource={data(this.state.userData)} />
      </div>

    );

  }
}
export default History;


