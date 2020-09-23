import { observable, computed, action, runInAction } from "mobx";
import { IUser, IUserFormValues } from "../models/user";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
import { history } from "../..";

export default class UserStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable user: IUser | null = null;
  @observable initUser: IUserFormValues | null = null;
  @observable loading = false;
  @observable hasClub = false;
  @observable logouting = false;
  // @observable initUserForm = false;

  @computed get isLoggedIn() {
    return !!this.user;
  }

  // @action initializeLoginForm = async () => {
  //   this.initUserForm = false;
  //   try {
  //     const currentClubName = this.rootStore.commonStore.currentClubName!;
  //     runInAction(() => {
  //       this.initUser = { ...this.initUser!, currentClubName };
  //       this.initUserForm = true;
  //     });
  //   } catch (error) {
  //     runInAction(() => {
  //       this.initUserForm = false;
  //     });
  //     throw error;
  //   }
  // };

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);
      runInAction(() => {
        this.user = user;
        this.rootStore.searchStore.resetSearch();
        this.rootStore.commonStore.setToken(user.token);
        this.rootStore.commonStore.setRefreshToken(user.refreshToken);
        this.rootStore.modalStore.closeModal();
      });
      history.push("/");
    } catch (error) {
      throw error;
    }
  };

  @action register = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.register(values);
      runInAction(() => {
        this.user = user;
      });
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.commonStore.setRefreshToken(user.refreshToken);
      this.rootStore.modalStore.closeModal();
      history.push("/");
    } catch (error) {
      throw error;
    }
  };

  @action getUser = async () => {
    this.loading = true;
    try {
      const user = await agent.User.current();
      runInAction(() => {
        this.user = user;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error);
    }
  };

  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.rootStore.commonStore.setRefreshToken(null);
    this.user = null;
    this.rootStore.clubStore.club = null;
    this.rootStore.searchStore.resetSearch();
    this.rootStore.clubProfileStore.resetClubProfile();
    history.push("/");
  };

  @action fbLogin = async (response: any) => {
    this.loading = true;
    try {
      const user = await agent.User.fbLogin(response.accessToken);
      runInAction(() => {
        this.user = user;
        this.rootStore.searchStore.resetSearch();
        this.rootStore.commonStore.setToken(user.token);
        this.rootStore.commonStore.setRefreshToken(user.refreshToken);
        this.rootStore.modalStore.closeModal();
        this.loading = false;
      });
      history.push("/");
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      throw error;
    }
  };
}
