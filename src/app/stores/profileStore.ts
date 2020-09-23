import { RootStore } from "./rootStore";
import { observable, action, runInAction, computed, reaction } from "mobx";
import { IPlayerProfile, IPlayerPhoto, IUserActivity } from "../models/profile";
import agent from "../api/agent";
import { toast } from "react-toastify";
import { setUserProfileJoinDate } from "../common/util/util";

export default class ProfileStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    reaction(
      () => this.activeTab,
      activeTab => {
        if (activeTab === 3 || activeTab === 4) {
          const predicate = activeTab === 3 ? "followers" : "following";
          this.loadFollowings(predicate);
        } else {
          this.followings = [];
        }
      }
    );
  }

  @observable profile: IPlayerProfile | null = null;
  @observable loadingProfile = true;
  @observable uploadingPhoto = false;
  @observable loading = false;
  @observable followings: IPlayerProfile[] = [];
  @observable activeTab: number = 0;
  @observable userActivities: IUserActivity[] = [];
  @observable loadingActivities = false;

  @computed get isCurrentUser() {
    if (this.rootStore.userStore.user && this.profile) {
      return this.rootStore.userStore.user.username === this.profile.username;
    } else {
      return false;
    }
  }

  @action loadUserActivities = async (username: string, predicate?: string) => {
    this.loadingActivities = true;
    try {
      const activities = await agent.PlayerProfiles.listPlayerActivities(
        username,
        predicate!
      );
      runInAction(() => {
        this.userActivities = activities;
        this.loadingActivities = false;
      });
    } catch (error) {
      toast.error("Problem loading activities");
      runInAction(() => {
        this.loadingActivities = false;
      });
    }
  };

  @action setActiveTab = (activeIndex: number) => {
    this.activeTab = activeIndex;
  };

  @action loadProfile = async (username: string) => {
    this.loadingProfile = true;
    this.followings = [];
    try {
      const profile = await agent.PlayerProfiles.get(username);
       runInAction(() => {
        setUserProfileJoinDate(profile);
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingProfile = false;
      });
      console.log(error);
    }
  };

  @action uploadPhoto = async (file: Blob) => {
    this.uploadingPhoto = true;
    try {
      const photo = await agent.PlayerPhotos.uploadPhoto(file);
      runInAction(() => {
        if (this.profile) {
          this.profile.playerPhotos.push(photo);
          if (photo.isMain && this.rootStore.userStore.user) {
            this.rootStore.userStore.user.image = photo.url;
            this.profile.image = photo.url;
          }
        }
        this.uploadingPhoto = false;
      });
    } catch (error) {
      toast.error("Problem uploading photo");
      runInAction(() => {
        this.uploadingPhoto = false;
      });
    }
  };

  @action setMainPhoto = async (photo: IPlayerPhoto) => {
    this.loading = true;
    try {
      await agent.PlayerPhotos.setMainPhoto(photo.id);
      runInAction(() => {
        this.rootStore.userStore.user!.image = photo.url;
        this.profile!.playerPhotos.find(a => a.isMain)!.isMain = false;
        this.profile!.playerPhotos.find(a => a.id === photo.id)!.isMain = true;
        this.profile!.image = photo.url;
        this.loading = false;
      });
    } catch (error) {
      toast.error("Problem setting photo as main");
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action deletePhoto = async (photo: IPlayerPhoto) => {
    this.loading = true;
    try {
      await agent.PlayerPhotos.deletePhoto(photo.id);
      runInAction(() => {
        this.profile!.playerPhotos = this.profile!.playerPhotos.filter(
          a => a.id !== photo.id
        );
        this.loading = false;
      });
    } catch (error) {
      toast.error("Problem deleting the photo");
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action updateProfile = async (profile: Partial<IPlayerProfile>) => {
    this.loading = true;
    try {
      await agent.PlayerProfiles.updateProfile(profile);
      runInAction(() => {
        if (
          profile.displayName !== this.rootStore.userStore.user!.displayName
        ) {
          this.rootStore.userStore.user!.displayName = profile.displayName!;
        }
        this.profile = { ...this.profile!, ...profile };
        this.loading = false;
      });
    } catch (error) {
      toast.error("Problem updating profile");
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  resetFollowers = () => {
    if (this.activeTab === 3 || this.activeTab === 4) {
      const predicate = this.activeTab === 3 ? "followers" : "following";
      this.loadFollowings(predicate);
    }
  }

  @action follow = async (username: string) => {
    this.loading = true;
    try {
      await agent.PlayerFollowers.follow(username);
      runInAction(() => {
        this.profile!.following = true;
        this.profile!.followersCount++;
        // if(this.rootStore.clubProfileStore.clubFollowingRegistry.has(username)) {
        //   const updateClubFollowing: IProfile = this.rootStore.clubProfileStore.clubFollowingRegistry.get(username);
        //   updateClubFollowing.followersCount++;
        //   this.rootStore.clubProfileStore.clubFollowingRegistry.set(username, updateClubFollowing);
        // }
        this.resetFollowers();
        this.loading = false;
      });
    } catch (error) {
      toast.error("Problem following user");
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action unfollow = async (username: string) => {
    this.loading = true;
    try {
      await agent.PlayerFollowers.unfollow(username);
      runInAction(() => {
        this.profile!.following = false;
        this.profile!.followersCount--;
        // update club following, because 
        // if(this.rootStore.clubProfileStore.clubFollowingRegistry.has(username)) {
        //   const updateClubFollowing: IProfile = this.rootStore.clubProfileStore.clubFollowingRegistry.get(username);
        //   updateClubFollowing.followersCount--;
        //   this.rootStore.clubProfileStore.clubFollowingRegistry.set(username, updateClubFollowing);
        // }
        this.resetFollowers(); 
        this.loading = false;
      });
    } catch (error) {
      toast.error("Problem unfollowing user");
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action loadFollowings = async (predicate: string) => {
    this.loading = true;
    try {
      const profiles = await agent.PlayerFollowers.listFollowings(
        this.profile!.username, predicate
      );
      runInAction(() => {
        this.followings = profiles;
        this.loading = false;
      });
    } catch (error) {
      toast.error("Problem loading followings");
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
