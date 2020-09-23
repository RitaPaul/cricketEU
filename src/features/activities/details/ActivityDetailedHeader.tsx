import React, { useContext } from 'react';
import { Segment, Item, Header, Button, Image } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { RootStoreContext } from '../../../app/stores/rootStore';


const activityImageStyle = {
  filter: 'brightness(30%)'
};

const activityImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};

const ActivityDetailedHeader: React.FC<{ activity: IActivity }> = ({
  activity
}) => {
  const host = activity.attendees.filter(x => x.isHost)[0];
  const rootStore = useContext(RootStoreContext);
  const { attendActivity, cancelAttendance, loading } = rootStore.activityStore;
  const { hasClub} = rootStore.userStore;
    
  const headerContent = activity.title === 'Match' ? `${activity.title} vs ${activity.vsTeam}` : activity.title;

  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image
          src={`/src/assets/categoryImages/${activity.title}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment style={activityImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={headerContent}
                  style={{ color: 'white' }}
                />
                <p>{format(activity.date, 'eeee do MMMM')}</p>
                <p>
                  Hosted by{' '}
                  <Link to={`/playerprofile/${host.username}`}>
                    <strong>{host.displayName}</strong>
                  </Link>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached='bottom'>
        {activity.isHost && hasClub ? (
          <Button
            as={Link}
            to={`/manage/${activity.id}`}
            color='orange'
            floated='right'
          >
            Manage Event
          </Button>
        ) : activity.isGoing ? (
          <Button loading={loading} onClick={cancelAttendance}>
            Cancel attendance
          </Button>
        ) : (
          <Button loading={loading} onClick={attendActivity} color='teal'>
            Join Activity
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default observer(ActivityDetailedHeader);
