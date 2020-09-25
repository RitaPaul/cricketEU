import React from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import Container from '@material-ui/core/Container';
import ListItem from '@material-ui/core/ListItem';
import Skeleton from '@material-ui/lab/Skeleton';


const useStyles=makeStyles({
      clubManagement:{
        padding:10,
        '& .item':{
            color:'#6c6c6c',
            fontSize:'1.125rem',
            marginBottom: 10, },
        '& .MuiSvgIcon-root ':{
            color: '#9fce06',
            height:35,
            width:35,
            marginBottom: -10,
            marginRight: 10,},
        '& h4':{
            color:'#11214b',
            fontWeight:'700',
            letterSpacing:'0.01rem',
            paddingBottom:15,
            borderBottom: '1px solid #cccccc',
        },
    },
    carrier:{
        padding:10,
       '& h4':{
            color:'#11214b',
            fontWeight:'700',
            letterSpacing:'0.01rem',
            paddingBottom:15,
            borderBottom: '1px solid #cccccc',
            marginBottom:15,},
        },
    margin_top:{marginTop:'20px!important'}
});
export const Feature = () => {
    const classes =useStyles();
    return (
       <Container maxWidth='lg' >
          <Grid container  className={`${classes.margin_top}`} justify="center">
          <Grid item xs={12} sm={6}  alignItems="center" direction="row" className={classes.clubManagement}>
                         <Typography variant="h4">Club Management
                            </Typography>
                        <List >
                            <ListItem><DoneIcon />Add Player</ListItem> 
                            <ListItem><DoneIcon /> Add Team</ListItem> 
                            <ListItem><DoneIcon />Tournaments</ListItem> 
                            <ListItem><DoneIcon />Arrange Tournaments</ListItem> 
                            <ListItem><DoneIcon />Events</ListItem> 
                            <ListItem><DoneIcon />FAQ</ListItem> 
                        </List>                   
                </Grid>
                <Grid item xs={12} sm={6}  alignItems="center" direction="row" className={classes.carrier} >
                        <Typography variant="h4">Carrier</Typography>
                        <Skeleton variant="text" height={25} width="90%" />
                        <Skeleton variant="text" height={40} width="70%" />
                        <Skeleton variant="text" height={15} width="80%"  />

                        <Skeleton variant="text" height={25} width="90%" />
                        <Skeleton variant="text" height={40} width="70%" />
                        <Skeleton variant="text" height={15} width="80%" />

                        <Skeleton variant="text" height={25} width="90%" />
                        <Skeleton variant="text" height={40} width="70%" />
                        <Skeleton variant="text" height={15} width="80%" />                  
                </Grid>
           </Grid>
     </Container>
    )
}
