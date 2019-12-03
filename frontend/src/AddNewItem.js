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
      CallNumber: '',
      purchasePrice: '',
      donated: false,
      type: '', 
      status: '', 
      genre: '',
      name: '',
      releaseDate: '',
      loanPeriod: '',
      lateFee: '',

      actor: '',
      director: '',

      author: '',
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
          <h1 style={{textAlign: 'center', marginTop: '10px'}}> Add a new item to the library inventory </h1>
          <p style={{textAlign: 'center', marginTop: '10px'}}> Please enter information for the new item below. </p>
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
              <FormControlLabel
                control={<Checkbox checked={this.state.donated} 
                                   onClick={this.handleDonatedCheckbox} 
                                   value="Donated" />}
                name="Donated"
                label="Donated"
              />
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
              <RadioGroup defaultValue="female" label="Item Type" name="ItemType">
                <FormControlLabel value="Book" 
                                  control={<Radio onClick={this.handleRadio}/>} 
                                  label="Book" />
                <FormControlLabel value="Movie" 
                                  control={<Radio onClick={this.handleRadio}/>} 
                                  label="Movie" />
              </RadioGroup>

              { this.state.type === "Movie" ?
                  <FormGroup>
                    <FormControl>
                      <InputLabel htmlFor="Actor">Actor</InputLabel>
                      <Input
                        type="Actor" 
                        id="Actor" 
                        name="Actor" 
                        value={this.state.actor}
                        onChange={this.handleChange}
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <InputLabel htmlFor="Director">Director</InputLabel>
                      <Input
                        type="Director" 
                        id="Director" 
                        name="Director" 
                        value={this.state.director}
                        onChange={this.handleChange}
                        required
                      />
                    </FormControl>
                  </FormGroup>
                  : ""
              }
              { this.state.type === "Book" ?
                <FormControl>
                  <InputLabel htmlFor="Author">Author</InputLabel>
                  <Input
                    type="Author" 
                    id="Author" 
                    name="Author" 
                    value={this.state.author}
                    onChange={this.handleChange}
                    required
                  />
                </FormControl>
                : ""
              }

              <FormControl>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary"
                  style={{margin: '4% 0'}}> Add to Inventory
                </Button>  
              </FormControl>
            </FormGroup>
          </form>
        </Container>
      </div>
    )
  }

}

export default withRouter(AddNewItem);