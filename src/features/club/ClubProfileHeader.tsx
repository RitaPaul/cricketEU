import React, { useContext } from 'react';
import {
  Segment,
  Item,
  Header,
  Grid,
  Statistic,
  Divider,
  Reveal,
  Button
} from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { IClubProfile } from '../../app/models/clubProfile';
import { RootStoreContext } from '../../app/stores/rootStore';
import LoginForm from '../user/LoginForm';
import User from '../../../src/assets/images/user.png';

// interface IProps {
//   profile: IProfile;
//   isCurrentUser: boolean;
//   loading: boolean;
//   follow: (username: string) => void;
//   unfollow: (username: string) => void;
// }

interface IProps {
  clubProfile: IClubProfile;
}

const ClubProfileHeader: React.FC<IProps> = ({
  clubProfile
}) => {

  const rootStore = useContext(RootStoreContext);
  const {
    loading,
    joiningClub,
    leavingClub,
    followClub,
    unFollowClub
  } = rootStore.clubProfileStore;
  const { isLoggedIn, user } = rootStore.userStore;
  const {openModal} = rootStore.modalStore;
  
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size='small'
                src={clubProfile.clubImage || User}
              />
              <Item.Content verticalAlign='middle'>
                <Header as='h1'>{clubProfile.displayname}</Header>
                <Item.Meta>{clubProfile.clubname}</Item.Meta>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={2}>
          <Statistic.Group widths={2}>
            <Statistic label='Followers' value={clubProfile.clubFollowersCount} />
          </Statistic.Group>

          <Divider />
          {!clubProfile.clubAdmin &&
            <Statistic.Group widths={2}>
              <Reveal animated='move'>
                <Reveal.Content visible style={{ width: '100%' }}>
                  <Button
                    fluid
                    color='teal'
                    content={clubProfile.following ? 'Following' : 'Follow'}
                  />
                </Reveal.Content>
                <Reveal.Content hidden>
                  <Button
                    loading={loading}
                    fluid
                    basic
                    color={clubProfile.following ? 'red' : 'green'}
                    content={clubProfile.following ? 'Unfollow' : 'Follow'}
                    onClick={ !user || !isLoggedIn ? () => openModal(<LoginForm/>) :
                      clubProfile.following
                        ? () => unFollowClub(clubProfile.id)
                        : () => followClub(clubProfile.id)
                    }
                  />
                </Reveal.Content>
              </Reveal>
            </Statistic.Group>
          }
        </Grid.Column>
        <Grid.Column width={2}>
          <Statistic.Group widths={2}>
            <Statistic label='Members' value={clubProfile.clubMembersCount} />
          </Statistic.Group>

          <Divider />
          {!clubProfile.clubAdmin &&
          <Statistic.Group widths={2}>
            <Reveal animated='move'>
              <Reveal.Content visible style={{ width: '100%' }}>
                <Button
                  fluid
                  color='teal'
                  content={clubProfile.member ? 'Member' : 'Join'}
                />
              </Reveal.Content>
              <Reveal.Content hidden>
                <Button
                  loading={loading}
                  fluid
                  basic
                  color={clubProfile.member ? 'red' : 'green'}
                  content={clubProfile.member ? 'Leave' : 'Join'}
                  onClick={ !user || !isLoggedIn ? () => openModal(<LoginForm/>) :
                    clubProfile.member
                      ? () => leavingClub(clubProfile.id)
                      : () => joiningClub(clubProfile.id)
                  }
                />
              </Reveal.Content>
            </Reveal>
          </Statistic.Group>}


        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(ClubProfileHeader);
