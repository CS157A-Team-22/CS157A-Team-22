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


  handleDonatedCheckbox = () => {
    let newVal = !this.state.donated
    this.setState({
      donated: newVal
    })
  }

  handleRadio = e => {
    console.log(e.target.value)
    this.setState({
      type: e.target.value
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
                  <InputLabel htmlFor="PurchasePrice">Purchase Price</InputLabel>
                  <Input
                    type="PurchasePrice" 
                    id="PurchasePrice" 
                    name="PurchasePrice" 
                    value={this.state.purchasePrice}
                    onChange={this.handleChange}
                    required
                  />
                </FormControl>
              }
              <FormControl>
                <InputLabel htmlFor="Genre">Genre</InputLabel>
                <Input
                  type="Genre" 
                  id="Genre" 
                  name="Genre" 
                  value={this.state.genre}
                  onChange={this.handleChange}
                  required
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="Name">Name</InputLabel>
                <Input
                  type="Name" 
                  id="Name" 
                  name="Name" 
                  value={this.state.name}
                  onChange={this.handleChange}
                  required
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="ReleaseDate">Release Date</InputLabel>
                <Input
                  type="ReleaseDate" 
                  id="ReleaseDate" 
                  name="ReleaseDate" 
                  value={this.state.releaseDate}
                  onChange={this.handleChange}
                  required
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="LoanPeriod">Loan Period</InputLabel>
                <Input
                  type="LoanPeriod" 
                  id="LoanPeriod" 
                  name="LoanPeriod" 
                  value={this.state.loanPeriod}
                  onChange={this.handleChange}
                  required
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="LateFee">Late Fee</InputLabel>
                <Input
                  type="LateFee" 
                  id="LateFee" 
                  name="LateFee" 
                  value={this.state.lateFee}
                  onChange={this.handleChange}
                  required
                />
              </FormControl>
              <RadioGroup defaultValue="" label="Item Type" name="ItemType">
                <FormControlLabel value="Book" 
                                  control={<Radio onClick={this.handleRadio}/>} 
                                  label="Book" />
                <FormControlLabel value="Movie" 
                                  control={<Radio onClick={this.handleRadio}/>} 
                                  label="Movie" />
              </RadioGroup>

              <FormControlLabel
                control={<Checkbox checked={this.state.donated} 
                                   onClick={this.handleDonatedCheckbox} 
                                   value="Donated" />}
                name="Donated"
                label="Donated"
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