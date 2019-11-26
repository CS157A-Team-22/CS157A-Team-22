import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import WishListTable from './WishListTable';
import styles from '../config/materialCss';

import axiosClient from '../config/axiosClient';

import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const materialCss = styles;

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

    handleDrawerClose = () => {
        this.setState({open: false});
    }
    
    handleDrawerOpen = () => {
    this.setState({open: true});
    }

    handleListItemClick = (text) => {
        console.log(text);
        let url = text.split(' ').join('-').toLowerCase();
        this.props.history.push(`/${url}`);
    }

    render() { 
        const { classes, theme } = this.props;

        return ( 
            <div>
                <AppBar 
          position="static"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" >
              Library
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.state.open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {['Checked out', 'Wish list', 'Check Out', 'Check In', 'Reading history', 'Holds'].map((text, index) => (
              <ListItem button key={text} onClick={() => this.handleListItemClick(text)}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Fees', 'Logout'].map((text, index) => (
              <ListItem button key={text} onClick={() => this.handleListItemClick(text)}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>

                <main 
                    className={clsx(classes.content, {
                        [classes.contentShift]: this.state.open,
                    })}
                >
                    <h1 style={{textAlign: 'center', marginTop: '50px'}}>{ this.state.name }'s Wishlist!</h1>
                    <WishListTable items={this.state.items} style={{margin: '10px auto'}}/>
                </main>
            </div>
        );
    }
}
 
export default withRouter(withStyles(materialCss, { withTheme: true })(WishList));