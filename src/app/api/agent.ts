import axios, { AxiosResponse } from "axios";
import { IActivity, IActivitiesEnvelope } from "../models/activity";
import { history } from "../..";
import { toast } from "react-toastify";
import { IUser, IUserFormValues } from "../models/user";
import { IPlayerPhoto, IPlayerProfile } from "../models/profile";
import { IClubFormValues, IClubToReturn } from "../models/club";
import {
  IClubProfile,
  IClubProfileEnvelope,
  IClubProfiles,
  ITeams,
  ITeamPlayer,
} from "../models/clubProfile";
import { ICompitition, ICompititionFormValues } from "../models/compitition";
import {
  ICompititor,
  ICompititorFormValues,
  IUpdatedCompititorFormValues,
} from "../models/compititor";
// import { clubType } from "../common/options/categoryOptions";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  const orignalRequest = error.config;

  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error - make sure API is running!");
  }
  const { status, data, config } = error.response;

  if (status === 404) {
    history.push("/notfound");
  }
 
  if (status === 401 && orignalRequest.url.endWith('refresh')) {
    console.log('clean')
    window.localStorage.removeItem("jwt");
    window.localStorage.removeItem("refreshToken");
    history.push("/");
    toast.info("Your session has expired, please login again");
    return Promise.reject(error);
  }

  if (status === 401 && orignalRequest._retry === undefined)  {
    console.log('cla to refresh')
    orignalRequest._retry = true;
    return axios
      .post('user/refresh', {
        'token': window.localStorage.getItem('jwt'),
        'refreshToken': window.localStorage.getItem("refreshToken"),
      })
      .then((res) => {
        window.localStorage.setItem('jwt', res.data.token);
        window.localStorage.setItem('refreshToken', res.data.refreshToken);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;
        return axios(orignalRequest);
      });
  }

  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  }
  if (status === 500) {
    toast.error("Server error - check the terminal for more info!");
  }
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

// const sleep = (ms: number) => (response: AxiosResponse) =>
//     new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

// const requests = {
//   get: (url: string) => axios.get(url).then(sleep(2000)).then(responseBody),
//   post: (url: string, body: {}) => axios.post(url, body).then(sleep(2000)).then(responseBody),
//   put: (url: string, body: {}) => axios.put(url, body).then(sleep(2000)).then(responseBody),
//   del: (url: string) => axios.delete(url).then(sleep(2000)).then(responseBody),
//   postForm: async (url: string, file: Blob) => {
//     let formData = new FormData();
//     formData.append("File", file);
//     const response = await axios
//       .post(url, formData, {
//         headers: { "Content-type": "multipart/form-data" }
//       });
//     return responseBody(response);
//   }
// };

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
  postForm: async (url: string, file: Blob) => {
    let formData = new FormData();
    formData.append("File", file);
    const response = await axios.post(url, formData, {
      headers: { "Content-type": "multipart/form-data" },
    });
    return responseBody(response);
  },
};

const Activities = {
  list: (params: URLSearchParams): Promise<IActivitiesEnvelope> =>
    axios.get("/activities", { params: params }).then(responseBody),
  details: (id: string) => requests.get(`/activities/${id}`),
  create: (activity: IActivity) => requests.post("/activities", activity),
  update: (activity: IActivity) =>
    requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del(`/activities/${id}`),
  attend: (id: string) => requests.post(`/activities/${id}/attend`, {}),
  unattend: (id: string) => requests.del(`/activities/${id}/attend`),
};

const User = {
  current: (): Promise<IUser> => requests.get("/user"),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/login`, user),
  register: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/register`, user),
  fbLogin: (accessToken: string) =>
    requests.post(`/user/facebook`, { accessToken }),
};

const PlayerProfiles = {
  get: (username: string): Promise<IPlayerProfile> =>
    requests.get(`/playerprofiles/${username}`),
  updateProfile: (playerProfile: Partial<IPlayerProfile>) =>
    requests.put(`/playerProfiles`, playerProfile),
  listPlayerActivities: (username: string, predicate: string) =>
    requests.get(
      `/playerProfiles/${username}/activities?predicate=${predicate}`
    ),
};

const PlayerPhotos = {
  uploadPhoto: (photo: Blob): Promise<IPlayerPhoto> =>
    requests.postForm(`/playerPhotos/add`, photo),
  setMainPhoto: (photoId: string) =>
    requests.post(`/playerPhotos/${photoId}/setMain`, {}),
  deletePhoto: (photoId: string) => requests.del(`/playerPhotos/${photoId}/delete`),
};

const PlayerFollowers = {
  follow: (username: string) =>
    requests.post(`/playerFollowers/${username}/follow`, {}),
  unfollow: (username: string) =>
    requests.del(`/playerFollowers/${username}/follow`),
  listFollowings: (username: string, predicate: string) =>
    requests.get(`/playerFollowers/${username}/follow?predicate=${predicate}`),
};

const Club = {
  currentClub: (): Promise<IClubToReturn> => requests.get("/club"),
  register: (club: IClubFormValues): Promise<IClubToReturn> =>
    requests.post(`/club`, club),
};

const ClubProfile = {
  get: (clubId: string): Promise<IClubProfile> =>
    requests.get(`/clubsprofile/${clubId}`),
  listPlayers: (id: string): Promise<IPlayerProfile[]> =>
    requests.get(`/clubplayer/${id}/players`),
  updateClub: (clubProfile: Partial<IClubProfile>) =>
    requests.put(`/clubsprofile/${clubProfile.id}`, clubProfile),
};

const ClubTeam = {
  addNewTeam: (team: ITeams) =>
    requests.post(`/teams/${team.clubId}/create`, team),
  updateTeam: (team: ITeams) =>
    requests.put(`/teams/${team.clubId}/editTeam`, team),
  deleteTeam: (clubId: string, teamid: string) =>
    requests.del(`teams/${clubId}/club/${teamid}/delete`),
  addTeamPlayer: (clubId: string, teamId: string, playerId: string) =>
    requests.post(`teams/${clubId}/club/${teamId}/team/${playerId}/add`, {}),
};

const TeamPlayer = {
  assignTeamToPlayer: (team: ITeamPlayer) =>
    requests.put(`/teamPlayer/${team.clubId}/add`, team),
};

const ClubPlayer = {
  joinClub: (clubId: string): Promise<IClubProfiles> =>
    requests.post(`/clubplayer/${clubId}/join`, {}),
  leavePlayer: (clubId: string): Promise<IClubProfiles> =>
    requests.del(`/clubplayer/${clubId}/leave`),
};

const ClubPlayerApproval = {
  releasePlayer: (clubId: string, playerId: string) =>
    requests.del(`clubPlayerApproval/${clubId}/club/${playerId}/release`),
  approvePlayer: (clubId: string, playerId: string) =>
    requests.put(`clubPlayerApproval/${clubId}/club/${playerId}/approve`, {}),
};

const ClubPhoto = {
  uploadPhoto: (clubId: string, photo: Blob): Promise<IPlayerPhoto> =>
    requests.postForm(`/clubphotos/${clubId}/add`, photo),
  setMainPhoto: (id: string, photoId: string) => requests.post(`/clubphotos/${id}/club/${photoId}/setMain`, {}),
  deletePhoto: (id: string, photoId: string) => requests.del(`/clubphotos/${id}/club/${photoId}/delete`),
};

const ClubFollower = {
  follow: (id: string): Promise<IClubProfiles> =>
    requests.post(`/clubfollower/${id}/follow`, {}),
  unfollow: (id: string): Promise<IClubProfiles> =>
    requests.del(`/clubfollower/${id}/unfollow`),
  listFollowers: (id: string): Promise<IPlayerProfile[]> =>
    requests.get(`/clubfollower/${id}/follower`),
};

const Compitition = {
  createCompitition: (
    compitition: ICompititionFormValues
  ): Promise<ICompitition> => requests.post(`/compitition/create`, compitition),
  deleteCompitition: (compititionId: string) =>
    requests.del(`compitition/${compititionId}/delete`),
  editCompitition: (compitition: ICompitition) =>
    requests.put(`compitition/${compitition.compititionId}/edit`, compitition),
  startCompitition: (compititionId: string) =>
    requests.put(`compitition/${compititionId}/start`, {}),
};

const Compititor = {
  createCompititor: (compititor: ICompititorFormValues): Promise<ICompititor> =>
    requests.post(`/compititor/create`, compititor),
  deleteCompititor: (compititionId: string) =>
    requests.del(`compititor/${compititionId}/delete`),
  editCompititor: (
    updatedCompititor: IUpdatedCompititorFormValues
  ): Promise<ICompititor> =>
    requests.put(
      `compititor/${updatedCompititor.CompititionId}/edit`,
      updatedCompititor
    ),
};

const Searching = {
  list: (params: URLSearchParams): Promise<IClubProfileEnvelope> =>
    axios.get("/clubsprofile", { params: params }).then(responseBody),
};

export default {
  Activities,
  User,
  PlayerProfiles,
  PlayerFollowers,
  Club,
  ClubProfile,
  ClubTeam,
  ClubFollower,
  ClubPhoto,
  ClubPlayer,
  Searching,
  PlayerPhotos,
  ClubPlayerApproval,
  TeamPlayer,
  Compitition,
  Compititor,
};
