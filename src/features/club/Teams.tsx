import React, { useContext } from 'react';
import { RootStoreContext } from '../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';

const Teams = () => {
    const rootStore = useContext(RootStoreContext);
    const {
        clubTeams,
        setSelectedTeam,
        selectedTeam
    } = rootStore.clubProfileStore;
    
    return (
        <select value={selectedTeam !== undefined ? selectedTeam.id : 'select'}
            onChange={(e: React.SyntheticEvent<HTMLSelectElement>) => setSelectedTeam(e.currentTarget.value)}>
            <option value='Select' key='select'>Select team</option>
            {clubTeams.map(team => {
                return (<option value={team.id} key={team.id}>{team.teamname}</option>)
            })}
        </select>
    );
};

export default observer(Teams);
