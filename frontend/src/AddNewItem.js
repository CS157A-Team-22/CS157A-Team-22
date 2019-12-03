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
      callNumber: '',
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
    console.log(this.state);
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
              <FormControlLabel
                control={<Checkbox checked={this.state.donated} 
                                   onClick={this.handleDonatedCheckbox} 
                                   value="donated" />}
                name="donated"
                label="donated"
              />
              {this.state.donated ? "" : 
                <FormControl>
                  <InputLabel htmlFor="purchasePrice">Purchase Price</InputLabel>
                  <Input
                    type="purchasePrice" 
                    id="purchasePrice" 
                    name="purchasePrice" 
                    value={this.state.purchasePrice}
                    onChange={this.handleChange}
                    required
                  />
                </FormControl>
              }
              <FormControl>
                <InputLabel htmlFor="genre">Genre</InputLabel>
                <Input
                  type="genre" 
                  id="genre" 
                  name="genre" 
                  value={this.state.genre}
                  onChange={this.handleChange}
                  required
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input
                  type="name" 
                  id="name" 
                  name="name" 
                  value={this.state.name}
                  onChange={this.handleChange}
                  required
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="releaseDate">Release Date</InputLabel>
                <Input
                  type="releaseDate" 
                  id="releaseDate" 
                  name="releaseDate" 
                  value={this.state.releaseDate}
                  onChange={this.handleChange}
                  required
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="loanPeriod">Loan Period</InputLabel>
                <Input
                  type="loanPeriod" 
                  id="loanPeriod" 
                  name="loanPeriod" 
                  value={this.state.loanPeriod}
                  onChange={this.handleChange}
                  required
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="lateFee">Late Fee</InputLabel>
                <Input
                  type="lateFee" 
                  id="lateFee" 
                  name="lateFee" 
                  value={this.state.lateFee}
                  onChange={this.handleChange}
                  required
                />
              </FormControl>
              <RadioGroup defaultValue="" label="Item Type" name="ItemType">
                <FormControlLabel value="book" 
                                  control={<Radio onClick={this.handleRadio}/>} 
                                  label="book" />
                <FormControlLabel value="movie" 
                                  control={<Radio onClick={this.handleRadio}/>} 
                                  label="movie" />
              </RadioGroup>

              { this.state.type === "movie" ?
                  <FormGroup>
                    <FormControl>
                      <InputLabel htmlFor="actor">Actor</InputLabel>
                      <Input
                        type="actor" 
                        id="actor" 
                        name="actor" 
                        value={this.state.actor}
                        onChange={this.handleChange}
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <InputLabel htmlFor="director">Director</InputLabel>
                      <Input
                        type="director" 
                        id="director" 
                        name="director" 
                        value={this.state.director}
                        onChange={this.handleChange}
                        required
                      />
                    </FormControl>
                  </FormGroup>
                  : ""
              }
              { this.state.type === "book" ?
                <FormControl>
                  <InputLabel htmlFor="author">Author</InputLabel>
                  <Input
                    type="author" 
                    id="author" 
                    name="author" 
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