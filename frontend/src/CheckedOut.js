import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

import axiosClient from './config/axiosClient';

class CheckedOut extends React.Component {

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
  getItems = (userInfo) => {
    axiosClient.fetch.getCheckedOut({ params: { userInfo } })
    .then(res => {
      console.log("Checked out items fetched successfully");
      this.setState({ items: res.data });
    })
    .catch(err => {
      console.log("error in getting checked out items", err);
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

  handleRenew = (item) => {
    axiosClient.update.renewItem({ item })
    .then(res => {
      alert("Item renewed successfully");
      this.getItems(this.state.userInfo);
    })
    .catch(err => {
      console.log("error in renewing item", err);
      alert(err.response.data.error);
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
          { this.state.userInfo.firstName }'s Checked Out Items!
        </h1>
        {this.state.items.length === 0 ? <p style={{textAlign: 'center'}}>No items currently checked out!</p> : this.renderTable()}
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
                    style={{margin: '4%'}}
                    onClick={() => this.handleRenew(item)}>Renew
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withRouter(CheckedOut);