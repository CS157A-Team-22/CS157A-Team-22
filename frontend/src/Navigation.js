import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from './Firebase/context';

import styles from './config/materialCss';

import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

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
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';

import axiosClient from './config/axiosClient';

const materialCss = styles;

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state= {
            open: false, 
            options: []
        };
    }

    componentDidMount() {
        if (this.props.authUser) {
            this.getUserInfo();
        } else {
            this.props.history.push('/');
        }
    }

    getUserType = (userInfo) => {
        let { authUser } = this.props;
        axiosClient.fetch.getUserType({
            'card-number': userInfo.libraryCardNumber
        })
        .then(res => {
            console.log(res);
            this.setState({ options: res.data.options });
        })
        .catch(err => {
            console.log("Error in getting user type: ", err);
        }) 
    }

    getUserInfo = () => {
        let { authUser } = this.props;
        axiosClient.fetch.getUserInfo({
            params: { authUser }
        })
        .then(res => {
            console.log(res);
            this.getUserType(res.data[0]);
        })
        .catch(err => {
            console.log("Error in getting user info: ", err);
        })
    }

    handleDrawerClose = () => {
        this.setState({open: false});
    }
    
    handleDrawerOpen = () => {
        this.setState({open: true});
    }

    /*
        Takes a text element in the sidebar such as "Reading history", converts it into
        "reading-history" and switches to its corresponding react route. 
        If user selects "Log Out", perform sign out process on Firebase
    */
    handleListItemClick = (text) => {
        console.log(text);
        let url = text.split(' ').join('-').toLowerCase();
        if (text === "Log Out") {
            this.props.firebase.doSignOut()
        }
        this.props.history.push(`/${url}`);
    }

    handleClickHome = () => {
        this.props.history.push('/items');
    }

    render() { 
        const { classes, theme } = this.props;
        const { options } = this.state;
        return ( 
            <>
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
                        <IconButton
                            color="inherit"
                            onClick={this.handleClickHome}
                            style={{float: 'right', alignItem: 'right', marginLeft:'85%'}}
                        >
                        <HomeIcon/>
                        </IconButton>
                            
                        
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
                        {options.map((text, index) => (
                        <ListItem button key={text} onClick={() => this.handleListItemClick(text)}>
                            <ListItemText primary={text} />
                        </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        <ListItem>
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="secondary"
                                onClick={() => this.handleListItemClick("Log Out")}
                            >
                                Log Out
                            </Button> 
                        </ListItem>
                    </List>
                </Drawer>    
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: this.state.open,
                    })}
                >
                    {this.props.children}
                </main>
            </>
         );
    }
}
 
export default withRouter(withStyles(materialCss, { withTheme: true })(withFirebase(Navigation)));