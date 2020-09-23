import React, { useContext } from 'react';
import { Tab, Grid, Header, Card } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import ProfileCard from '../profiles/ProfileCard';
import { observer } from 'mobx-react-lite';

const ClubFollowings = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    clubProfile,
    clubFollowings,
    loadingFollowing,
  } = rootStore.clubProfileStore;
  return (
    <Tab.Pane loading={loadingFollowing}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated='left'
            icon='user'
            content={
              `People following ${clubProfile!.displayname}`
            }
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={5}>
            {clubFollowings.map(profile => (
              <ProfileCard key={profile.username} profile={profile} />
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ClubFollowings);
