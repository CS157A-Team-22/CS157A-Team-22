import React, { Component } from 'react';
import { FormControl, Input, InputLabel, FormGroup} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

import axiosClient from './config/axiosClient';





class CheckIn extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      CallNumber: '', 
    }
  }


  componentDidMount() {
    if (!this.props.authUser) {
      this.props.history.push('/');
    }
  }


  handleSubmit = e => {
    e.preventDefault();
    let { CallNumber } = this.state;
    axiosClient.update.checkIn({CallNumber}).then( res => {      
    alert(res.data);
      this.props.history.push('/check-in');
    }).catch(err => {
      console.log("CheckIn error", err);
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
          <h1 style={{textAlign: 'center', marginTop: '10px'}}> Check In an Item </h1>
          <p style={{textAlign: 'center', marginTop: '10px'}}> Please enter the Call Number of the item to be checked in. </p>
          <form onSubmit={this.handleSubmit} method="post">
            <FormGroup>
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
                  style={{margin: '4% 0'}}> Check In Item
                </Button>  
              </FormControl>
            </FormGroup>
          </form>
        </Container>
      </div>
    )
  }

}

export default withRouter(CheckIn);