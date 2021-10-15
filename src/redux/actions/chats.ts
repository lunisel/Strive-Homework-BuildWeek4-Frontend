import { roomsInt, newMessageInt } from "../../usefull/interfaces";

export const addChatHistory = (room: roomsInt) => ({
  type: "ADD_CHAT_HISTORY",
  payload: room,
});

export const addSelectedChat = (chat: roomsInt) => ({
  type: "ADD_SELECTED_CHAT",
  payload: chat,
});

export const disconectChats = () => ({ 
  type: "DISCONNECT_CHATS",
});

export const changeNewMessage = (message: newMessageInt) => ({
  type: "CHANGE_NEW_MESSAGE",
  payload: message, 
});
