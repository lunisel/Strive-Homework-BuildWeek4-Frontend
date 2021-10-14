import {roomsInt} from "../../usefull/interfaces"

export const addChatHistory = (room : roomsInt) => ({
    type: 'ADD_CURRENT_USER',
    payload: room,
  })