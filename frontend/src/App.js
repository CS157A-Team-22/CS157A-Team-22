import React from 'react';
import Home from './Home';
import LandingPage from './LandingPage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: "Nothing yet", 
      rows: []
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
      <Router>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/" exact={true}>
              <Home/>
            </Route>
            <Route path="/items">
              <LandingPage />
            </Route>
          </Switch>
      </Router>
        {/* {this.renderGrid()} */}
        {/* {!this.state.showSignUp && this.renderLogin()}
        {this.state.showSignUp && this.renderRegister()} */}
      </>
    );
  }

}

export default App;
