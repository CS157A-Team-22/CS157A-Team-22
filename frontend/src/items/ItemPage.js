import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class ItemPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            details: {}
        };
    }

    render() {
        let { item } = this.props.location.state;

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
                        >
                            Place Hold!
                        </Button>
                    }
                    <Button 
                        size="small" 
                        variant="contained" 
                        color="primary"
                        onClick={this.handleAddToWishList}
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