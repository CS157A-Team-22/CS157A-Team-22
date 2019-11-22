import React from 'react'
import ItemViewer from './items/ItemViewer'
import SearchBar from './items/SearchBar'

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

  render() {
    return (
      <>
        <SearchBar searchText={this.state.searchText}/>
        <ItemViewer items={this.state.items}/>
      </>
    );
  }
}

export default LandingPage;