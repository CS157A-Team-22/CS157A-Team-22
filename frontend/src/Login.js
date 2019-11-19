import React, { Component } from 'react';
import { FormControl, Input, InputLabel, FormGroup} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

import axios from 'axios';
import axiosClient from './config/axiosClient';

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
    // TODO validate password 
    let { email, password } = this.state;
    axiosClient.auth.login({
      email,
      password
    }).then( res => {
      console.log("login response", res);
      alert("user signed in");
      this.props.history.push('/items');
    }).catch(err => {
      console.log("login error", err);
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
            padding: '8%', 
            marginTop: '150px',
            backgroundColor: '#fffae3',
            minHeight: '50vh'
        }}>
        <h1 style={{textAlign: 'center', marginTop: '10px'}}> Log in </h1>
        <p style={{textAlign: 'center'}}> 
            New to library? <Button variant="contained" color="secondary" onClick={this.props.handleSignUpClick}>Sign Up Now!</Button></p>
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

export default withRouter(NewUserForm);