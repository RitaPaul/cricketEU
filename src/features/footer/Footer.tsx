import React from 'react';
import { Link } from 'react-router-dom';
import LinkTo from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import PlaceIcon from '@material-ui/icons/Place';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import Hidden from '@material-ui/core/Hidden';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import Tab from '@material-ui/core/Tab';
const useStyles= makeStyles({
  footerLogo:{
    color: '#E0BA6A',
    textShadow: '.5px .5px #06083B;',
    fontStyle: 'italic',},
  
  footerContainer:{
    background: '#CCCCCC',
    padding: 30,
    paddingBottom: 0,
    color: '#6C6C6C',
     '& a, & p':{
        fontSize:'1',},
     '& h5':{
        marginBottom:15,
        marginTop:10,
        fontWeight:'500',
        color:'#1d3847'},
     '& a':{
        color: '#6C6C6C',
        fontWeight:'500',},
    },
    footerContact:{
     '& .MuiSvgIcon-root':{
        marginBottom:-5,
        marginRight: 10,},
    '& a':{
       display:'block',
       margin:7,},
    },
    footerAbout:{
    '& p':{
       lineHeight: 2,
      fontWeight:'500',},
    },
    footerFollow:{
      '& a':{
        margin:10,
        display:'block',},
    },
    socialIcons:{
      height:28,
      width:28,
    },
    footerNavigation:{
      height:'50px',
      marginTop:50,
      borderTop: '1px solid rgba(31,36,48,.2)',
      '& a':{
        minWidth: '40px!important',
        color:'#1d3847',
        textTransform: 'revert',
        wrap:'nowrap',
        padding: '8px 6px',},
    },
    marginLeft:{
      marginLeft:10,},
});
export const Footer = () =>{
  const classes = useStyles();
  return(
    <Grid container className={classes.footerContainer}>
      <Typography variant="h4" className={classes.footerLogo}>EUCricket</Typography>
      <Grid container justify="space-around" alignItems="flex-start">
        <Grid item  xs={7} sm={5} md={3} lg={2}   className={classes.footerContact}>
          <Typography variant="h5" className={classes.marginLeft}>Contact</Typography>
          <LinkTo href="/" variant="body1" underline="none"><PlaceIcon /> Copenhagen 1234,DK </LinkTo>
          <LinkTo href="tel:+4520556191" variant="body1" underline="none"><PhoneIcon /> +4520556191 </LinkTo>
          <LinkTo href="mailto:iamrajpal83@gmail.com" variant="body1" underline="none"><EmailIcon /> iamrajpal83@gmail.com </LinkTo>
          <LinkTo href="mailto:iamrajpal82@gmail.com" variant="body1" underline="none"><EmailIcon /> iamrajpal82@gmail.com </LinkTo>
        </Grid>
        <Hidden smDown>
        <Grid item  xs={6} sm={5} md={3} lg={2}  className={classes.footerAbout}>
          <Typography variant="h5">About</Typography>
          <Typography variant="body1">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
            deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati</Typography>
        </Grid>
        </Hidden>
        <Grid item xs={3} sm={5} md={3} lg={2} className={classes.footerFollow} >
        <Typography variant="h5">FollowUs </Typography>
          <LinkTo href="#" ><FacebookIcon className={classes.socialIcons}/> </LinkTo>
          <LinkTo href="#" ><TwitterIcon className={classes.socialIcons}/> </LinkTo>
          <LinkTo href="#" ><InstagramIcon className={classes.socialIcons}/> </LinkTo>
        </Grid>
        <Grid container direction="row" alignItems="center" justify="space-between" className={classes.footerNavigation}>
        <Grid item xs={3} >
            <Typography variant="body2">&copy; copyright </Typography>
        </Grid>
        <Grid container xs={9} sm={6} justify="flex-end" direction="row">
            <Tab component={Link} to="/"  label="Home" />
            <Tab component={Link} to="/"  label="Matches" />
            <Tab component={Link} to="/"  label="FAQ" />
            <Tab component={Link} to="/"  label="Help" />
            <Tab component={Link} to="/"  label="About" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>

  )
}
