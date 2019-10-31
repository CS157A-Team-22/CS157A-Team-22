import React, { Component } from 'react';
import axios from 'axios';

class NewUserForm extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      firstName: '',
      lastName: '',
      email: '', 
      password: '',
      passwordConfirmation: ''
      
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    let url = "http://localhost:5000/submit-new-user"
  
    // TODO validate password 
    let { firstName, lastName, email, password, passwordConfirmation } = this.state;
    axios.post(url, {
      firstName, 
      lastName,
      email, 
      password
    }).then( res => {
      console.log("sign up response", res);
    }).catch(err => {
      console.log("sign up error", err);
    })
    console.log("form submitted!");
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit} method="post">
          
          <label htmlFor="firstName">First Name:</label>
          <input 
            type="text" 
            id="firstName" 
            name="firstName" 
            value={this.state.firstName}
            onChange={this.handleChange}
            required
          />
          
          <label htmlFor="lastName">Last Name:</label>
          <input 
            type="text" 
            id="lastName" 
            name="lastName" 
            value={this.state.lastName}
            onChange={this.handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={this.state.email}
            onChange={this.handleChange}
            required
          />

          <label htmlFor="password">password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
         
          <label htmlFor="passwordConfirmation">password confirmation:</label>
          <input 
            type="password" 
            id="passwordConfirmation" 
            name="passwordConfirmation" 
            value={this.state.passwordConfirmation}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Sign Up</button>
        </form>
      </>
    )
  }

}

export default NewUserForm;