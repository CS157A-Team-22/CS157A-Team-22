import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axiosClient from './config/axiosClient';
import { withRouter } from 'react-router-dom';

class Fees extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            fees: 0.0,
            overdueItems:[]
        }
    }

    componentDidMount() {
        if (this.props.authUser) {
            this.getUserInfo();
        } else {
            this.props.history.push('/');
        }
    }

    getUserInfo = () => {
        let { authUser } = this.props;
        axiosClient.fetch.getUserInfo({
            params: { authUser }
        })
        .then(res => {
            console.log(res);
            this.setState({ userInfo: res.data[0] })
            this.getFees(res.data[0]);
        })
        .catch(err => {
            console.log("Error in getting user info: ", err);
        })
    }

    // hit the API endpoint to get the fees from DB 
    getFees = (userInfo) => {
        let overdueItems = [];
        let { fees } = this.state;

        axiosClient.fetch.getFees({ params: { userInfo } })
        .then(res => {
            console.log("Fees fetched successfully");
            overdueItems = res.data;
            for (let i = 0; i < overdueItems.length; i++) {
                fees += overdueItems[i].lateFee;
            }
            axiosClient.update.insertFees({
                'card-number': userInfo.libraryCardNumber,
                'fees': fees
            })
            .catch(err => {
                console.log("error in inserting fees", err);
            })
            this.setState({ fees, overdueItems });
        })
        .catch(err => {
            console.log("error in getting overdueItems", err);
        })
    }

    render() { 
        return ( 
            <>
            <h1 
                style={{
                    textAlign: 'center', 
                    marginTop: '50px', 
                    marginBottom: '50px'}}
                >
                { this.state.userInfo.firstName }'s Fees!
            </h1>
            {this.state.fees === 0 ? <p style={{textAlign: 'center'}}>No fees on account!</p> : this.renderFees() }
            
            </>
        );
    }

    renderFees = () => {
        return (
            <Paper style={{
                backgroundColor: 'rgb(255, 250, 227)', 
                width: '75%', 
                margin: '10px auto',
                padding: '5%'
                }}>
                <p style={{textAlign:"center"}}>Total fees on account: ${this.state.fees}</p>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="left"><b>Name</b></TableCell>
                        <TableCell align="left"><b>Due Date</b></TableCell>
                        <TableCell align="left"><b>Late Fee</b></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.overdueItems.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell align="left" component="th" scope="row">
                                    {item.name}
                                </TableCell>
                                <TableCell align="left">{item.dueDate.substring(0,10)}</TableCell>
                                <TableCell align="left">${item.lateFee}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}
 
export default withRouter(Fees);