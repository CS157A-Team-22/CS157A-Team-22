import React, { Component } from 'react';
import { FormControl, Input, InputLabel, FormGroup} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

import { withFirebase } from './Firebase/context';

import axiosClient from './config/axiosClient';

const INITIAL_STATE = {
  firstName: '', 
  lastName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  error: null
};

class NewUserForm extends Component {

  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE }
  }

  handleSubmit = e => {
    e.preventDefault();
  
    // TODO validate password 
    let { firstName, lastName, email, password } = this.state;

    if (password.length < 6) {
      this.setState({error: {message: 'Password must have at least 6 characters'}});
    } else {
      axiosClient.auth.signup({
        firstName, 
        lastName,
        email
      }).then( res => {
        console.log("sign up response", res);
  
        // authenticate with firebase
        this.props.firebase
          .doCreateUserWithEmailAndPassword(email, password)
          .then(authUser => {
            // reset form fields
            console.log(authUser);
            this.setState({ ...INITIAL_STATE });
            // pass info to backend to store in SQL DB
            this.props.history.push('/items');
          })
          .catch(error => {
            this.setState({ error });
          });
          
      }).catch(err => {
        console.log("sign up error", err);
      })
      
    }

    console.log("form submitted!");
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation,
      error
    } = this.state;

    const isInvalid =
      password !== passwordConfirmation ||
      password === '' ||
      email === '';

    return (
      <>
      <Container maxWidth="sm" style=
        {{ 
            padding: '8%', 
            marginTop: '150px',
            backgroundColor: '#fffae3',
            minHeight: '50vh'
        }}>
        <Button color="secondary" onClick={this.props.handleBackClick}>Back</Button>
        <h1 style={{textAlign: 'center', marginTop: '10px'}}> Register for a new account: </h1>
        <form onSubmit={this.handleSubmit} method="post">
          <FormGroup>
            <FormControl>
              <InputLabel htmlFor="firstName">First Name</InputLabel>
              <Input
                type="text" 
                id="firstName" 
                name="firstName" 
                value={firstName}
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
                value={lastName}
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
                value={email}
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
                minLength="6" 
                value={password}
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
                minLength="6"
                value={passwordConfirmation}
                onChange={this.handleChange}
                required
              />
            </FormControl>
            <FormControl>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={isInvalid}
                style={{margin: '4% 0'}}> Sign Up
              </Button> 

              {error && <p>{error.message}</p>}
            </FormControl>
          </FormGroup>
        </form>
      </Container>
      </>
    )
  }

}

export default withRouter(withFirebase(NewUserForm));
