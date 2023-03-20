import { combineReducers } from "redux";
import { userReducer } from "./UserReducer";
import { locationReducer } from "./LocationReducer";

export const RootReducer = combineReducers({
  user: userReducer,
  location: locationReducer,
});
