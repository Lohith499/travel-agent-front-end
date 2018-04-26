import React from 'react';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';
//import { TableSimple } from 'react-pagination-table';


const CustomerListItem  = (props) =>  {
  return (
    <tr>
      <td className="col-xs-1">{props.FirstName}</td>
      <td className="col-xs-1">{props.LastName}</td>
      <td className="col-xs-1">{props.Phone}</td>
      <td className="col-xs-4">{props.Address}</td>
      <td className="col-xs-2">{props.TravelAgent_email}</td>
      <td className="col-xs-5 btn-toolbar" width="263.111px">
        <Link to={`/customers/${props.id}/vacations?per_page=all`}>
        <button className="btn btn-success btn-sm">
          <i className="glyphicon glyphicon-list"></i> Vacations
        </button>
      </Link>
      <button className="btn btn-success btn-sm" onClick={event => props.onEdit("edit",props)}>
        <i className="glyphicon glyphicon-pencil"></i> Edit
      </button>
      <button className="btn btn-danger btn-sm" onClick={event => props.onDelete(props.id)}>
        <i className="glyphicon glyphicon-remove"></i> Delete
      </button>
    </td>
  </tr>
);
}


const CustomerList = (props) => {
  const customerItems = props.customers.map((customer)  => {
    return (
      <CustomerListItem
        FirstName={customer.FirstName}
        LastName={customer.LastName}
        Phone={customer.Phone}
        Address={customer.Address}
        TravelAgent_email={customer.TravelAgent_email}
        id={customer.id}
        key={customer.id}
        onDelete={props.onDelete}
        onEdit={props.onEdit}
      />
    )
  });


  return (
    <div>
    <div className="customer-list">
    <div className="table-area">
      <table className="responsive-table table" id="customer">

          <tr>
            <th className="col-xs-2">First Name</th>
            <th className="col-xs-2">Last Name</th>
            <th className="col-xs-3">Phone</th>
            <th className="col-xs-4">Address</th>
            <th className="col-xs-2">TravelAgent_email</th>
            <th className="col-xs-5">Actions</th>
          </tr>

        <tbody>
          {customerItems}
        </tbody>
      </table>
      </div>
      </div>
    </div>
  );
}

export default CustomerList;
