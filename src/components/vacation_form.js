import React from 'react';
import axios from 'axios';

//const API_BASE = 'http://localhost:3000/';
const API_BASE = "https://travel-agent-api.herokuapp.com/";

class VacationForm extends React.Component {

  constructor(props) {

    const id = props.match.params.id;
    const createMode = (props.match.path.endsWith("create")) ? true: false;
    super(props);
    this.state = {
      Place: "",
      VacationDate: "",
      Description: "",
      Budget: "",
      Transport: "",
      Image: "",
      customer_id: id,
      vacation_id: createMode ? 0 : props.match.params.pid,
      createMode: createMode
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    // load the vacation if are editing.
    if (!createMode) {
      axios
      .get(`${API_BASE}/customers/${this.state.customer_id}/vacations/${this.state.vacation_id}`)
      .then(res => {
        console.log("vacation fetched");
        this.setState({
          Place: res.data.Place,
          VacationDate: res.data.VacationDate,
          Description: res.data.Description,
          Budget: res.data.Budget,
          Transport: res.data.PlTransportace,
          Image: res.data.Image
        })
      })
      .catch(err => console.log(err));
    }
  }

  addVacation(newVacation) {
    console.log(`vacationing vacation with Place ${newVacation.Place}`);
    axios
    .post(`${API_BASE}/customers/${newVacation.customer_id}/vacations`, newVacation)
    .then(res => {
      //this.props.history.replace(`/customers/${this.state.customer_id}/vacations`);
      console.log('vacationed!');
      this.props.history.goBack();
    })
    .catch(err => console.log(err));
  }

  updateVacation(vacation) {
    axios
    .put(`${API_BASE}/customers/${vacation.customer_id}/vacations/${vacation.vacation_id}`, vacation)
    .then(res => {
      this.props.history.goBack();
    })
    .catch(err => console.log(err));
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
    const vacation = {
      Place: this.state.Place,
      VacationDate: this.state.VacationDate,
      Description: this.state.Description,
      Budget: this.state.Budget,
      Transport: this.state.Transport,
      Image: this.state.Image,
      customer_id: this.state.customer_id,
      vacation_id: this.state.vacation_id
    }
    if (this.state.createMode) {
      this.addVacation(vacation);
    } else {
      this.updateVacation(vacation);
    }
    event.preventDefault();
  }

  handleCancel(event)
  {
    console.log("canceled pressed.")
    this.props.history.goBack();
    event.preventDefault();
  }

  render()  {
   return (
     <div>
       <h1>
         {this.state.createMode ? "Create Vacation" : "Edit Vacation"}
       </h1>
       <div className="customer-form">
         <form onSubmit={this.handleSubmit}>
           <div className="form-group">
             <label>Place</label>
             <input type="text" className="form-control" name="Place" id="Place" placeholder="Enter Place" value={this.state.Place} onChange={this.handleInputChange}/>
           </div>
           <div className="form-group">
             <label htmlFor="VacationDate">VacationDate</label>
             <textarea className="form-control" name="VacationDate" id="VacationDate" value={this.state.VacationDate} onChange={this.handleInputChange} rows="6"></textarea>
           </div>
           <div className="form-group">
             <label htmlFor="Description">Description</label>
             <textarea className="form-control" name="Description" id="Description" value={this.state.Description} onChange={this.handleInputChange} rows="6"></textarea>
           </div>
           <div className="form-group">
             <label htmlFor="Budget">Budget</label>
             <textarea className="form-control" name="Budget" id="Budget" value={this.state.Budget} onChange={this.handleInputChange} rows="6"></textarea>
           </div>
           <div className="form-group">
             <label htmlFor="Transport">Transport</label>
             <textarea className="form-control" name="Transport" id="Transport" value={this.state.Transport} onChange={this.handleInputChange} rows="6"></textarea>
           </div>
           <div className="form-group">
             <label htmlFor="Image">Image</label>
             <textarea className="form-control" name="Image" id="Image" value={this.state.Image} onChange={this.handleInputChange} rows="6"></textarea>
           </div>
           <div className="form-group">
             <button type="submit" className="btn btn-primary">{this.state.createMode ? "Create" : "Save"}</button>
             <button type="submit" className="btn btn-danger" onClick={this.handleCancel} >Cancel</button>
           </div>
         </form>
       </div>
     </div>
   );
 }

}

export default VacationForm;
