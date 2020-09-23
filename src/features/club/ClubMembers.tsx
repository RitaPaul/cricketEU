import React, { useContext } from 'react';
import { Tab, Grid, Header, Table } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import ClubUserProfile from './ClubUserProfile';
import { observer } from 'mobx-react-lite';

const ClubMembers = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    clubProfile,
    clubMembers,
    loadingMembers
  } = rootStore.clubProfileStore;
  return (
    <Tab.Pane loading={loadingMembers}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated='left'
            icon='user'
            content={
              `People ${clubProfile!.displayname} are member`
            }
          />
        </Grid.Column>
        {clubMembers.length > 0 &&
          <Grid.Column width={16}>
            <Table celled compact definition>
              <Table.Header fullWidth>
                <Table.Row>
                  <Table.HeaderCell>Approved</Table.HeaderCell>
                  <Table.HeaderCell>Avatar</Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Join as</Table.HeaderCell>
                  <Table.HeaderCell>Team</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {clubMembers.map(profile => (
                  <ClubUserProfile key={profile.id} clubId={clubProfile!.id} profile={profile} />
                ))}
              </Table.Body>
            </Table>
          </Grid.Column>
        }
      </Grid>

    </Tab.Pane>
  );
};

export default observer(ClubMembers);
