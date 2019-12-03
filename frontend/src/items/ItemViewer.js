import React from 'react'
import Item from './Item'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = theme => ({
  root: {
    flexGrow: 1,
  }
});

const ItemViewer = (props) => {
  const { classes, searchText, items } = props;
  debugger;
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 || 
    item.genre.toLowerCase().indexOf(searchText.toLowerCase()) !== -1  
    // (item.author && item.author.toLowerCase().indexOf(searchText.toLowerCase())) !== -1 || 
    // (item.director && item.director.toLowerCase().indexOf(searchText.toLowerCase())) !== -1 ||
    // (item.actor && item.actor.toLowerCase().indexOf(searchText.toLowerCase())) !== -1 
  );

  return(
    <div>
      <Grid container className={classes.root} spacing={3} style={{padding: '30px'}}>
        { filteredItems.map((anItem, index) => {
          return (
            <Grid item xs={3} key={index} >
              <Item key={index} item={anItem}/>
            </Grid>
          )
        }) }
      </Grid>
    </div>
  );
}

export default withStyles(useStyles)(ItemViewer);