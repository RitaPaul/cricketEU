import React, { useContext, useState, useEffect } from 'react';
import { RootStoreContext } from '../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import { Button } from 'semantic-ui-react';

interface IProps {
    currentTeam: string;
    userId: string;
    clubId: string
}

const TeamChange: React.FC<IProps> = ({ currentTeam, userId, clubId }) => {

    const rootStore = useContext(RootStoreContext);
    const {
        clubTeams,
        addTeamPlayer
    } = rootStore.clubProfileStore;

    const [team, setTeam] = useState({ teamname: '', id: '' });

    useEffect(() => {
        const selectedTeam = clubTeams.filter(t => t.teamname === currentTeam)[0];
        if (selectedTeam) {
            const { id, teamname } = selectedTeam;
            if (id && teamname) {
                setTeam({ teamname, id });
            } else {
                setTeam({ teamname: '', id: '' });
            }
        }

    }, [clubTeams, setTeam, currentTeam])

    const changeHandler = (v: any) => {
        const selectedTeam = clubTeams.filter(t => t.id === v)[0];
        if (selectedTeam) {
            const { id, teamname } = selectedTeam;
            setTeam({ teamname, id });
        } else {
            setTeam({ teamname: '', id: '' });
        }
    }
    return (
        <div>
            <select value={team.id || 'Select'}
                onChange={(e: React.SyntheticEvent<HTMLSelectElement>) => changeHandler(e.currentTarget.value)}>
                <option value='Select' key='select'>Select team</option>
                {clubTeams.map(team => {
                    return (<option value={team.id} key={team.id}>{team.teamname}</option>)
                })}
            </select>
            <Button positive onClick={() => addTeamPlayer(userId, team.id, team.teamname)} content='Save' />
        </div>

    );
};

export default observer(TeamChange);
