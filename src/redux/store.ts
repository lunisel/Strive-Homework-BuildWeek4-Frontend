import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
  AnyAction,
} from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { reduxStateInt } from "../usefull/interfaces";
import userReducer from "./reducers/user";
import chatsReducer from "./reducers/chats";
import { Reducer } from "react";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
  }
  interface EncryptTransformConfig {
    secretKey: string;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

export const initialState: reduxStateInt = {
  user: {
    currentUser: null,
  },
  chats: {
    newMessage: {
      status : false,
      content: "",
      _id: "",
    },
    selectedChat: null,
    rooms: [
      {
        history: [
          {
            sender: "",
            content: {
              text: "",
            },
            _id: "",
          },
        ],
        members: [
          {
            _id: "",
            name: "",
            avatar: "",
          },
        ],
        _id: "",
        updatedAt: "",
      },
    ],
  },
};

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_ENCRYPT_KEY || "random string",
    }),
  ],
};

const bigReducer = combineReducers({
  user: userReducer,
  chats: chatsReducer,
}) as Reducer<any, AnyAction>;

const persistedReducer = persistReducer(persistConfig, bigReducer);

export const configureStore = createStore(
  persistedReducer,
  initialState,
  process.env.REACT_APP_DEVELOPMENT
    ? composeEnhancers(applyMiddleware(thunk))
    : compose(applyMiddleware(thunk))
);

export const persistor = persistStore(configureStore);
