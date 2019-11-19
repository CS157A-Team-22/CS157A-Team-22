import React from 'react'
import Item from './Item'

import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import axiosClient from '../config/axiosClient';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  }
}));

class ItemViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items:[]
    }
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

  render() {
    const { classes } = this.props;
    return(
      <div>
        <Grid container className={classes.root} spacing={3} style={{padding: '30px'}}>
          { this.state.items.map((anItem, index) => {
            // console.log(anItem)
            return (
              <Grid item xs={3} key={index}>
                <Item key={index} item={anItem} />
              </Grid>
            )
          }) }
        </Grid>
      </div>
  )}
}

export default withStyles(useStyles)(ItemViewer)