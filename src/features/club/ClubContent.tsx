import React, { useContext } from 'react';
import { Tab } from 'semantic-ui-react';
import ClubPhotos from './ClubPhotos';
import ClubDescription from './ClubDescription';
import ClubFollowings from './ClubFollowings';
import ClubMembers from './ClubMembers';
import ClubTeams from './ClubTeams';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../app/stores/rootStore';

const panes = [
  { menuItem: 'About', render: () => <ClubDescription/> },
  { menuItem: 'Photos', render: () => <ClubPhotos/> },
  { menuItem: 'Teams', render: () => <ClubTeams/> },
  { menuItem: 'Followers', render: () => <ClubFollowings/> },
  { menuItem: 'Members', render: () => <ClubMembers/> }
];

interface IProps {
    setActiveTab: (activeIndex: any) => void;
}

const ClubContent: React.FC<IProps> = ({setActiveTab}) => { 
  const rootStore = useContext(RootStoreContext);
  const {
    activeTab
  } = rootStore.clubProfileStore;
   
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition='right'
      panes={panes} 
      activeIndex={activeTab}     
      onTabChange={(e, data) => setActiveTab(data.activeIndex)}
    />
  );
};

export default observer(ClubContent);
