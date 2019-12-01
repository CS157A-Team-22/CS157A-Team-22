import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import axiosClient from './config/axiosClient';

class CheckedOut extends React.Component {

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
    axiosClient.fetch.getCheckedOut({ params: {'card-number': '1'} })
    .then(res => {
      console.log("Checked out items fetched successfully");
      this.setState({ items: res.data });
    })
    .catch(err => {
      console.log("error in getting checked out items", err);
    })
  }

  render() {
    
    return (
      <div>
        <h1 style={{textAlign: 'center', marginTop: '50px', marginBottom: '50px'}}>Sarah's Checked Out Items!</h1>
        <Paper style={{backgroundColor: 'rgb(255, 250, 227)', width: '75%', margin: '10px auto'}}>
            <Table aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="left"><b>Name</b></TableCell>
                    <TableCell align="left"><b>Borrow Date</b></TableCell>
                    <TableCell align="left"><b>Due Date</b></TableCell>
                    <TableCell align="left"><b>Renewals</b></TableCell>
                    <TableCell align="left"><b>Overdue</b></TableCell>
                    <TableCell align="left"></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {this.state.items.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell align="left" component="th" scope="row">
                            {item.name}
                        </TableCell>
                        <TableCell align="left">{item.borrowDate.substring(0,10)}</TableCell>
                        <TableCell align="left">{item.dueDate.substring(0,10)}</TableCell>
                        <TableCell align="left">{item.numberRenewals}</TableCell>
                        <TableCell align="left">{item.overdue === 0 ? 'No' : 'Yes'}</TableCell>
                        <TableCell align="left">
                          <Button 
                              type="submit" 
                              variant="contained" 
                              color="secondary"
                              style={{margin: '4%'}}>Renew
                          </Button>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </Paper>
      </div>
    );
  }
}

export default CheckedOut;