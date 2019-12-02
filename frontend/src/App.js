import React from 'react';
import Home from './Home';
import LandingPage from './LandingPage';
import WishList from './wishlist/WishList';
import ReadingHistory from './readingHistory/ReadingHistory';
import Navigation from './Navigation';
import Holds from './Holds';
import ItemPage from './items/ItemPage';
import CheckedOut from './CheckedOut';
import Fees from './Fees';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { withFirebase } from './Firebase/context';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      authUser: null
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  componentWillUnmount() {
    this.listener();
  }
  // getData() {
  //   let url = "http://127.0.0.1:5000/react-test"
  //   let fetchMethod = { method: 'GET', mode: 'cors'}

  //   let text

  //   fetch(url, fetchMethod).then(res => {
  //     res.text().then( theText => {
  //       console.log(theText)
  //       text = theText
  //       console.log("After assignment")
  //       console.log(text)
  //       this.setState({data: text})  
  //     })
  //   })
  // }

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
    let { authUser } = this.state;
    return (
      <>
        <Router>
            <Switch>
              <Route path="/" exact={true}>
                <Home authUser={authUser}/>
              </Route>
              <Route path="/items">
                <Navigation authUser={authUser}>
                  <LandingPage authUser={authUser}/>
                </Navigation>
              </Route>
              <Route path="/wish-list">
                <Navigation authUser={authUser}>
                  <WishList authUser={authUser}/>
                </Navigation>
              </Route>
              <Route path="/reading-history">
                <Navigation authUser={authUser}>
                  <ReadingHistory authUser={authUser}/>
                </Navigation>
              </Route>
              <Route path="/holds">
                <Navigation authUser={authUser}>
                  <Holds authUser={authUser}/>
                </Navigation>
              </Route>
              <Route path="/log-out">
                <Home authUser={authUser}/>
              </Route>
              <Route path="/item">
                <Navigation authUser={authUser}>
                  <ItemPage authUser={authUser}/>
                </Navigation>
              </Route>
              <Route path="/checked-out">
                <Navigation authUser={authUser}>
                  <CheckedOut authUser={authUser}/>
                </Navigation>
              </Route>
              <Route path="/fees">
                <Navigation authUser={authUser}>
                  <Fees authUser={authUser}/>
                </Navigation>
              </Route>
            </Switch>
        </Router>
      </>
    );
  }
}

export default withFirebase(App);
