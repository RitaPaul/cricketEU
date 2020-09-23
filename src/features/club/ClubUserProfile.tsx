import React, { useContext } from 'react';
import { Image, Table, Checkbox, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IPlayerProfile } from '../../app/models/profile';
import { RootStoreContext } from '../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import TeamChange from './TeamChange';
import User from '../../../src/assets/images/user.png';

interface IProps {
    profile: IPlayerProfile,
    clubId: string
}

const ClubUserProfile: React.FC<IProps> = ({ profile, clubId }) => {
    const rootStore = useContext(RootStoreContext);
    const { approvedClubMember } = rootStore.clubProfileStore;
    const { openModal } = rootStore.modalStore;
    return (
        <Table.Row>
            <Table.Cell collapsing>
                <Checkbox toggle
                    checked={profile.isClubMember}
                    onClick={() => approvedClubMember(clubId, profile.id)} />
            </Table.Cell>
            <Table.Cell>
                <Image src={profile.image || User}
                    avatar as={Link} to={`/playerprofile/${profile.username}`} />
            </Table.Cell>
            <Table.Cell>{profile.username.toUpperCase()}</Table.Cell>
            <Table.Cell>{profile.joinAs}</Table.Cell>
            <Table.Cell>
                {profile.clubMemberTeam || 'No team'}
                <Button icon='plus'
                    onClick={() => openModal(
                        <TeamChange currentTeam={profile.clubMemberTeam || 'No Team'} userId={profile.id} clubId={clubId} />)}
                    positive size='mini' floated='right' />
            </Table.Cell>
        </Table.Row>
    );
};

export default observer(ClubUserProfile);
