import React from 'react';
import NewUserForm from './NewUserForm';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Login from './Login';
import Item from './Item';
import ItemViewer from './ItemViewer'
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



class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: "Nothing yet", 
      rows: [],
      showSignUp: false
    };
  }

  

  getData() {
    let url = "http://127.0.0.1:5000/react-test"
    let fetchMethod = { method: 'GET', mode: 'cors'}

    let text

    fetch(url, fetchMethod).then(res => {
      res.text().then( theText => {
        console.log(theText)
        text = theText
        console.log("After assignment")
        console.log(text)
        this.setState({data: text})
      })
    })
  }


  testFull(table) {
    let url = "http://127.0.0.1:5000/full-test/" + table
    let fetchMethod = { method: 'GET', mode: 'cors'}

    fetch(url, fetchMethod).then(res => {
      res.json().then( (json) => {
        this.setState({rows: json})
      })
    })
  }



  displayRows() {
    //console.log(this.state.rows)
    return (
      <table><tbody>
        {this.state.rows.map( (row, index) => {
          return (<tr key={index}>
                    {Object.keys(row).map( (field, index) => {
                      return <td key={index}>{row[field]}</td>
                    })}
                  </tr>
                  )
          })
        }
      </tbody></table>)
  }

  toggleSignUpView = () => {
    this.setState({
      showSignUp: !this.state.showSignUp
    });
  }

  render() {
    return (
      <>
        {/* <button onClick={this.testFull.bind(this, 'user')}>Get Users!</button>
        <button onClick={this.testFull.bind(this, 'customer')}>Get Customers!</button>
        <button onClick={this.testFull.bind(this, 'librarian')}>Get Librarians!</button><br/>
        <button onClick={this.testFull.bind(this, 'item')}>Get Items!</button>
        <button onClick={this.testFull.bind(this, 'book')}>Get Books!</button>
        <button onClick={this.testFull.bind(this, 'movie')}>Get Movies!</button><br/>
        <button onClick={this.testFull.bind(this, 'borrows')}>Get Borrows!</button>
        <button onClick={this.testFull.bind(this, 'hold')}>Get Holds!</button>
        <button onClick={this.testFull.bind(this, 'wishlist')}>Get Wishlist!</button>
        <button onClick={this.testFull.bind(this, 'addtoinventory')}>Get addToInventory!</button><br/><br/> */}
        {/* <NewUserForm />
        {this.displayRows()}
        <ItemViewer items={this.state.rows}/> */}
        {this.renderGrid()}
        {/* {!this.state.showSignUp && this.renderLogin()}
        {this.state.showSignUp && this.renderRegister()} */}
      </>
    );
  }

  renderGrid = () => {
    const { classes, spacing } = this.props;
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

export default withStyles(styles)(App);
