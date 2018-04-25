import React from 'react';
import ReactDOM from 'react-dom';
import Customers from './components/customers';
import Vacations from './components/vacations';
import VacationForm from './components/vacation_form';
import Home from './components/home';
import About from './components/about';
import TopNav from './components/top_nav';
import Footer from './components/footer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import $ from 'jquery';
import DataTable from 'datatables.net';

$.DataTable = DataTable;
$(document).ready(function() {
          $('#example').DataTable();
      } );

ReactDOM.render(
  <BrowserRouter>
    <div>
      <TopNav />
      <Switch>
        <Route path="/customers/:id/vacations/create" component={VacationForm} />
        <Route path="/customers/:id/vacations/:pid" component={VacationForm} />
        <Route path="/customers/:id/vacations" component={Vacations} />
        <Route path="/customers" component={Customers} />
        <Route path="/about" component={About} />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
, document.getElementById('root'));
registerServiceWorker();
