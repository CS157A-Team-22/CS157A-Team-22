import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

const WishListTable = (props) => {
    return ( 
        <List>
            <ul style={{width: '50%', margin: '10px auto'}}>
                <Paper  
                    style={{backgroundColor: 'rgb(255, 250, 227)'}}>
                    {props.items.map((item,index) => (
                        <>
                            <ListItem key={`item-${item.name}-${index}`}>
                                <ListItemText key={`text-${index}`} primary={`${item.name}`} />
                            </ListItem>
                            <Divider key={`divider-${index}`}/>
                        </>
                    ))}
                </Paper>
            </ul>
        </List>
    );
}
 
export default WishListTable;