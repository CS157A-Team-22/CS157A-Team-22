import React from 'react'
import Item from './Item'

import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = theme => ({
  root: {
    flexGrow: 1,
  }
});

const ItemViewer = (props) => {
  const { classes } = props;
  return(
    <div>
      <Grid container className={classes.root} spacing={3} style={{padding: '30px'}}>
        { props.items.map((anItem, index) => {
          return (
            <Grid item xs={3} key={index}>
              <Item key={index} item={anItem} />
            </Grid>
          )
        }) }
      </Grid>
    </div>
  );
}

export default withStyles(useStyles)(ItemViewer)