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
      callNumber: '', 
      libraryCardNumber: ''      
    }
  }

  componentDidMount() {
    if (!this.props.authUser) {
      this.props.history.push('/');
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    let { callNumber, libraryCardNumber } = this.state;
    axiosClient.update.checkOut( 
      { callNumber, libraryCardNumber }).then( res => {
      alert(res.data);
      this.props.history.push('/check-out');
    }).catch(err => {
      console.log("check out error", err);
    })
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
                <InputLabel htmlFor="libraryCardNumber">Library Card Number</InputLabel>
                <Input 
                  type="libraryCardNumber" 
                  id="libraryCardNumber" 
                  name="libraryCardNumber" 
                  value={this.state.libraryCardNumber}
                  onChange={this.handleChange}
                  required
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="callNumber">Call Number</InputLabel>
                <Input
                  type="callNumber" 
                  id="callNumber" 
                  name="callNumber" 
                  value={this.state.callNumber}
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