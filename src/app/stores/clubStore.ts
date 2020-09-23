import { RootStore } from "./rootStore";
import { observable, action, runInAction, reaction } from "mobx";
import { IClubFormValues, IClubToReturn } from "../models/club";
import agent from "../api/agent";
import { history } from "../..";
export default class ClubStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    reaction(
      () => this.activeTab,
      activeTab => {
        if (activeTab === 3 || activeTab === 4) {
          // const predicate = activeTab === 3 ? "followers" : "following";
          // this.loadFollowings(predicate)
        } else {
          // this.followings = [];
        }
      }
    );
  }

  @observable club: IClubToReturn | null = null;
  @observable loadingClub = true;
  @observable loading = false;
  @observable uploadingPhoto = false;
  @observable activeTab: number = 0;
  
  @action getClub = async () => {
    this.loadingClub = true;
    try {
      const club = await agent.Club.currentClub();
      runInAction(() => {
        if (club.clubname !== null) {
          this.club = club;
        } 
        this.loadingClub = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingClub = false;
      });
      console.log(error);
    }
  };

  @action renderClubForm = () => {
    history.push('/newclub/register')
  }

  @action registerClub = async (values: IClubFormValues) => {
    this.loading = true;
    try {
      const club = await agent.Club.register(values);
      runInAction(() => {
        if (club.clubname !== null) {
          this.club = club;
          this.rootStore.userStore.getUser();
          history.push(`/user/${this.rootStore.userStore.user!.username}/${club.clubname}`);
        }
      });
      this.loading = false;
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      throw error;
    }
  };
}