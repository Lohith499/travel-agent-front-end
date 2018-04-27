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
    <table className="vdata" width="766px">
        <tbody>
          <tr>
              <td width="764.889px">
                  <table className="vdata" height="279px" width="765px">
                      <tbody>
                          <tr height="9px">
                              <td className="vdataplace" width="764px" height="40px" font-size="5vw">
                              <h2>
                              <b>Place:</b><u>{props.Place}</u>
                              </h2>
                              </td>
                          </tr>
                          <tr height="6.55556px">
                              <td width="764px" height="6.55556px">
                                  <table className="vdata" height="11px" width="764px">
                                      <tbody>
                                          <tr className="vdatabdt" height="45px">
                                              <td width="250.667px" height="45px"><b>Budget:</b>${props.Budget}</td>
                                              <td width="250.667px" height="45px"><b>Vacation_Date:</b>{props.VacationDate}</td>
                                              <td width="250.667px" height="45px"><b>Transport Mode:</b> {props.Transport}</td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </td>
                          </tr>
                          <tr height="92px">
                              <td width="764px" height="92px">
                                  <table className="vdata" height="188px" width="764px">
                                      <tbody>
                                          <tr height="45px">
                                              <td className="vdataDesccell" width="491.556px" height="45px">
                                                  <u><h3><b>Description</b></h3></u>
                                                  <tr height="160.667px">
                                                        <td className="vdataDesctxts" width="448.889px" height="160.667px">
                                                        <div className="vdataDescscroll">
                                                        {props.Description}
                                                        </div>
                                                        </td>
                                                    </tr>
                                                    <tr height="30px">
                                                        <td  className="btn-toolbar" width="448.889px" height="40px" text-align="left">
                                                        <div className="btn-group btn-group-justified">
                                                          <a href="" className="btn btn-success btn-sm">
                                                          <Link to={`/customers/${props.customer_id}/vacations/${props.id}`}>

                                                                <h4><i className="glyphicon glyphicon-pencil"></i> Edit</h4>

                                                          </Link>
                                                          </a>
                                                          <a href="" className="btn btn-danger btn-sm" onClick={event => props.onDelete(props.id)}>

                                                            <h4><i className="glyphicon glyphicon-remove"></i> Delete</h4>

                                                          </a>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                </td>
                                                <td border="10px solid black">
                                                  <div class="gallery">
                                                    <img src={props.Image} alt="" width="300" height="200" />
                                                  </div>
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </td>
          </tr>
        </tbody>
        </table>
        <br></br>
        <br></br>
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
      ? "Loading..." : `Vacations Plans for ${this.state.customer.FirstName} ${this.state.customer.LastName}`
    return (
      <div className="vacations">
        <br></br>
        <br></br>
        <br></br>
        <h1> {headerString} </h1>
        <div className="customer-list">
        <div className="btn-toolbar" width="300px" text-align="left">
        <div className="btn-group btn-group-justified">
          <a href="" className="btn btn-success btn-sm col-md-6">
          <Link to={`/customers/${this.state.customer_id}/vacations/create`}>

                <h4><i className="glyphicon glyphicon-pencil"></i> Create</h4>

          </Link>
          </a>
          <a href="" className="btn btn-danger btn-sm col-md-6" onClick={() => this.props.history.goBack()}>
            <h4><i className="glyphicon glyphicon-remove"></i> Back</h4>
          </a>
        </div>
        </div>



          <div className="table-area">
          <table className="responsive-table table" id="customer">
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
