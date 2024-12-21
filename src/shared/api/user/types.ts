export interface IRegistrationRequest {
  avatar?: File | null;
  bio?: null | string;
  first_name: string;
  last_name: string;
  password: string;
  username: string;
}

export interface IAuthResponse {
  access: string;
  refresh: string;
}

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

export type IGetUsersQueryParams = {
  page?: number;
  page_size?: number;
  search?: string;
};

export type IUserReadInfo = Omit<
  IUser,
  'id' | 'is_online' | 'last_online_at' | 'avatar'
> & {
  avatar: File | null;
};
