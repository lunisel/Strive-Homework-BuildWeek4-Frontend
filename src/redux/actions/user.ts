import {UserInt} from "../../usefull/interfaces"

export const addCurrentUser = (user : UserInt) => ({
    type: 'ADD_CURRENT_USER',
    payload: user,
  })