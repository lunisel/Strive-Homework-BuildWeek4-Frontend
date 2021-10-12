import { RouteComponentProps } from "react-router";

export interface UserInt {
  _id?: string;
  avatar?: string;
  name: string;
  email: string;
  password: string;
  status?: string;
  refreshToken?: string;
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
