import React, { useContext, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import { RouteComponentProps } from 'react-router';
import { RootStoreContext } from '../../app/stores/rootStore';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  }),
);

interface RouteParams {
  username: string;
}

interface IProps extends RouteComponentProps<RouteParams> { }

const ProfilePage: React.FC<IProps> = ({ match }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadingProfile,
    profile,
    loadProfile,
    follow,
    unfollow,
    isCurrentUser,
    loading
  } = rootStore.profileStore;

  const classes = useStyles();

  useEffect(() => {
    loadProfile(match.params.username);
  }, [loadProfile, match]);

  const matches = useMediaQuery('(min-width:750px)');

  if (loadingProfile) return <LoadingComponent content='Loading profile...' />;

  return (
    <Grid container justify='center' className={classes.root} spacing={2}>
      <Grid item xs={matches ? 8 : 12}>
        <ProfileHeader
          profile={profile!}
          isCurrentUser={isCurrentUser}
          loading={loading}
          follow={follow}
          unfollow={unfollow}
        />
        <ProfileContent />
      </Grid>
    </Grid>
  );
};

export default observer(ProfilePage);
