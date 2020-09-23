import ActivityStore from './activityStore';
import UserStore from './userStore';
import { createContext } from 'react';
import { configure } from 'mobx';
import CommonStore from './commonStore';
import ModalStore from './modalStore';
import ProfileStore from './profileStore';
import ClubStore from './clubStore';
import ClubProfileStore from './clubProfileStore';
import SearchStore from './searchStore';

configure({enforceActions: 'always'});

export class RootStore {
    activityStore: ActivityStore;
    userStore: UserStore;
    commonStore: CommonStore;
    modalStore: ModalStore;
    profileStore: ProfileStore;
    clubStore: ClubStore;
    clubProfileStore: ClubProfileStore;
    searchStore: SearchStore; 

    constructor() {
        this.activityStore = new ActivityStore(this);
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
        this.modalStore = new ModalStore(this);
        this.profileStore = new ProfileStore(this);
        this.clubStore = new ClubStore(this);
        this.clubProfileStore = new ClubProfileStore(this);
        this.searchStore = new SearchStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());