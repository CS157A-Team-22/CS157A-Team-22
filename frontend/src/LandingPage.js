import React from 'react';

import ItemViewer from './items/ItemViewer';
import SearchBar from './items/SearchBar';
import axiosClient from './config/axiosClient';
import { withRouter } from 'react-router-dom';

class LandingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [], 
      searchText: ''
    };
  }

  componentDidMount() {
    if (this.props.authUser) {
      this.getItems();
    } else {
      this.props.history.push('/');
    }
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
      <div>

          <SearchBar 
            searchText={this.state.searchText} 
            onChange={this.handleSearchTextChange}
          />
          <ItemViewer 
            items={this.state.items}
            searchText={this.state.searchText}
          />
      </div>
    );
  }
}

export default withRouter(LandingPage);