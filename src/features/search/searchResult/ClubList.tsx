import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import Club from './Club';
import css from './Club.module.css';

const Clublist: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const {
        searchedClubs
    } = rootStore.searchStore;

    return (
        <div className={css.result_container}>
            {searchedClubs.map((clubs) => (
                <Club key={clubs.id} clubProfile={clubs} />
            ))}
        </div>
    )
};

export default observer(Clublist);
