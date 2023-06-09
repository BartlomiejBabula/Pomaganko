import { createStore, applyMiddleware, compose } from "redux";
import { RootReducer } from "../reducers/RootReducer";
import thunk from "redux-thunk";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  RootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
