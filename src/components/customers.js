import React from 'react';
import CustomerForm from './customer_form';
import CustomerList from './customer_list';
import axios from 'axios';
import PropTypes from 'prop-types';
import { TableSimple, TablePagination } from 'react-pagination-table';
//const API_BASE = "http://localhost:3000/";
const API_BASE = "https://travel-agent-api.herokuapp.com";
const Header = ["FirstName", "LastName", "Phone", "Address", "TravelAgent_email" ];


class Customers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      formMode: "new",
      customer: {FirstName:"", LastName:"", Phone:"", Address:"", TravelAgent_email:""}
    };
    this.loadCustomers = this.loadCustomers.bind(this);
    this.removeCustomer = this.removeCustomer.bind(this);
    this.addCustomer = this.addCustomer.bind(this);
    this.updateCustomer = this.updateCustomer.bind(this);
  }

  updateForm(mode, customerVals) {
    this.setState({
      customer: Object.assign({}, customerVals),
      formMode: mode,
    });
  }

  clearForm()
  {
    console.log("clear form");
    this.updateForm("new",{FirstName:"",LastName:"",Phone:"",Address:"",TravelAgent_email:""});
  }

  formSubmitted(customer) {
    if(this.state.formMode === "new") {
      this.addCustomer(customer);
    } else {
      this.updateCustomer(customer);
    }
    this.clearForm();
  }

  loadCustomers() {
    axios
    .get(`${API_BASE}/customers?per_page=all`)
    .then(res => {
      this.setState({ customers: res.data });

      console.log(`Data loaded! = ${this.state.customers}`)
      console.log(res.data)
    })
    .catch(err => console.log(err));
  }
//console.log(`Data loaded! = ${this.state.customers}`)
  addCustomer(newCustomer) {
    axios
    .post(`${API_BASE}/customers`, newCustomer)
    .then(res => {
      res.data.key = res.data.id;
      this.setState({ customers: [...this.state.customers, res.data] });
    })
    .catch(err => console.log(err));
  }

  updateCustomer(customer) {
    axios
    .put(`${API_BASE}/customers/${customer.id}`, customer)
    .then(res => {
      this.loadCustomers();
    })
    .catch(err => console.log(err));
  }

  removeCustomer(id) {
    let filteredArray = this.state.customers.filter(item => item.id !== id)
    this.setState({customers: filteredArray});
    axios
    .delete(`${API_BASE}/customers/${id}`)
    .then(res => {
      console.log(`Record Deleted`);
    })
    .catch(err => console.log(err));
  }

  componentDidMount() {
    console.log("Customers just got mounted")
    this.loadCustomers();
  }

  render() {
    return (
      <div className="customers">
        <CustomerForm
          onSubmit={(customer) => this.formSubmitted(customer)}
          onCancel={(mode,customer) => this.updateForm(mode,customer)}
          formMode={this.state.formMode}
          customer={this.state.customer}
        />
        <CustomerList
          customers={this.state.customers}
          onDelete={(id) => this.removeCustomer(id)}
          onEdit={(mode,customer) => this.updateForm(mode,customer)}
        />
      </div>

    );
  }
}

export default Customers;
