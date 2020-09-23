import React, { useContext, Fragment, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import SearchFormHome from '../search/homeSearchForm/SearchFormHome';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import { RootStoreContext } from '../../app/stores/rootStore';
import LoginForm from '../user/LoginForm';
import RegisterForm from '../user/RegisterForm';
import { observer } from 'mobx-react-lite';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import { history } from "../..";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuIcon from '@material-ui/icons/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import HelpIcon from '@material-ui/icons/Help';
import InfoIcon from '@material-ui/icons/Info';
import SearchIcon from '@material-ui/icons/Search';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Divider } from '@material-ui/core';
import UserImage from '../../assets/images/user.png';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        titleContainer: {
            flexGrow: 1,
            marginLeft: theme.spacing(1),
        },
        title: {
            textDecoration: 'none',
            color: '#fff',
            '&:focus': {
                backgroundColor: 'inherit',
                color: '#fff'
            },
            '&:hover': {
                backgroundColor: 'inherit',
                color: '#fff'
            },
        },
        subTitle: {
            marginRight: theme.spacing(4),
            textDecoration: 'none',
            color: '#fff',
            '&:focus': {
                backgroundColor: 'inherit',
                color: '#fff'
            },
            '&:hover': {
                backgroundColor: 'inherit',
                color: '#fff'
            },
        },
        userImage: {
            marginRight: theme.spacing(4),
            textDecoration: 'none',
            '& img': {
                width: 40,
                height: 40,
                objectFit: 'cover',
                borderRadius: 40,
            }
        },
        //I add a test class, to understand how to add new class 
        //and I consume it in <AppBar>, find below, 
        //For more check above 'titleContainer', 'title' or 'subtitle' class
        test: {
            backgroundColor: '#667711'
        },
        login: {
            display: 'flex'
        },
    }),
);

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props: MenuProps) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

const TopBar = () => {
    const rootStore = useContext(RootStoreContext);
    const token = window.localStorage.getItem('jwt');
    const { isLoggedIn, user, logout } = rootStore.userStore;
    const { openModal, openSearchModal } = rootStore.modalStore;
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const matches = useMediaQuery('(min-width:750px)');

    window.onresize = () => {
        handleClose();
    }
    useEffect(() => {
        setAnchorEl(null);
    }, [isLoggedIn])

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigateUser = (to: string) => {
        handleClose();
        history.push(to);
    }

    const iconButtonOnMobile = !matches ?
        <IconButton onClick={handleMenu} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
        </IconButton> : null;


    const iconUserOnLogin = matches && user &&
        <Typography component={RouterLink} to="/" variant="h6" className={classes.userImage}>
            <img src={user!.image || UserImage} alt='user display' onClick={handleMenu}/>
        </Typography>;

    // const iconUserOnLogin = matches && user &&
    //     <IconButton
    //         aria-label="account of current user"
    //         aria-controls="menu-appbar"
    //         aria-haspopup="true"
    //         onClick={handleMenu}
    //         color="inherit"
    //     >
    //         <AccountCircleIcon />
    //         <Typography variant="h6">{user!.username.toUpperCase()}</Typography>
    //     </IconButton>;

    const subMenus = matches ?
        <Fragment>
            <Typography component={RouterLink} to="/" variant="h6" className={classes.subTitle}>
                <IconButton aria-label="search" color="inherit" onClick={() => openSearchModal(<SearchFormHome />)}>
                    <SearchIcon />
                </IconButton>
            </Typography>
            <Typography component={RouterLink} to="/" variant="h6" className={classes.subTitle}>
                Matches
            </Typography>
            <Typography component={RouterLink} to="/" variant="h6" className={classes.subTitle}>
                FAQ
            </Typography>
            <Typography component={RouterLink} to="/" variant="h6" className={classes.subTitle}>
                About
            </Typography>
        </Fragment> : null;

    const userStyledMenu = <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
    >
        {isLoggedIn && token && user &&
            <StyledMenuItem
                onClick={() => navigateUser(`/playerprofile/${user!.username}`)}>
                <ListItemIcon>
                    <AccountCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Profile" />
            </StyledMenuItem>}
        {isLoggedIn && token && user &&
            <StyledMenuItem
                onClick={user.club !== null
                    ? () => navigateUser(`/user/${user.username}/${user.club.id}`)
                    : () => navigateUser(`/${user.username}/register/club`)
                }>
                <ListItemIcon>
                    <GroupWorkIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Club" />
            </StyledMenuItem>}
        {isLoggedIn && token && user && !matches &&
            <Divider />
        }
        {!matches &&
            <StyledMenuItem
                onClick={() => openSearchModal(<SearchFormHome />)}>
                <ListItemIcon>
                    <SearchIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Search" />
            </StyledMenuItem>}
        {!matches &&
            <StyledMenuItem
                onClick={() => navigateUser(`/`)}>
                <ListItemIcon>
                    <EmojiEventsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Matches" />
            </StyledMenuItem>}
        {!matches &&
            <StyledMenuItem
                onClick={() => navigateUser(`/`)}>
                <ListItemIcon>
                    <HelpIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="FAQ" />
            </StyledMenuItem>}
        {!matches &&
            <StyledMenuItem
                onClick={() => navigateUser(`/`)}>
                <ListItemIcon>
                    <InfoIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="About" />
            </StyledMenuItem>}
        {isLoggedIn && token && user && !matches &&
            <Divider />
        }
        {isLoggedIn && token && user &&
            <StyledMenuItem>
                <ListItemIcon>
                    <ExitToAppIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Logout" onClick={logout} />
            </StyledMenuItem>}

    </StyledMenu>;

    return (
        <Fragment>
            <CssBaseline />
            <div className={classes.root}>
                {/* <AppBar className={classes.test} position="static"> */}
                <AppBar position="static">
                    <Toolbar>
                        {iconButtonOnMobile}
                        <div className={classes.titleContainer}>
                            <Typography component={RouterLink} to="/" variant="h6" className={classes.title}>
                                CricketEU
                        </Typography>
                        </div>
                        {subMenus}
                        {userStyledMenu}
                        {isLoggedIn && user && token ?
                            <div>
                                {iconUserOnLogin}
                            </div>
                            : <div className={classes.login}>
                                <Button className={classes.menuButton} onClick={() => openModal(<RegisterForm />)} variant="contained" color="secondary">
                                    SIGNUP
                            </Button>
                                <Button onClick={() => openModal(<LoginForm />)} variant="contained" color="default">
                                    LOGIN
                            </Button>
                            </div>
                        }
                    </Toolbar>
                </AppBar>
            </div>
        </Fragment>

    )
}

export default observer(TopBar);