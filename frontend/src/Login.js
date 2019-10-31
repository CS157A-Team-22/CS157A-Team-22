import React, { Component } from 'react';
import { FormControl, Input, InputLabel, FormGroup} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import axios from 'axios';

class NewUserForm extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      email: '', 
      password: ''      
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    let url = "http://localhost:5000/submit-new-user"
  
    // TODO validate password 
    let { email, password } = this.state;
    axios.post(url, {
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
      <Container maxWidth="sm" style=
        {{ 
            padding: '3%', 
            margin: '50% 10px', 
            height: '50%', 
            backgroundColor: '#fffae3'
        }}>
        <h1 style={{textAlign: 'center'}}> Log in </h1>
        <p style={{textAlign: 'center'}}> New to library? <Button variant="contained" color="secondary">Sign Up Now!</Button></p>
        <form onSubmit={this.handleSubmit} method="post">
          <FormGroup>
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
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                style={{margin: '4% 0'}}> Log In
              </Button>  
            </FormControl>
          </FormGroup>
        </form>
      </Container>
    )
  }

}

export default NewUserForm;