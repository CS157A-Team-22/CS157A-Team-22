import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router-dom';

import axiosClient from '../config/axiosClient';

class ReadingHistory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [], 
      open: false,
      userInfo: {}
    };
  }

  componentDidMount() {
    if (this.props.authUser) {
      this.getUserInfo();
    } else {
      this.props.history.push('/');
    }
  }

  // hit the API endpoint to get the items from DB 
  getItems = ( userInfo ) => {
    axiosClient.fetch.getReadingHistory({ params: { userInfo } })
    .then(res => {
      console.log("items fetched successfully");
      this.setState({ items: res.data });
    })
    .catch(err => {
      console.log("error in getting items", err);
    })
  }

  getUserInfo = () => {
    let { authUser } = this.props;
    axiosClient.fetch.getUserInfo({
        params: { authUser }
    })
    .then(res => {
        console.log(res);
        this.setState({ userInfo: res.data[0] })
        this.getItems(res.data[0]);
    })
    .catch(err => {
        console.log("Error in getting user info: ", err);
    })
  }

  render() {
    
    return (
      <div>
        <h1 
          style={{
            textAlign: 'center', 
            marginTop: '50px', 
            marginBottom: '50px'}}
        >
          { this.state.userInfo.firstName }'s  Reading History!
        </h1>
        {this.state.items.length === 0 ? <p style={{textAlign: 'center'}}>No items in reading history yet!</p> : this.renderTable()}
      </div>
    );
  }

  renderTable = () => {
    return(
      <Paper style={{backgroundColor: 'rgb(255, 250, 227)', width: '75%', margin: '10px auto'}}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
                <TableCell align="left"><b>Name</b></TableCell>
                <TableCell align="left"><b>Borrow Date</b></TableCell>
                <TableCell align="left"><b>Return Date</b></TableCell>
                <TableCell align="left"><b>Renewals</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell align="left" component="th" scope="row">
                    {item.name}
                </TableCell>
                <TableCell align="left">{item.borrowDate.substring(0,10)}</TableCell>
                <TableCell align="left">{item.returnDate.substring(0,10)}</TableCell>
                <TableCell align="left">{item.numberRenewals}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withRouter(ReadingHistory);