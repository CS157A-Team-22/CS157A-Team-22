import React, { Component } from 'react';
import { FormControl, Input, InputLabel, FormGroup} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

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
      <Container maxWidth="sm">
        <h1 style={{textAlign: 'center'}}> Register for a new account: </h1>
        <form onSubmit={this.handleSubmit} method="post">
          <FormGroup>
            <FormControl>
              <InputLabel htmlFor="firstName">First Name</InputLabel>
              <Input
                type="text" 
                id="firstName" 
                name="firstName" 
                value={this.state.firstName}
                onChange={this.handleChange}
                required
              />
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="lastName">Last Name</InputLabel>
              <Input
                type="text" 
                id="lastName" 
                name="lastName" 
                value={this.state.lastName}
                onChange={this.handleChange}
                required
              />
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input 
                type="email" 
                id="email" 
                name="email" 
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                type="password" 
                id="password" 
                name="password" 
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="passwordConfirmation">Password Confirmation</InputLabel>
              <Input 
                type="password" 
                id="passwordConfirmation" 
                name="passwordConfirmation" 
                value={this.state.passwordConfirmation}
                onChange={this.handleChange}
                required
              />
            </FormControl>
            <FormControl>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                style={{marginTop: '2%'}}> Sign Up
              </Button>  
            </FormControl>
          </FormGroup>
        </form>
      </Container>
      </>
    )
  }

}

export default NewUserForm;