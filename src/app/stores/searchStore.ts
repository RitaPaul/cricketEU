import { observable, action, computed, runInAction, reaction } from "mobx";
import { IClubProfiles } from "../models/clubProfile";
import agent from "../api/agent";
import { toast } from "react-toastify";
import { RootStore } from "./rootStore";

// configure({enforceActions: 'always'});

const LIMIT = 2;

export default class ActivityStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    reaction(
      () => this.predicate.keys(),
      () => {
        this.page = 0;
        this.clubProfileRegistry.clear();
        this.loadClubs();
      }
    );
  }

  @observable clubProfileRegistry = new Map();
  @observable clubProfiles: IClubProfiles[] = [];
  @observable clubProfile: IClubProfiles | null = null;
  @observable loadingInit = false;
  @observable submitting = false;
  @observable target = "";
  @observable loading = false;
  @observable clubCount = 0;
  @observable page = 0;
  @observable predicate = new Map();
  @observable paramStr = "";

  // selected id is require to identify unique button to display loading
  @observable selectedClubForAction = new Set();

  @action resetSearch = () => {
    this.clubProfileRegistry.clear();
    this.predicate.clear();
    this.clubCount = 0;
    this.page = 0;
    this.loadingInit = false;
  };

  @action setSearchParams = (searchParams: any) => {
    this.predicate.clear();
    this.paramStr = "";
    for (var param in searchParams) {
      if (searchParams.hasOwnProperty(param)) {
        this.predicate.set(param, searchParams[param]);
        if (param === "query" && searchParams[param] !== "") {
          this.paramStr = this.paramStr + `/search/${searchParams[param]}`;
        }
        if (param === "predicate" && searchParams[param] !== "") {
          this.paramStr = this.paramStr + `/predicate/${searchParams[param]}`;
        }
      }
    }
  };

  @computed get axiosParams() {
    const params = new URLSearchParams();

    this.predicate.forEach((value, key) => {
      params.append(key, value);
    });

    params.append("limit", String(LIMIT));
    params.append("offset", `${this.page ? this.page * LIMIT : 0}`);
    return params;
  }

  @computed get totalPages() {
    return Math.ceil(this.clubCount / LIMIT);
  }

  @action setPage = (page: number) => {
    this.page = page;
  };

  @computed get searchedClubs() {
    return Array.from(this.clubProfileRegistry.values());
  }

  // following three method and actions are used to make every button unique on club page to show loading indicator
  setId = (pre: string, id: string) => {
    this.selectedClubForAction.add(pre.concat("_", id));
  };

  @action getId = (pre: string, id: string) => {
    return this.selectedClubForAction.has(pre.concat("_", id));
  };
  deleteId = (pre: string, id: string) => {
    this.selectedClubForAction.delete(pre.concat("_", id));
  };

  @action loadClubs = async () => {
    this.loadingInit = true;
    try {
      const clubsEnvelope = await agent.Searching.list(this.axiosParams);
      const { clubProfiles, clubCount } = clubsEnvelope;
      runInAction("loading clubs", () => {
        clubProfiles.forEach((clubProfile) => {
          this.clubProfileRegistry.set(clubProfile.id, clubProfile);
        });
        this.clubCount = clubCount;
        this.loadingInit = false;
      });
    } catch (error) {
      runInAction("load clubs error", () => {
        this.loadingInit = false;
      });
    }
  };

  @action newClubMember = async (id: string) => {
    this.loading = true;
    try {
      this.setId("new", id);
      const clubProfile = await agent.ClubPlayer.joinClub(id);
      runInAction(() => {
        this.clubProfileRegistry.set(clubProfile.id, clubProfile);
        this.deleteId("new", id);
        this.loading = false;
      });
    } catch (error) {
      toast.error("Problem joining club");
      runInAction(() => {
        this.deleteId("new", id);
        this.loading = false;
      });
    }
  };

  @action deleteClubMember = async (id: string) => {
    this.loading = true;
    try {
      this.setId("delete", id);
      const clubProfile = await agent.ClubPlayer.leavePlayer(id);
      runInAction(() => {
        this.clubProfileRegistry.set(clubProfile.id, clubProfile);
        this.deleteId("delete", id);
        this.loading = false;
      });
    } catch (error) {
      toast.error("Problem deleting club membership");
      runInAction(() => {
        this.deleteId("delete", id);
        this.loading = false;
      });
    }
  };

  @action followClub = async (id: string) => {
    this.loading = true;
    try {
      this.setId("follow", id);
      const clubProfile = await agent.ClubFollower.follow(id);
      runInAction(() => {
        this.clubProfileRegistry.set(clubProfile.id, clubProfile);
        this.deleteId("follow", id);
        this.loading = false;
      });
    } catch (error) {
      toast.error("Problem follow club");
      runInAction(() => {
        this.deleteId("follow", id);
        this.loading = false;
      });
    }
  };

  @action unFollowClub = async (id: string) => {
    this.loading = true;
    try {
      this.setId("unfollow", id);
      const clubProfile = await agent.ClubFollower.unfollow(id);
      runInAction(() => {
        this.clubProfileRegistry.set(clubProfile.id, clubProfile);
        this.deleteId("unfollow", id);
        this.loading = false;
      });
    } catch (error) {
      toast.error("Problem unfollow club");
      runInAction(() => {
        this.deleteId("unfollow", id);
        this.loading = false;
      });
    }
  };
}
