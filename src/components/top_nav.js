import React from 'react';
import { Nav, Navbar, NavItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const TopNav  = (props) =>  {
  return (
    <div>
      <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container-fluid">
      <div class="navbar-header">
      <a class="navbar-brand" href="/">Travel Agent</a>
      </div>
      <ul class="nav navbar-nav">
      <li class="active"><a href="/">Home</a></li>
      <li><a href="/customers">Edit Customers</a></li>
      <li><a href="/about">About</a></li>
      </ul>
      </div>
      </nav>
    </div>
  );
}

export default TopNav;
