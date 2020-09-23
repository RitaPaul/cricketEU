import React, { useContext } from 'react';
import { Tab, Grid, Header, Button, Icon } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import TeamForm from './form/TeamForm';
import TeamEditForm from './form/TeamEditForm';
import TeamDeleteForm from './form/TeamDeleteForm';
import Teams from './Teams';

const ClubTeams = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    clubProfile,
    clubTeams,
    isTeamEditable
  } = rootStore.clubProfileStore;

  const { openModal } = rootStore.modalStore;

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated='left'
            icon='user'
            content={
              `${clubProfile!.displayname} have following Teams`
            }
          />
        </Grid.Column>
      </Grid>
      <Grid centered columns={16}>
        {clubTeams.length > 0 ?
          <Grid.Row centered columns={4}>
            <Grid.Column>
              <Button icon
                onClick={() => openModal(<TeamForm />)}
                positive
                inverted
              >
                <Icon link name='add' />
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Teams/>             
            </Grid.Column>
            <Grid.Column>
              <Button
                disabled={!isTeamEditable}
                icon
                onClick={() => openModal(<TeamEditForm />)}
                positive
                inverted
              >
                <Icon link name='edit' />
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button
                disabled={!isTeamEditable}
                icon
                onClick={() => openModal(<TeamDeleteForm />)}
                negative
                inverted
              >
                <Icon link name='delete' />
              </Button>
            </Grid.Column>
          </Grid.Row> :
          <div>
            <Grid.Column size={16}>
              <Header
                as='h1'
                content="You don't have any team yet"
                color='teal'
                textAlign='center'
              />
            </Grid.Column>
            <Grid.Column size={16}>
              <Header
                as='h2'
                content='Add new team'
                color='teal'
                textAlign='center'
              />
            </Grid.Column>
            <Grid.Column size={16}>
              <Button icon
                onClick={() => openModal(<TeamForm />)}
                positive
                inverted
              >
                <Icon link name='add' />
              </Button>
            </Grid.Column>
          </div>
        }
      </Grid>

    </Tab.Pane>
  );
};

export default observer(ClubTeams);
