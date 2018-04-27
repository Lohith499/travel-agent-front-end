import React from 'react';

const TopNav  = (props) =>  {
  return (
    <div>
      <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container-fluid">
      <div className="navbar-header">
      <a className="navbar-brand" href="/">Travel Agent</a>
      </div>
      <ul className="nav navbar-nav">
      <li className="active"><a href="/">Home</a></li>
      <li><a href="/customers">View and Edit Customers</a></li>
      <li><a href="/about">About</a></li>
      </ul>
      </div>
      </nav>
    </div>
  );
}

export default TopNav;
