import React from 'react';
import CustomerList from './customer_list';
const Home  = (props) =>  {
  return (
    <div>
      <div className="jumbotron">
        <div className="container">
          <h1>Hello Travel Agent!!!!!!</h1>
          <p>Current List of Customers available are</p>
          <p><a className="btn btn-primary btn-lg" href="" role="button">Learn more &raquo;</a></p>
        </div>
      </div>
      <CustomerList />
    </div>
  );
}

export default  Home;
