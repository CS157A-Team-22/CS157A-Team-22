import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Login from './Login';
import NewUserForm from './NewUserForm';
import './App.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
});
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSignUp: false
        };
    }

    render() { 
        return ( <>{this.renderGrid()} </>);
    }

    toggleSignUpView = () => {
        this.setState({
          showSignUp: !this.state.showSignUp
        });
    }
    
    renderGrid = () => {
        const { classes } = this.props;
        let imgSrc = "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1753&q=80";
        return (
          <Grid container className={classes.root} spacing={0} style={{maxHeight: '100vh'}}>
            <Grid item xs={6} style={{backgroundColor: '#fcf2c0'}}>
              {/* <Login/> */}
              {!this.state.showSignUp && this.renderLogin()}
              {this.state.showSignUp && this.renderRegister()}
            </Grid>
            <Grid item xs={6} style={{overflow: 'hidden', maxHeight: '100 * vh'}}>
              <div >
                <img src={imgSrc} style={{maxHeight: '100%'}}/>
              </div>
            </Grid>
          </Grid>
        );
      }

      renderLogin = () => {
        return (
          <div style={{backgroundColor: '#', height: '100vh'}}>
            <Login
              handleSignUpClick={this.toggleSignUpView}
            />
          </div>
        );
      }
    
      renderRegister = () => {
        return (
            <NewUserForm 
              handleBackClick={this.toggleSignUpView}
            />
        )
      }
    
}
 
export default withStyles(styles)(Home);
