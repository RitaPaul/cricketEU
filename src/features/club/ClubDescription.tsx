import React, { useContext, useState} from 'react';
import { Tab, Grid, Header, Button, Card } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import ClubEditForm from './form/ClubEditForm';

const ClubDescription = () => {
  const rootStore = useContext(RootStoreContext);
  const { clubProfile, updateClub, isCurrentUserAndClub } = rootStore.clubProfileStore;
  const [editMode, setEditMode] = useState(false);
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated='left'
            icon='user'
            content={`About ${clubProfile!.clubname}`}
          />
          {isCurrentUserAndClub && (
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
            <ClubEditForm updateClub={updateClub} club={clubProfile!} />
          ) : (
              <Card fluid>
                <Card.Content>
                  <Card.Header>{clubProfile!.clubname}</Card.Header>
                  <Card.Meta>{clubProfile!.clubBio}</Card.Meta>
                </Card.Content>
              </Card>
            )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ClubDescription);
