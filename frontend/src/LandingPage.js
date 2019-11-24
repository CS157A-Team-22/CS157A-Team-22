import React from 'react'
import { withRouter } from 'react-router-dom';

import ItemViewer from './items/ItemViewer'
import SearchBar from './items/SearchBar'

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

import axiosClient from './config/axiosClient';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    // flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
});

class LandingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [], 
      searchText: '',
      open: false
    };
  }

  componentDidMount() {
    this.getItems();
  }

  // hit the API endpoint to get the items from DB 
  getItems = () => {
    axiosClient.fetch.getItems()
    .then(res => {
      console.log("items fetched successfully");
      this.setState({ items: res.data });
    })
    .catch(err => {
      console.log("error in getting items", err);
    })
  }

  handleSearchTextChange = (value) => {
    this.setState({
      searchText: value
    });
  }

  handleDrawerClose = () => {
    this.setState({open: false});
  }

  handleDrawerOpen = () => {
    this.setState({open: true});
  }

  handleListItemClick = (text) => {
    console.log(text);
    text = text.split(' ');
    if (text[0].toLowerCase() === 'wish') {
      axiosClient.fetch.getWishList({
        params: {'card-number': '12'}
      })
      .then(res => {
        console.log("wishlist fetched successfully");
        this.props.history.push('/wishlist');
      })
      .catch(err => {
        console.log("error in getting wishlist", err);
      })
    }
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
            {['Checked out', 'Wish list', 'Reading history', 'Holds'].map((text, index) => (
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
          <SearchBar 
            searchText={this.state.searchText} 
            onChange={this.handleSearchTextChange}
          />
          <ItemViewer 
            items={this.state.items}
            searchText={this.state.searchText}
          />
        </main>
      </div>
    );
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(LandingPage));