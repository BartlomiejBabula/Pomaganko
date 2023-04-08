import { USER_LOGGED_IN } from "../actions/UserAction";
import { USER_LOGGED_OUT } from "../actions/UserAction";
import { USER_UPDATE_PROFILE } from "../actions/UserAction";

const initState = {
  isLogged: false,
};

export const userReducer = (state = initState, action: any) => {
  switch (action.type) {
    case USER_LOGGED_IN: {
      return { ...state, ...action.payload };
    }
    case USER_LOGGED_OUT: {
      return { isLogged: false };
    }
    case USER_UPDATE_PROFILE: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};
