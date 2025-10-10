import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import {
  appReduser,
  userReduser,
  usersReduser,
  productReduser,
  productsReduser,
} from "./redusers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  app: appReduser,
  user: userReduser,
  users: usersReduser,
  product: productReduser,
  products: productsReduser,
});

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);
