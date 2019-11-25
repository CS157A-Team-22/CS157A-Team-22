import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import axiosClient from '../config/axiosClient';

class ReadingHistory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [], 
      open: false
    };
  }

  componentDidMount() {
    this.getItems();
  }

  // hit the API endpoint to get the items from DB 
  getItems = () => {
    axiosClient.fetch.getReadingHistory({ params: {'card-number': '3'} })
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
        <h1 style={{textAlign: 'center', marginTop: '50px', marginBottom: '50px'}}>Sarah's Reading History!</h1>
        <Paper style={{backgroundColor: 'rgb(255, 250, 227)', width: '75%', margin: '10px auto'}}>
            <Table aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="left"><b>Name</b></TableCell>
                    <TableCell align="left"><b>Borrow Date</b></TableCell>
                    <TableCell align="left"><b>Return Date</b></TableCell>
                    <TableCell align="left"><b>Renewals</b></TableCell>
                    <TableCell align="left"><b>Overdue</b></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {this.state.items.map(item => (
                    <TableRow key={item.name}>
                    <TableCell align="left" component="th" scope="row">
                        {item.name}
                    </TableCell>
                    <TableCell align="left">{item.borrowDate.substring(0,10)}</TableCell>
                    <TableCell align="left">{item.returnDate.substring(0,10)}</TableCell>
                    <TableCell align="left">{item.numberRenewals}</TableCell>
                    <TableCell align="left">{item.overdue}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </Paper>
      </div>
    );
  }
}

export default ReadingHistory;