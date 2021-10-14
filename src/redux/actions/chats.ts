import {roomsInt} from "../../usefull/interfaces"

export const addChatHistory = (room : roomsInt) => ({
    type: 'ADD_CHAT_HISTORY',
    payload: room,
  })

  export const addSelectedChat = (chat:roomsInt)=>({
      type: "ADD_SELECTED_CHAT",
      payload: chat
  })

  export const disconectChats = () => ({
      type: "DISCONNECT_CHATS"
  })