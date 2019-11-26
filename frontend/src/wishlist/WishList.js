import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import axiosClient from '../config/axiosClient';
import WishListTable from './WishListTable';

class WishList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            name: 'Sarah',
            open: false
        };
    }
    
    componentDidMount() {
        this.getWishListItems();
    }

    // hit the API endpoint to get the items from DB 
    getWishListItems = () => {
        axiosClient.fetch.getWishListItems({
            params: {'card-number': '14'}
        })
        .then(res => {
            console.log("wishlist items fetched successfully");
            this.setState({ items: res.data });
        })
        .catch(err => {
            console.log("error in getting wishlist items", err);
        })
    }

    handleClickListItem = (item) => {
        this.props.history.push({
            pathname: '/item',
            state: { item }
        })
    }

    render() { 
        return ( 
            <>
                <h1 style={{textAlign: 'center', marginTop: '50px', marginBottom: '30px'}}>{ this.state.name }'s Wishlist!</h1>
                {this.state.items.length === 0 ? 
                    <p style={{textAlign: 'center'}}>No items in wishlist</p> : 
                    <WishListTable items={this.state.items} style={{margin: '0 auto'}} onClick={this.handleClickListItem}/>}
            </>
        );
    }
}
 
export default withRouter(WishList);