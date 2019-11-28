import React, { Component } from 'react';
import { FormControl, Input, InputLabel, FormGroup} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { withFirebase } from './Firebase/context';

import axiosClient from './config/axiosClient';

const INITIAL_STATE = {
  email: '', 
  password: '',
  error: null
};

class Login extends Component {

  constructor(props) {
    super(props);
    
    this.state = { ...INITIAL_STATE }
  }

  handleSubmit = e => {
    e.preventDefault();
    let { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        // reset input fields
        this.setState({ ...INITIAL_STATE });
        // 
        axiosClient.auth.login({
          email
        }).then( res => {
          console.log("login response", res);
          alert("user signed in");
          this.props.history.push('/items');
        }).catch(err => {
          console.log("login error", err);
        })
      })
      .catch(error => {
        this.setState({ error });
      });

    console.log("form submitted!");
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';

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
                value={password}
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
                style={{margin: '4% 0'}}> Log In
              </Button>  

              {error && <p>{error.message}</p>}
            </FormControl>
          </FormGroup>
        </form>
      </Container>
    )
  }

}

export default withRouter(withFirebase(Login));