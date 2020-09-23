import {RootStore} from './rootStore';
import { observable, action, reaction, computed } from 'mobx';

export default class CommonStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token);
                } else {
                    window.localStorage.removeItem('jwt')
                }
            }
        )

        reaction(
            () => this.refreshToken,
            token => {
                if (token) {
                    window.localStorage.setItem('refreshToken', token);
                } else {
                    window.localStorage.removeItem('refreshToken')
                }
            }
        )
    }

    @observable token: string | null = window.localStorage.getItem('jwt');
    @observable refreshToken: string | null = window.localStorage.getItem('refreshToken');
    @observable appLoaded = false;
    @observable isOther = false;
    @observable isMatch = false;
    
    @computed get currentClubName() {
        return process.env.REACT_APP_CLUB_NAME;
      }

    @action setToken = (token: string | null) => {
        this.token = token;
    }

    @action setRefreshToken = (refreshToken: string | null) => {
        this.refreshToken = refreshToken;
    }

    @action setAppLoaded = () => {
        this.appLoaded = true;
    }

    @action isOtherHandler = async (value: boolean) => {
        try {
            this.isOther = value;
        } catch (error) {
            throw error;
        }
    }
    @action isMatchHandler = async (value: boolean) => {
        try {
            this.isMatch = value;
        } catch (error) {
            throw error;
        }
    }
}