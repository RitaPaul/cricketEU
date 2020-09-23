import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import StdLarge from '../../assets/images/stadiumeu_large.jpg';
import Stadium from '../../assets/images/stadiumeu_large.jpg';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,            
        },
        homePic: {
            width: '100%',
            objectFit: 'cover'
        },
        paper: {
            marginTop: 0,
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);

const HomePicture = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <picture>
                            <source srcSet={StdLarge} media='(max-width: 768px)' />
                            <source srcSet={StdLarge} media='(max-width: 1024px)' />
                            <source srcSet={Stadium} media='(max-width: 1920px)' />
                            <img className={classes.homePic} src={Stadium} alt='Stadium' />
                        </picture>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default HomePicture;
