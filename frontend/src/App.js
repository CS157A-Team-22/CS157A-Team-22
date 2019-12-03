import React from 'react';
import Home from './Home';
import LandingPage from './LandingPage';
import WishList from './wishlist/WishList';
import ReadingHistory from './readingHistory/ReadingHistory';
import Navigation from './Navigation';
import Holds from './Holds';
import ItemPage from './items/ItemPage';
import CheckIn from './CheckIn'
import CheckOut from './CheckOut'
import AddNewItem from './AddNewItem'
import CheckedOut from './CheckedOut';
import Fees from './Fees';
import RemoveItem from './RemoveItem';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { withFirebase } from './Firebase/context';
import GenerateReport from './GenerateReport';

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
              <Route path="/generate-report">
                <Navigation authUser={authUser}>
                  <GenerateReport authUser={authUser}/>
                </Navigation>
              <Route path="/check-in">
                <Navigation><CheckIn/></Navigation>
              </Route>
              <Route path="/check-out">
                <Navigation><CheckOut/></Navigation>
              </Route>
              <Route path="/add-new-item">
                <Navigation><AddNewItem/></Navigation>
              </Route>
              <Route path="/remove-item">
                <Navigation><RemoveItem/></Navigation>

              </Route>
            </Switch>
        </Router>
      </>
    );
  }
}

export default withFirebase(App);
