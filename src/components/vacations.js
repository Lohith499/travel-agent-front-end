import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
//import ReactTable from "react-table";
//import "react-table/react-table.css";

/*import $ from 'jquery';
//import DataTable from 'datatables.net';
$.DataTable = DataTable;*/

//const API_BASE = 'http://localhost:3000/';
const API_BASE = "https://travel-agent-api.herokuapp.com/";


const VacationItem  = (props) =>  {
  return (
    <tr>
      <td className="col-xs-2">{props.Place}</td>
      <td className="col-xs-2">{props.VacationDate}</td>
      <td className="col-xs-5">{props.Description}</td>
      <td className="col-xs-2">{props.Budget}</td>
      <td className="col-xs-2">{props.Transport}</td>
      <td className="col-xs-3">{props.Image}</td>
      <td className="col-xs-5 btn-toolbar">
        <Link to={`/customers/${props.customer_id}/vacations/${props.id}`}>
            <button className="btn btn-success btn-sm">
              <i className="glyphicon glyphicon-pencil"></i> Edit
            </button>
        </Link>
        <button className="btn btn-danger btn-sm" onClick={event => props.onDelete(props.id)}>
          <i className="glyphicon glyphicon-remove"></i> Delete
        </button>
      </td>
    </tr>
  );
}



class Vacations extends React.Component {

  constructor(props) {
    super(props);
    const id = props.match.params.id;
    this.state = {
      vacations: [],
      customer_id: id,
      customer: {}

    };

    this.loadVacations = this.loadVacations.bind(this);
    this.deleteVacation = this.deleteVacation.bind(this);
  }

  loadVacations() {
    axios
    .get(`${API_BASE}/customers/${this.state.customer_id}/vacations?per_page=all`)
    .then(res => {
      this.setState({ vacations: res.data });
      console.log(`Data loaded! = ${this.state.vacations}`)
    })
    .catch(err => console.log(err));

    axios
    .get(`${API_BASE}/customers/${this.state.customer_id}`)
    .then(res => {
      this.setState({ customer: res.data });
      console.log(`Data loaded! = ${this.state.vacations}`)
    })
    .catch(err => console.log(err));
  }

  deleteVacation(id) {
    let filteredArray = this.state.vacations.filter(item => item.id !== id)
    this.setState({vacations: filteredArray});
    axios
    .delete(`${API_BASE}/customers/${this.state.customer_id}/vacations/${id}`)
    .then(res => {
      console.log(`Record Deleted`);
    })
    .catch(err => console.log(err));
  }

  componentDidMount() {
    console.log('Vacations mounted!')
    this.loadVacations();
  }

  render() {

    const vacationItems = this.state.vacations.map((vacation)  => {
      return (
        <VacationItem
          Place={vacation.Place}
          VacationDate={vacation.VacationDate}
          Description={vacation.Description}
          Budget={vacation.Budget}
          Transport={vacation.Transport}
          Image={vacation.Image}
          customer_id = {vacation.customer_id}
          id={vacation.id}
          key={vacation.id}
          onDelete={this.deleteVacation}
        />
      )
    });

    const headerString = (this.state.vacations.count === 0)
      ? "Loading..." : `Vacations by ${this.state.customer.FirstName} ${this.state.customer.LastName}`
    return (
      <div className="vacations">
        <br></br>
        <br></br>
        <br></br>
        <h1> {headerString} </h1>
        <div className="customer-list">
          <div className="table-area">
          <table className="responsive-table table" id="customer">
              <tr>
                <th className="col-xs-2">Place</th>
                <th className="col-xs-2">VacationDate</th>
                <th className="col-xs-5">Description</th>
                <th className="col-xs-2">Budget</th>
                <th className="col-xs-2">Transport</th>
                <th className="col-xs-3">Image</th>
                <th className="col-xs-5">Actions</th>
              </tr>

            <tbody>
              {vacationItems}
            </tbody>
          </table>
          </div>
          <Link to={`/customers/${this.state.customer_id}/vacations/create`}>
              <button className="btn btn-success btn-sm">
                <i className="glyphicon glyphicon-plus"></i> Create
              </button>
          </Link>
          <button className="btn btn-danger btn-sm" onClick={() => this.props.history.goBack()}>
            <i className="glyphicon glyphicon-menu-left"></i> Back
          </button>
        </div>
      </div>
    );
  }
}

export default Vacations;
