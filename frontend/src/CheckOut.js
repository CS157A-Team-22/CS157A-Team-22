import React, { Component } from 'react';
import { FormControl, Input, InputLabel, FormGroup} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

import axiosClient from './config/axiosClient';


import styles from './config/materialCss';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const materialCss = styles;









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


    handleDrawerClose = () => {
        this.setState({open: false});
    }
    
    handleDrawerOpen = () => {
    this.setState({open: true});
    }

    handleListItemClick = (text) => {
        console.log(text);
        let url = text.split(' ').join('-').toLowerCase();
        this.props.history.push(`/${url}`);
    }

  render() {
    const { classes, theme } = this.props;

    return (

      <div>
        <AppBar 
          position="static"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" >
              Library
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.state.open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {['Checked out', 'Wish list', 'Check Out', 'Reading history', 'Holds'].map((text, index) => (
              <ListItem button key={text} onClick={() => this.handleListItemClick(text)}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Fees', 'Logout'].map((text, index) => (
              <ListItem button key={text} onClick={() => this.handleListItemClick(text)}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>


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

export default withRouter(withStyles(materialCss, { withTheme: true })(CheckOut));