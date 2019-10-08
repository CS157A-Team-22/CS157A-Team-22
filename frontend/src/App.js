import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {data: "Nothing yet", rows: []};
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


  testFull() {
    let url = "http://127.0.0.1:5000/full-test"
    let fetchMethod = { method: 'GET', mode: 'cors'}

    fetch(url, fetchMethod).then(res => {
      res.json().then( (json) => {
        this.setState({rows: json})
      })
    })
  }



  displayRows() {
    return (
      <table><tbody>
        {this.state.rows.map( (row, index) => {
          return (<tr key={index}>
                    <td>{row.age}</td>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                  </tr>)
          })
        }
      </tbody></table>)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header"></header>
        <button onClick={this.getData.bind(this)}>Click Me!</button>
        <br/>
        <h1>{this.state.data}</h1>
        <br/>
        <button onClick={this.testFull.bind(this)}>Now Click Me!</button>
        {this.displayRows()}
      </div>
    );
  }
}

export default App;
