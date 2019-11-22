import React, { Component } from 'react';

// import SearchIcon from '@material-ui/icons';
import { FormControl, FormGroup, TextField } from '@material-ui/core';
import Container from '@material-ui/core/Container';

class SearchBar extends Component {
    render() { 
        const { searchText } = this.props;
        return ( 
            <Container maxWidth="sm">
                <FormGroup>
                    <FormControl>
                        <TextField 
                            id="filled-basic" 
                            placeholder="Search..." 
                            margin="normal"
                            variant="filled"
                            value={ searchText }
                            onChange={(e) => this.props.onChange(e.target.value)}
                        />
                    </FormControl>
                </FormGroup>
            </Container>
         );
    }
}
 
export default SearchBar;
