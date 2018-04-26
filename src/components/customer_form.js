import React from 'react';

class CustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstName: "",
      LastName: "",
      Phone:  "",
      Address: "",
      TravelAgent_Phone: "",
      id: 0
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event)
  {
    this.props.onSubmit({
      FirstName: this.state.FirstName,
      LastName: this.state.LastName,
      Phone: this.state.Phone,
      Address: this.state.Address,
      TravelAgent_email: this.state.TravelAgent_email,
      id: this.state.id,
    });
    event.preventDefault();
  }

  handleCancel(event)
  {
    this.props.onCancel("new", {FirstName:"", LastName:"", Phone:"", Address:"",TravelAgent_email:""});
    event.preventDefault();
  }

  componentWillReceiveProps(newProps) {
      if (newProps.customer != null) {
        this.setState({
          FirstName: newProps.customer.FirstName,
          LastName: newProps.customer.LastName,
          Phone: newProps.customer.Phone,
          Address: newProps.customer.Address,
          TravelAgent_email: newProps.customer.TravelAgent_email,
          id: newProps.customer.id,
        });
      }
  }

  renderButtons() {
    if (this.props.formMode === "new") {
      return(
        <button type="submit" className="btn btn-primary">Create</button>
      );
    } else {
      return(
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Save</button>
          <button type="submit" className="btn btn-danger" onClick={this.handleCancel} >Cancel</button>
        </div>
      );
    }
  }

  render()  {
    return (

      <div className="customer-form">
      <br></br>
      <br></br>
      <br></br>
      <h1> Customers </h1>
      <div className="container">
      <div className="bd-example" data-example-id="">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" className="form-control" autoComplete='given-name' name="FirstName" id="FirstName" placeholder="First Name" value={this.state.FirstName} onChange={this.handleInputChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="LastName">Last Name</label>
            <input type="text" className="form-control" autoComplete='family-name' name="LastName" id="LastName" placeholder="Last Name" value={this.state.LastName} onChange={this.handleInputChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="Phone">Phone address</label>
            <input type="Phone" className="form-control" autoComplete='Phone' name="Phone"  id="Phone" placeholder="10 Digit Phone Number" value={this.state.Phone} onChange={this.handleInputChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="Address">Address</label>
            <input type="Address" className="form-control" autoComplete='Address' name="Address"  id="Address" placeholder="" value={this.state.Address} onChange={this.handleInputChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="TravelAgent_email">TravelAgent_email</label>
            <input type="TravelAgent_email" className="form-control" autoComplete='TravelAgent_email' name="TravelAgent_email"  id="TravelAgent_email" placeholder="name@example.com" value={this.state.TravelAgent_email} onChange={this.handleInputChange}/>
          </div>
          {this.renderButtons()}
        </form>
        </div>
        </div>
      </div>
    );
  }
}

export default CustomerForm;
