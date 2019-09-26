import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {data: []};
  }


  getData() {
    let url = "http://127.0.0.1:8080/test/api/test"
    let fetchMethod = { method: 'GET', mode: 'cors'}
    fetch(url, fetchMethod).then( (response) => {
      if(response.ok) {
        console.log(response)
        this.setState({data: response.data})
      }
    } ).catch( (err) => {
      console.log("The fetch operation failed")
    })


    if(this.state.data.length === 0) {
      return "Fail"
    }
    else {
      return (
        <table>
          {this.state.data.map( (row) => {
            return (
              <tr><td>{row}</td></tr>
            )}
          )}
        </table>
    }
  }


  render() {
    return (
      <div className="App">
        <header className="App-header"></header>
        <button onClick={this.getData.bind(this)}>Click Me!</button>
        <br/>
        {this.getData()}
      </div>
    );
  }
}

export default App;
