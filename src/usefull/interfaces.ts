export interface UserInt {
  _id?: string;
  name: string;
  username: string;
  email: string;
  password: string;
  status?: string;
}

export interface mixInt {
  e: React.FormEvent;
  user?: UserInt | null;
  key?: string;
}
