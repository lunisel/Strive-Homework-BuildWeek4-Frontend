import {roomsInt} from "../../usefull/interfaces"

export const addChatHistory = (room : roomsInt) => ({
    type: 'ADD_CHAT_HISTORY',
    payload: room,
  })