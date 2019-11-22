import React from 'react'
import ItemViewer from './items/ItemViewer'
import SearchBar from './items/SearchBar'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import axiosClient from './config/axiosClient';

class LandingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [], 
      searchText: ''
    };
  }

  componentDidMount() {
    this.getItems();
  }

  // hit the API endpoint to get the items from DB 
  getItems = () => {
    axiosClient.fetch.getItems()
    .then(res => {
      console.log("items fetched successfully");
      this.setState({ items: res.data });
    })
    .catch(err => {
      console.log("error in getting items", err);
    })
  }

  handleSearchTextChange = (value) => {
    this.setState({
      searchText: value
    });
  }

  render() {
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" >
              Library
            </Typography>
          </Toolbar>
        </AppBar>
        <SearchBar 
          searchText={this.state.searchText} 
          onChange={this.handleSearchTextChange}
        />
        <ItemViewer 
          items={this.state.items}
          searchText={this.state.searchText}
        />
      </>
    );
  }
}

export default LandingPage;