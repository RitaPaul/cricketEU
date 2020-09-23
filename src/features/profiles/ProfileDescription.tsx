import React, { useContext, useState, Fragment } from 'react';
import { Tab, Grid, Header, Button, Card } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import ProfileEditForm from './ProfileEditForm';
import { observer } from 'mobx-react-lite';

const ProfileDescription = () => {
  const rootStore = useContext(RootStoreContext);
  const { updateProfile, profile, isCurrentUser } = rootStore.profileStore;
  const [editMode, setEditMode] = useState(false);
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated='left'
            icon='user'
            content={`About ${profile!.displayName}`}
          />
          {isCurrentUser && (
            <Button
              floated='right'
              basic
              content={editMode ? 'Cancel' : 'Edit Profile'}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <ProfileEditForm updateProfile={updateProfile} profile={profile!} />
          ) : (
              <Card fluid>
                <Card.Content>
                  <Card.Header>{profile!.displayName}</Card.Header>
                  <Card.Meta>{profile!.joinAs !== 'Other' ?
                    <Fragment>He is join as {profile!.joinAs}
                      {profile!.batsman}</Fragment>

                    :
                    <Fragment><span>He is join as {profile!.other}</span></Fragment>
                  }
                  </Card.Meta>
                  <Card.Description>
                    {profile!.bio}
                  </Card.Description>
                </Card.Content>
              </Card>
            )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileDescription);
