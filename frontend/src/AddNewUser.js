import React, { Component } from 'react';
import { FormControl, Input, InputLabel, FormGroup, FormControlLabel, 
         Checkbox, RadioGroup, Radio} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

import axiosClient from './config/axiosClient';





class AddNewItem extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      libraryCardNumber: '',
      firstName: '',
      lastName: false,
      email: '', 
      password: '', 

      librarian: false
    }
  }



  handleSubmit = e => {
    e.preventDefault();
    axiosClient.update.addItem(this.state).then( res => {      
      alert(res.data);
      this.props.history.push('/add-new-item');
    }).catch(err => {
      console.log("CheckIn error", err);
    })
  }



  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  handleCheckbox = () => {
    let newVal = !this.state.librarian
    this.setState({
      donated: newVal
    })
  }


  render() {
    const { classes, theme } = this.props;

    return (

      <div>
      

        <Container style=
          {{ 
              padding: '8%', 
              marginTop: '150px',
              backgroundColor: '#fffae3',
              minHeight: '50vh'
          }}>
          <h1 style={{textAlign: 'center', marginTop: '10px'}}> Add a new user to the system </h1>
          <p style={{textAlign: 'center', marginTop: '10px'}}> Please the new user's information below. </p>
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
             
              {this.state.donated ? "" : 
                <FormControl>
                  <InputLabel htmlFor="firstName">First Name</InputLabel>
                  <Input
                    type="firstName" 
                    id="firstName" 
                    name="firstName" 
                    value={this.state.firstName}
                    onChange={this.handleChange}
                    required
                  />
                </FormControl>
              }
              <FormControl>
                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                <Input
                  type="lastName" 
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
              

              <FormControlLabel
                control={<Checkbox checked={this.state.librarian} 
                                   onClick={this.handleCheckbox} 
                                   value="librarian" />}
                name="librarian"
                label="librarian"
              />
              <FormControl>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary"
                  style={{margin: '4% 0'}}> Add User
                </Button>  
              </FormControl>
            </FormGroup>
          </form>
        </Container>
      </div>
    )
  }

}

export default withRouter(AddNewUser);