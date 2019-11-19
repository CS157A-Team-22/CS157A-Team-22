import React from 'react'
import Item from './Item'
import axiosClient from '../config/axiosClient';

class ItemViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items:[]
    }
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

  generateCards() {
    console.log("items", this.state.items);
    return( 
      this.state.items.map((anItem, index) => {
      // console.log(anItem)
      return (<Item key={index} item={anItem} />)
      })
    )
  }

  render() {
    return(
      <div>
        {this.generateCards()}
      </div>
  )}
}

export default ItemViewer