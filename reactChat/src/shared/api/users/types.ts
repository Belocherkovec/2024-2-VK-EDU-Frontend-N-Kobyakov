export interface IGetUserResponse {
  count: number;
  next: null | string;
  previous: null | string;
  results: IUser[];
}

interface IUser {
  avatar: null | string;
  bio: string;
  first_name: string;
  id: string;
  last_name: string;
  username: string;
}
