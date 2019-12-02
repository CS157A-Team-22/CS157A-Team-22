import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axiosClient from '../config/axiosClient';

class ItemPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            details: {}, 
            wishList: false,
            hold: false,
            userInfo: {}
        };
    }

    componentDidMount() {
        this.getUserInfo();
    }

    getUserInfo = () => {
        let { authUser } = this.props;
        axiosClient.fetch.getUserInfo({
            params: { authUser }
        })
        .then(res => {
            console.log(res);
            this.setState({ userInfo: res.data[0] });
            this.getDetails();
        })
        .catch(err => {
            console.log("Error in getting user info: ", err);
        })
    }

    getDetails = () => {
        console.log('getting details');
        let { item } = this.props.location.state;

        axiosClient.fetch.getItemDetails({
            params: { 'call-number': item.callNumber }
        })
        .then(res => {
            console.log(res);
            this.setState({ details: res.data[0] });
        })
        .catch(err => {
            console.log("Error in getting item details: ", err);
        })
    }

    handleAddToWishList = () =>{
        let { item } = this.props.location.state;
        let { userInfo } = this.state;
        axiosClient.update.addToWishList({
            'call-number': item.callNumber,
            'card-number': userInfo.libraryCardNumber
        })
        .then(res => {
            console.log("added to wishlist successfully");
            alert("Added to wishlist successfully!");
            this.setState({
                wishList: true
            });
        })
        .catch(err => {
            console.log(err.response);
            alert(err.response.data.error);
        })
    }

    handlePlaceHold = () => {
        let { item } = this.props.location.state;
        let { userInfo } = this.state;
        axiosClient.update.addToHold({
            'call-number': item.callNumber,
            'card-number': userInfo.libraryCardNumber
        })
        .then(res => {
            console.log("added to hold successfully");
            alert("Placed item on hold successfully!");
            this.setState({
                hold: true
            });
        })
        .catch(err => {
            console.log(err);
            alert(err.response.data.error);
        })
    }

    render() {
        let { item } = this.props.location.state;
        let { details } = this.state;
        return ( 
            <>
            <Card style={{
                backgroundColor: 'rgb(255, 250, 227)', 
                width: '75%',
                margin: '50px auto',
                padding: '40px'   
            }}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        { item.name }
        
                    </Typography>
                    <Typography  color="textSecondary">
                        <br/>
                        Genre: { item.genre }
                    </Typography>
                    <Typography variant="body2" component="p">
                        Call number: { item.callNumber }
                    </Typography>
                    {
                        details.author && 
                        <Typography variant="body2" component="p">
                            Author: { details.author }
                        </Typography>
                    }
                    {
                        details.actor && 
                        <Typography variant="body2" component="p">
                            Actor: { details.actor }
                        </Typography>
                    }
                    {
                        details.actor &&
                        <Typography variant="body2" component="p">
                            Director: { details.director }
                        </Typography>
                    }
                    <Typography variant="body2" component="p">
                        <br/>
                        Status: { item.status }
                    </Typography>
                </CardContent>
    
                <CardActions style={{float: 'right'}}>
                    {(item.status === "checked out") && 
                        <Button 
                            size="small" 
                            variant="contained" 
                            color="secondary"
                            onClick={this.handlePlaceHold}
                            disabled={this.state.hold}
                        >
                            Place Hold!
                        </Button>
                    }
                    <Button 
                        size="small" 
                        variant="contained" 
                        color="primary"
                        onClick={this.handleAddToWishList}
                        disabled={this.state.wishList}
                    >
                        Add to Wishlist!
                    </Button>
                </CardActions>
            </Card>
            </>
        );
    }
}
 
export default withRouter(ItemPage);