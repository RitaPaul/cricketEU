import React from 'react';
import { Card, Image, Icon} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IPlayerProfile } from '../../app/models/profile';
import UserPng from '../../../src/assets/images/user.png';

interface IProps {
    profile: IPlayerProfile
}

const ProfileCard: React.FC<IProps> = ({profile}) => {
  return (
    <Card as={Link} to={`/playerprofile/${profile.username}`}>
      <Image src={profile.image || UserPng} />
      <Card.Content>
        <Card.Header>{profile.displayName}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <div>
          <Icon name='user' />
          {profile.followersCount} Followers
        </div>
      </Card.Content>
    </Card>
  );
};

export default ProfileCard;
