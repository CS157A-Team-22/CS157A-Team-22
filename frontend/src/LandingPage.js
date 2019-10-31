import React from 'react'
import ItemViewer from './ItemViewer'


class LandingPage extends React.Component {


  constructor(props) {
    super(props);
    this.state = {rows: [], cards: false};
  }



  getTableData(table, displayCards) {
    let url = "http://127.0.0.1:5000/full-test/" + table
    let fetchMethod = { method: 'GET', mode: 'cors'}

    fetch(url, fetchMethod).then(res => {
      res.json().then( (json) => {
        this.setState({rows: json, cards: displayCards})
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
      <div className="App">
        <button onClick={this.getTableData.bind(this, 'user', false)}>Get Users!</button>
        <button onClick={this.getTableData.bind(this, 'customer', false)}>Get Customers!</button>
        <button onClick={this.getTableData.bind(this, 'librarian', false)}>Get Librarians!</button><br/>
        <button onClick={this.getTableData.bind(this, 'item', true)}>Get Items!</button>
        <button onClick={this.getTableData.bind(this, 'book', false)}>Get Books!</button>
        <button onClick={this.getTableData.bind(this, 'movie', false)}>Get Movies!</button><br/>
        <button onClick={this.getTableData.bind(this, 'borrows', false)}>Get Borrows!</button>
        <button onClick={this.getTableData.bind(this, 'hold', false)}>Get Holds!</button>
        <button onClick={this.getTableData.bind(this, 'wishlist', false)}>Get Wishlist!</button>
        <button onClick={this.getTableData.bind(this, 'addtoinventory', false)}>Get addToInventory!</button><br/><br/>
        
        {this.state.cards ? <ItemViewer items={this.state.rows} />: this.displayRows()}
      </div>
    );
  }

}

export default LandingPage