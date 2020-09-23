import React from 'react';

import { IPlayerProfile } from '../../app/models/profile';
import { observer } from 'mobx-react-lite';
import UserPng from '../../../src/assets/images/user.png';
import { makeStyles, Theme, createStyles, Card, CardContent, Typography, IconButton, CardMedia } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

interface IProps {
  profile: IPlayerProfile;
  isCurrentUser: boolean;
  loading: boolean;
  follow: (username: string) => void;
  unfollow: (username: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      height: 60,
    },
    personIcon: {
      height: 38,
      width: 38,
    },
  }),
);

const ProfileHeader: React.FC<IProps> = ({
  profile}) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={profile.image || UserPng}
        title={profile.displayName || 'player photo'}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5" >
            {profile.displayName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Follower: {profile.followersCount}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Following: {profile.followingCount}
          </Typography>
        </CardContent>

        <div className={classes.controls}>
          <IconButton aria-label="follow/unfollow">
            <PersonAddIcon className={classes.personIcon} />
          </IconButton>
        </div>
      </div>
    </Card>

  );
};

export default observer(ProfileHeader);
