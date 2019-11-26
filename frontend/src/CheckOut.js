import React, { Component } from 'react';
import { FormControl, Input, InputLabel, FormGroup} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

import axiosClient from './config/axiosClient';





class CheckOut extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      CallNumber: '', 
      LibraryCardNumber: ''      
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    let { CallNumber, LibraryCardNumber } = this.state;
    //axiosClient.auth.CheckOut({
    //   CallNumber,
    //   LibraryCardNumber
    // }).then( res => {
    //  console.log("login response", res);
      alert("Checked out " + CallNumber + "to " + LibraryCardNumber);
      this.props.history.push('/items');
    // }).catch(err => {
    //   console.log("login error", err);
    // })
    console.log("form submitted!");
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }


    
  render() {
    const { classes, theme } = this.props;

    return (

      <div>

        <Container maxWidth="sm" style=
          {{ 
              padding: '8%', 
              marginTop: '150px',
              backgroundColor: '#fffae3',
              minHeight: '50vh'
          }}>
          <h1 style={{textAlign: 'center', marginTop: '10px'}}> Check Out an Item </h1>
          <p style={{textAlign: 'center', marginTop: '10px'}}> Please enter the customer's Library Card Number and the Call Number of the item to be checked out. </p>
          <form onSubmit={this.handleSubmit} method="post">
            <FormGroup>
              <FormControl>
                <InputLabel htmlFor="LibraryCardNumber">Library Card Number</InputLabel>
                <Input 
                  type="LibraryCardNumber" 
                  id="LibraryCardNumber" 
                  name="LibraryCardNumber" 
                  value={this.state.LibraryCardNumber}
                  onChange={this.handleChange}
                  required
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="CallNumber">Call Number</InputLabel>
                <Input
                  type="CallNumber" 
                  id="CallNumber" 
                  name="CallNumber" 
                  value={this.state.CallNumber}
                  onChange={this.handleChange}
                  required
                />
              </FormControl>
              <FormControl>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary"
                  style={{margin: '4% 0'}}> Check Out Item
                </Button>  
              </FormControl>
            </FormGroup>
          </form>
        </Container>
      </div>
    )
  }

}

export default withRouter(CheckOut);