import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

import axiosClient from './config/axiosClient';

class GenerateReport extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            reportObj: {}
        }
    }

    componentDidMount() {
        if (this.props.authUser) {
          this.getItems();
        } else {
          this.props.history.push('/');
        }
    }

    // hit the API endpoint to get the items from DB 
    getItems = () => {
        axiosClient.fetch.getReport()
        .then(res => {
            console.log("Report fetched successfully");
            console.log("res", res);
            this.setState({ reportObj: res.data });
        })
        .catch(err => {
            console.log("error in getting checked out items", err);
        })
    }
    render() { 
        let { reportObj } = this.state;
        return ( 
            <>
                <h1 
                    style={{
                        textAlign: 'center', 
                        marginTop: '50px', 
                        marginBottom: '50px'}}
                >
                    Report
                </h1>
                <Paper style={{backgroundColor: 'rgb(255, 250, 227)', width: '75%', margin: '10px auto'}}>
                    <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="left"><b>Available</b></TableCell>
                        <TableCell align="left"><b>Checked Out</b></TableCell>
                        <TableCell align="left"><b>On Hold</b></TableCell>
                        <TableCell align="left"><b>Total Fines</b></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="left">{reportObj['available']}</TableCell>
                            <TableCell align="left">{reportObj['checked out']}</TableCell>
                            <TableCell align="left">{reportObj['on hold']}</TableCell>
                            <TableCell align="left">${reportObj['fines']}</TableCell>
                        </TableRow>
                    </TableBody>
                    </Table>
                </Paper>
            </>
         );
    }
}
 

export default withRouter(GenerateReport);