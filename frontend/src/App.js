import React from 'react';
import Home from './Home';
import LandingPage from './LandingPage';
import WishList from './wishlist/WishList';
import ReadingHistory from './readingHistory/ReadingHistory';
import Navigation from './Navigation';
import Holds from './Holds';
import ItemPage from './items/ItemPage';


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

  // testFull(table) {
  //   let url = "http://127.0.0.1:5000/full-test/" + table
  //   let fetchMethod = { method: 'GET', mode: 'cors'}

  //   fetch(url, fetchMethod).then(res => {
  //     res.json().then( (json) => {
  //       this.setState({rows: json})
  //     })
  //   })
  // }

  // displayRows() {
  //   //console.log(this.state.rows)
  //   return (
  //     <table><tbody>
  //       {this.state.rows.map( (row, index) => {
  //         return (<tr key={index}>
  //                   {Object.keys(row).map( (field, index) => {
  //                     return <td key={index}>{row[field]}</td>
  //                   })}
  //                 </tr>
  //                 )
  //         })
  //       }
  //     </tbody></table>)
  // }

  render() {
    return (
      <>
        <Router>
            <Switch>
              <Route path="/" exact={true}>
                <Home/>
              </Route>
              <Route path="/items">
                <Navigation><LandingPage /></Navigation>
              </Route>
              <Route path="/wish-list">
                <Navigation><WishList/></Navigation>
              </Route>
              <Route path="/reading-history">
                <Navigation><ReadingHistory/></Navigation>
              </Route>
              <Route path="/holds">
                <Navigation><Holds/></Navigation>
              </Route>
              <Route path="/item">
                <Navigation><ItemPage/></Navigation>
              </Route>
            </Switch>
        </Router>
      </>
    );
  }
}

export default App;
