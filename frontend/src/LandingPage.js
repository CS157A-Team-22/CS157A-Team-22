import React from 'react'
import ItemViewer from './items/ItemViewer'
import SearchBar from './items/SearchBar'


class LandingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {rows: [], cards: false};
  }

  render() {
    return (
      <>
        {/* <button onClick={this.getTableData.bind(this, 'user', false)}>Get Users!</button>
        <button onClick={this.getTableData.bind(this, 'customer', false)}>Get Customers!</button>
        <button onClick={this.getTableData.bind(this, 'librarian', false)}>Get Librarians!</button><br/>
        <button onClick={this.getTableData.bind(this, 'item', true)}>Get Items!</button>
        <button onClick={this.getTableData.bind(this, 'book', false)}>Get Books!</button>
        <button onClick={this.getTableData.bind(this, 'movie', false)}>Get Movies!</button><br/>
        <button onClick={this.getTableData.bind(this, 'borrows', false)}>Get Borrows!</button>
        <button onClick={this.getTableData.bind(this, 'hold', false)}>Get Holds!</button>
        <button onClick={this.getTableData.bind(this, 'wishlist', false)}>Get Wishlist!</button>
        <button onClick={this.getTableData.bind(this, 'addtoinventory', false)}>Get addToInventory!</button><br/><br/> */}
        <SearchBar/>
        <ItemViewer/>
      </>
    );
  }
}

export default LandingPage;