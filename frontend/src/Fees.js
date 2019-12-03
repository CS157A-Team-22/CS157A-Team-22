import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';

import axiosClient from './config/axiosClient';
import { withRouter } from 'react-router-dom';

class Fees extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            fees: 0
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
            this.setState({ fees });
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
                <p>{this.state.fees}</p>
            </Paper>
        );
    }
}
 
export default withRouter(Fees);