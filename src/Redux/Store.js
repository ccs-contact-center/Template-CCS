import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import postReducer from "./Reducers/postReducer";
import userReducer from "./Reducers/userReducer";
import uiReducer from "./Reducers/uiReducer";
// eslint-disable-next-line
import { isLocalhost } from "../config";
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  root: postReducer,
  user: userReducer,
  ui: uiReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = isLocalhost
  ? createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)))
  : createStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);
