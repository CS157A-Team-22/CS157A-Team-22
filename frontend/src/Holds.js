import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import axiosClient from './config/axiosClient';

class Holds extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [], 
      open: false
    };
  }

  componentDidMount() {
    this.getHolds();
  }

  // hit the API endpoint to get the items from DB 
  getHolds = () => {
    axiosClient.fetch.getHolds({ params: {'card-number': '14'} })
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
      <div>
        <h1 style={{textAlign: 'center', marginTop: '50px', marginBottom: '50px'}}>Sarah's Holds!</h1>
        {this.state.items.length === 0 ? <p style={{textAlign: 'center'}}>No items placed on hold</p> : this.renderTable()}
      </div>
    );
  }
  
  renderTable = () => {
      return (
        <Paper style={{backgroundColor: 'rgb(255, 250, 227)', width: '75%', margin: '10px auto'}}>
            <Table aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="left"><b>Name</b></TableCell>
                    <TableCell align="left"><b>Return Date</b></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {this.state.items.map((item,index) => (
                    <TableRow key={index}>
                        <TableCell align="left" component="th" scope="row">
                            {item.name}
                        </TableCell>
                        <TableCell align="left">{item.holdDate.substring(0,10)}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </Paper>
      );
  }
}

export default Holds;