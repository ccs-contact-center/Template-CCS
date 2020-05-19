import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import postReducer from "./Reducers/postReducer";
import userReducer from "./Reducers/userReducer";
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  root: postReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
