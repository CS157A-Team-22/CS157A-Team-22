import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

// import SearchIcon from '@material-ui/icons';
import { FormControl, FormGroup, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  });

class SearchBar extends Component {
    render() { 
        const { classes } = this.props;
        return ( 
            <Container maxWidth="sm">
                <FormGroup>
                    <FormControl>
                        <TextField 
                            id="filled-basic" 
                            placeholder="Search..." 
                            margin="normal"
                            variant="filled"
                        />
                    </FormControl>
                </FormGroup>
            </Container>
         );
    }
}
 
export default withStyles(styles)(SearchBar);
