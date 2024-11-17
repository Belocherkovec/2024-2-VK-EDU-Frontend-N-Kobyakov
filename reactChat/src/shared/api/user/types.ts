export interface IGetUsersResponse {
  count: number;
  next: null | string;
  previous: null | string;
  results: IUser[];
}

export interface IUser {
  avatar: null | string;
  bio: null | string;
  first_name: string;
  id: string;
  is_online: boolean;
  last_name: string;
  last_online_at: string;
  username: string;
}
