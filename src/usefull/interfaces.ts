export interface UserInt {
  _id?: string;
  avatar?: string;
  name: string;
  email: string;
  password?: string;
  status?: string;
  refreshToken?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface mixInt {
  e: React.FormEvent;
  user?: UserInt | null;
  key?: string;
}

export interface signUpResponse {
  _id: string;
  accessToken: string;
  refreshToken: string;
}

export interface logInInt {
  email: string;
  password: string;
}

export interface mixLogInInt {
  logIn: logInInt;
  e: React.FormEvent;
}

export interface messagesInt {
  sender: string;
  content: {
    text: string;
    media?: string;
  };
}

interface membersInt{
  _id: string,
  name: string,
  avatar: string
}

export interface roomsInt {
  history: Array<messagesInt>,
  members: Array<membersInt>
  _id: string
}

export interface reduxStateInt {
  user: {
    currentUser: null | UserInt;
  };
  chats: {
    selectedChat: null | roomsInt;
    rooms: Array<roomsInt>
  };
}
