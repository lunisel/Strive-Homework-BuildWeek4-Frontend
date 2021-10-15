import { PayloadAction } from "@reduxjs/toolkit";
import { roomsInt } from "../../usefull/interfaces";
import { initialState } from "../store";

const chatsReducer = (state = initialState.chats, action: PayloadAction<roomsInt | null | roomsInt[]>) => {
  switch (action.type) {
    case "ADD_CHAT_HISTORY":
      return {
        ...state,
        rooms: action.payload,
      };
    case "ADD_SELECTED_CHAT":
      return {
        ...state,
        selectedChat: action.payload,
      }
    case "DISCONNECT_CHATS":
      return {
        ...state,
        selectedChat: null,
        rooms: null
      }
    default:
      return state;
  }
};

export default chatsReducer;
