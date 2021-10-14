import { PayloadAction } from '@reduxjs/toolkit'
import {initialState} from "../store"

const chatsReducer = (state = initialState.chat, action : PayloadAction ) => {
    switch (action.type) {
        case 'ADD_CHAT_HISTORY':
          return {
            ...state,
            rooms: action.payload
          }
        default:
          return state
      }
}

export default chatsReducer