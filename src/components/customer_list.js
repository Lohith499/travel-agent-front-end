import React from 'react';
import { Link } from 'react-router-dom';

const CustomerListItem  = (props) =>  {
  return (
    <tr>
      <td className="col-md-3">{props.FirstName}</td>
      <td className="col-md-3">{props.LastName}</td>
      <td className="col-md-3">{props.Phone}</td>
      <td className="col-md-3">{props.Address}</td>
      <td className="col-md-3">{props.TravelAgent_email}</td>
      <td className="col-md-3 btn-toolbar">
        <Link to={`/customers/${props.id}/vacations`}>
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
    <div className="customer-list">
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="col-md-3">First Name</th>
            <th className="col-md-3">Last Name</th>
            <th className="col-md-3">Phone</th>
            <th className="col-md-3">Address</th>
            <th className="col-md-3">TravelAgent_email</th>
            <th className="col-md-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customerItems}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;
