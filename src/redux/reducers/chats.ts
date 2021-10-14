import { PayloadAction } from '@reduxjs/toolkit'
import {initialState} from "../store"

const chatsReducer = (state = initialState.chats, action : PayloadAction ) => {
    switch (action.type) {
        case 'ADD_CHAT_HISTORY':
          return {
            ...state,
            rooms: action.payload
          }
          case "ADD_SELECTED_CHAT" : 
          return{
              ...state,
              selectedChat: action.payload
          }
        default:
          return state
      }
}

export default chatsReducer