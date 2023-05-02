import { UserType, UserGeoLocationType } from "../reducers/types";
export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
export const USER_UPDATE_PROFILE = "USER_UPDATE_PROFILE";
export const USER_UPDATE_GEOLOCATION = "USER_UPDATE_GEOLOCATION";

export const logInAction = (payload: UserType) => ({
  type: USER_LOGGED_IN,
  payload,
});

export const logOutAction = () => ({
  type: USER_LOGGED_OUT,
});

export const updateProfileAction = (payload: UserType) => ({
  type: USER_UPDATE_PROFILE,
  payload,
});

export const updateProfileGeoLocationAction = (
  payload: UserGeoLocationType
) => ({
  type: USER_UPDATE_GEOLOCATION,
  payload,
});
