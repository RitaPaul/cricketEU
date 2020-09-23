import { RootStore } from "./rootStore";
import { observable, action, runInAction, reaction, computed } from "mobx";
import agent from "../api/agent";
import { toast } from "react-toastify";
import { history } from "../..";
import { v4 as uuid } from "uuid";
import { IPlayerPhoto, IPlayerProfile } from "../models/profile";
import { setClubOriginDate } from "../common/util/util";
import {
  IClubProfile,
  IClubProfiles,
  IClubApproved,
  ITeams,
  ITeamPlayer,
} from "../models/clubProfile";

export default class ClubProfileStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    reaction(
      () => this.activeTab,
      (activeTab) => {
        if (activeTab === 3 || activeTab === 4) {
          if (activeTab === 3) {
            this.loadFollowings();
          } else {
            this.loadMembers();
          }
        }
        // } else {
        //   this.clubFollowingRegistry.clear();
        //   this.clubMemberRegistry.clear();
        // }
      }
    );
  }

  @observable clubProfile: IClubProfile | null = null;
  @observable loadingClubProfile = true;
  @observable loading = false;
  @observable loadingFollowing = false;
  @observable loadingMembers = false;
  @observable uploadingPhoto = false;
  @observable activeTab: number = 0;
  @observable approvedMember: IClubApproved | null = null;
  @observable clubFollowingRegistry = new Map();
  @observable clubMemberRegistry = new Map();
  @observable clubTeamRegistry = new Map();
  @observable selectedTeam: ITeams | undefined = undefined;
  @observable isTeamEditable = false;
  @observable previousTeam: string = "No Team";

  @computed get isCurrentUserAndClub() {
    if (this.rootStore.userStore.user && this.clubProfile) {
      return (
        this.rootStore.userStore.user.username === this.clubProfile.username &&
        this.rootStore.userStore.user.club.clubname ===
          this.clubProfile.clubname
      );
    } else {
      return false;
    }
  }

  @action resetClubProfile = () => {
    this.clubTeamRegistry.clear();
    this.clubMemberRegistry.clear();
    this.clubFollowingRegistry.clear();
  };

  @computed get clubFollowings() {
    return Array.from(this.clubFollowingRegistry.values());
  }

  @computed get clubTeams() {
    return Array.from(this.clubTeamRegistry.values());
  }

  @action setSelectedTeam = async (value: any) => {
    if (value !== "Select") {
      const team = this.clubTeamRegistry.get(value);
      if (team) {
        this.selectedTeam = {
          clubId: this.clubProfile!.id,
          id: team.id,
          teamname: team.teamname,
        };
        this.isTeamEditable = true;
      }
    } else {
      this.isTeamEditable = false;
      this.selectedTeam = undefined;
    }
  };

  @action loadFollowings = async () => {
    this.loadingFollowing = true;
    try {
      const profiles = await agent.ClubFollower.listFollowers(
        this.clubProfile!.id
      );
      runInAction(() => {
        profiles.forEach((profile) => {
          this.clubFollowingRegistry.set(profile.username, profile);
        });
        this.loadingFollowing = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingFollowing = false;
      });
      toast.error("Problem loading club followings");
    }
  };

  @action approvedClubMember = async (clubId: string, playerId: string) => {
    this.loading = true;
    try {
      // const values = {
      //   clubId: id,
      //   id: userId
      // };

      // this.approvedMember = values;
      await agent.ClubPlayerApproval.approvePlayer(clubId, playerId);
      runInAction(() => {
        if (this.clubMemberRegistry.has(playerId)) {
          const values: IPlayerProfile = this.clubMemberRegistry.get(playerId);
          values.isClubMember = !values.isClubMember;
          this.clubMemberRegistry.set(playerId, values);
        }
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
        toast.error("Problem approved user");
      });
    }
  };
  @action getClubProfile = async (id: string) => {
    this.loadingClubProfile = true;
    try {
      const clubProfile = await agent.ClubProfile.get(id);
      runInAction(() => {
        if (clubProfile.clubname !== null) {
          setClubOriginDate(clubProfile);
          this.clubProfile = clubProfile;
          clubProfile.teams.map((team) => {
            return this.clubTeamRegistry.set(team.id, team);
          });
        }
        this.loadingClubProfile = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingClubProfile = false;
      });
      console.log(error);
    }
  };

  @action renderClubForm = () => {
    history.push(`/`);
  };

  @action uploadClubPhoto = async (file: Blob) => {
    this.uploadingPhoto = true;
    try {
      const photo = await agent.ClubPhoto.uploadPhoto(
        this.clubProfile!.id,
        file
      );
      runInAction(() => {
        if (this.clubProfile) {
          this.clubProfile.clubPhotos.push(photo);
          if (photo.isMain) {
            this.clubProfile.clubImage = photo.url;
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

  @action setActiveTab = (activeIndex: number) => {
    this.activeTab = activeIndex;
  };

  @action setMainPhoto = async (photo: IPlayerPhoto) => {
    this.loading = true;
    try {
      await agent.ClubPhoto.setMainPhoto(this.clubProfile!.id, photo.id);
      runInAction(() => {
        this.clubProfile!.clubPhotos.find((a) => a.isMain)!.isMain = false;
        this.clubProfile!.clubPhotos.find(
          (a) => a.id === photo.id
        )!.isMain = true;
        this.clubProfile!.clubImage = photo.url;
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
      await agent.ClubPhoto.deletePhoto(this.clubProfile!.id, photo.id);
      runInAction(() => {
        this.clubProfile!.clubPhotos = this.clubProfile!.clubPhotos!.filter(
          (a) => a.id !== photo.id
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

  @action updateClub = async (clubProfile: Partial<IClubProfile>) => {
    this.loading = true;
    try {
      await agent.ClubProfile.updateClub(clubProfile);
      runInAction(() => {
        if (
          clubProfile.clubname !== this.rootStore.userStore.user!.club!.clubname
        ) {
          this.rootStore.userStore.user!.club!.clubname = clubProfile.clubname!;
        }
        this.clubProfile = { ...this.clubProfile!, ...clubProfile };
        this.loading = false;
      });
    } catch (error) {
      toast.error("Problem updating club");
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action followClub = async (id: string) => {
    this.loading = true;
    try {
      const clubProfile = await agent.ClubFollower.follow(id);
      runInAction(() => {
        this.setClubProfile(clubProfile);
        this.loading = false;
      });
    } catch (error) {
      toast.error("Problem following user");
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action unFollowClub = async (id: string) => {
    this.loading = true;
    try {
      const clubProfile = await agent.ClubFollower.unfollow(id);
      runInAction(() => {
        this.setClubProfile(clubProfile);
        this.loading = false;
      });
    } catch (error) {
      toast.error("Problem unfollowing user");
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @computed get clubMembers() {
    return Array.from(this.clubMemberRegistry.values());
  }

  @action loadMembers = async () => {
    this.loadingMembers = true;
    try {
      const profiles = await agent.ClubProfile.listPlayers(
        this.clubProfile!.id
      );
      runInAction("loading members", () => {
        profiles.forEach((profile) => {
          this.clubMemberRegistry.set(profile.id, profile);
        });
        this.loadingMembers = false;
      });
    } catch (error) {
      toast.error("Problem loading club members");
      runInAction(() => {
        this.loadingMembers = false;
      });
    }
  };

  @action joiningClub = async (id: string) => {
    this.loading = true;
    try {
      const clubProfile = await agent.ClubPlayer.joinClub(id);
      runInAction(() => {
        this.setClubProfile(clubProfile);
        this.loading = false;
      });
    } catch (error) {
      toast.error("Problem joining club");
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  setClubProfile = (clubProfile: IClubProfiles) => {
    this.clubProfile!.member = clubProfile.member;
    this.clubProfile!.clubMembersCount = clubProfile.clubMembersCount;
    this.clubProfile!.following = clubProfile.following;
    this.clubProfile!.clubFollowersCount = clubProfile.clubFollowersCount;

    if (this.rootStore.searchStore.clubProfileRegistry.has(clubProfile.id)) {
      this.rootStore.searchStore.clubProfileRegistry.set(
        clubProfile.id,
        clubProfile
      );
    }
  };

  @action leavingClub = async (id: string) => {
    this.loading = true;
    try {
      const clubProfile = await agent.ClubPlayer.leavePlayer(id);
      runInAction(() => {
        this.setClubProfile(clubProfile);
        this.loading = false;
      });
    } catch (error) {
      toast.error("Problem deleting club membership");
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action newClubTeam = async (teamname: string) => {
    this.loading = true;
    this.isTeamEditable = false;
    this.selectedTeam = undefined;
    let duplicateTeamname = false;
    try {
      for (const value of this.clubTeamRegistry.values()) {
        if (teamname === value.teamname) {
          duplicateTeamname = true;
          break;
        }
      }
      if (!duplicateTeamname) {
        const team: ITeams = {
          teamname: teamname,
          clubId: this.clubProfile!.id,
          id: uuid(),
        };
        await agent.ClubTeam.addNewTeam(team);
        runInAction(() => {
          this.clubTeamRegistry.set(team.id, team);
          this.loading = false;
          toast.success("New team added successfully");
        });
      } else {
        this.loading = false;
        toast.error("Team name already exits");
      }
    } catch (error) {
      toast.error("Problem adding new team");
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  @action editClubTeam = async (team: ITeams) => {
    this.loading = true;
    try {
      await agent.ClubTeam.updateTeam(team);
      runInAction("editing club team", () => {
        this.clubTeamRegistry.set(team.id, team);
        this.selectedTeam = team;
        this.loading = false;
      });
    } catch (error) {
      runInAction("edit club team error", () => {
        this.loading = false;
      });
      toast.error("Problem submitting data");
    }
  };

  @action deleteClubTeam = async (team: ITeams) => {
    this.loading = true;
    try {
      await agent.ClubTeam.deleteTeam(this.clubProfile!.id, team.id);
      runInAction("delete club team", () => {
        this.clubTeamRegistry.delete(team.id);
        this.rootStore.modalStore.closeModal();
        this.isTeamEditable = false;
        this.selectedTeam = undefined;
        this.loading = false;
      });
    } catch (error) {
      runInAction("delete club team error", () => {
        this.rootStore.modalStore.closeModal();
        this.loading = false;
      });
      toast.error("Problem submitting data");
    }
  };

  @action addTeamPlayer = async (playerId: any, id: any, teamname: any) => {
    this.loading = true;
    try {
      const newTeam: ITeamPlayer = {
        playerId: playerId,
        clubId: this.clubProfile!.id,
        teamId: id,
      };
      await agent.TeamPlayer.assignTeamToPlayer(newTeam);
      runInAction("assigning team to player", () => {
        const member = this.clubMemberRegistry.get(playerId);
        member.clubMemberTeam = teamname;
        this.loading = false;
        toast.success("Changes made successfully");
      });
    } catch (error) {
      runInAction("assigning team to player error", () => {
        this.rootStore.modalStore.closeModal();
        this.loading = false;
      });
      toast.error("Problem submitting data");
    }
  };
}
