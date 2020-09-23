import React, { Fragment } from 'react';

//import { Grid, Segment, Header, Responsive} from 'semantic-ui-react';
import css from './HomePage.module.css';
import { toast } from 'react-toastify';
import { Grid, ListItem, ListIcon, Container, GridColumn } from 'semantic-ui-react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/styles';
import { ListItemText, Box, Typography } from '@material-ui/core';

const useStyles=makeStyles({
    red:{background:'red'},
    yellow:{background:'yellow'},
    green:{background:'green'},
    blue:{background:'blue'},
    orange:{background:'orange'},

    typopgraphy:{
        color:'#06083b'
    },
    margin_top:{marginTop:'20px!important'}
});

export const Feature = () => {
    const classes =useStyles();
    return (
        <Fragment>
            <Grid container className={classes.orange}>
                <Grid item direction ="row" xs={12} className={classes.blue}>
                        <List className={classes.green}>
                            
                            <ListItem><ListItemText primary="Add Player" /></ListItem> 
                            <ListItem><ListItemText primary="Add Team" /></ListItem> 
                            <ListItem><ListItemText primary="Tournaments" /></ListItem> 
                            <ListItem><ListItemText primary="Arrange Tournaments" /></ListItem> 
                            <ListItem><ListItemText primary="Events" /></ListItem> 
                            <ListItem><ListItemText primary="FAQ" /></ListItem> 
                        </List>
                       
                </Grid>
                <Grid xs={12}   direction ="row" className={classes.green}>
                    <Grid item   className={classes.yellow}><h1 className={classes.typopgraphy}>Jobs are here </h1> </Grid>
                    <Grid item className={classes.red}>
                        <List className={classes.green}>
                            <ListItem><ListItemText primary="Add Player" /></ListItem> 
                            <ListItem><ListItemText primary="Add Team" /></ListItem> 
                            <ListItem><ListItemText primary="Tournaments" /></ListItem> 
                            <ListItem><ListItemText primary="Arrange Tournaments" /></ListItem> 
                            <ListItem><ListItemText primary="Events" /></ListItem> 
                            <ListItem><ListItemText primary="FAQ" /></ListItem> 
                        </List>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    )
}
