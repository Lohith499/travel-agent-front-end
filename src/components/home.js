import React from 'react';
import Homecustomers from './homecustomer';
import Customers from './customers';
import PropTypes from 'prop-types';
import { TableSimple, TablePagination } from 'react-pagination-table';
const Header = ["FirstName", "LastName", "Phone", "Address", "TravelAgent_email" ];


const Home  = (props) =>  {
  return (
    <div>
      <div className="jumbotron">
        <div className="container">
          <h1>Hello Travel Agent!!!!!!</h1>
          <p>Current List of Customers available are</p>
          <p><a className="btn btn-primary btn-lg" href="https://github.com/Lohith499/travel-agent-front-end" target="_blank" role="button">Learn more &raquo;</a></p>
        </div>
      </div>

      <Homecustomers />

    </div>
  );
}

export default  Home;
