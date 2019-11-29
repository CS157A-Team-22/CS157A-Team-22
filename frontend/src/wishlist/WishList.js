import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axiosClient from '../config/axiosClient';
import WishListTable from './WishListTable';

class WishList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            userInfo: {}
        };
    }
    
    componentDidMount() {
        this.getUserInfo();
        this.getWishListItems();
    }

    // hit the API endpoint to get the items from DB 
    getWishListItems = () => {
        let { userInfo } = this.state;
        axiosClient.fetch.getWishListItems({
            params: { userInfo }
        })
        .then(res => {
            console.log("wishlist items fetched successfully");
            this.setState({ items: res.data });
        })
        .catch(err => {
            console.log("error in getting wishlist items", err);
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
        })
        .catch(err => {
            console.log("Error in getting user info: ", err);
        })
    }

    handleClickListItem = (item) => {
        this.props.history.push({
            pathname: '/item',
            state: { item }
        })
    }

    render() { 
        let { authUser } = this.props;
        console.log(typeof authUser);
        return ( 
            <>
                <h1 style={{textAlign: 'center', marginTop: '50px', marginBottom: '30px'}}>{ this.state.userInfo.firstName }'s Wishlist!</h1>
                {this.state.items.length === 0 ? 
                    <p style={{textAlign: 'center'}}>No items in wishlist</p> : 
                    <WishListTable items={this.state.items} style={{margin: '0 auto'}} onClick={this.handleClickListItem}/>}
            </>
        );
    }
}
 
export default withRouter(WishList);