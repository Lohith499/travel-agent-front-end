import './css/jquery.dataTables.css';
import React from 'react';
import {Component} from 'react';

const $ =require('jquery');
$.DataTable=require('datatables.net');

export class Tbl extends Component{

  componentDidMount(){
      console.log("this.el");
      this.$el=$(this.el);
      this.$el.DataTable( {
        "ajax": {
            "url": "https://travel-agent-api.herokuapp.com/customers?per_page=all",
            "dataSrc": ""
        },
      //  data: this.props.data(),
        "columns": [
            { "data": "FirstName" },
            { "data": "LastName" },
            { "data": "Phone" },
            { "data": "Address" },
            { "data": "TravelAgent_email" }
            ]
          } );
        }
  componentWillUnmount(){
  //  this.$el.DataTable.destroy(true)
  }

  render(){
      return (<div>
      <h1> List of Customers</h1>
      <table  className="display" width="100%" ref = {el => this.el = el} >
      <thead>
      <tr>
          <th>FirstName</th>
          <th>LastName</th>
          <th>Phone</th>
          <th>Address</th>
          <th>TravelAgent_email</th>
      </tr>
  </thead>
      </table>

      </div>
);
  }

}
