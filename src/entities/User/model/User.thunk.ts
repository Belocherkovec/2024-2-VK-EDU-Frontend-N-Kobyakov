import { getCurrentUser, getUsers, IUser } from '@/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { resetUsersState } from './User.slice';

export const fetchUsers = createAsyncThunk<IUser[], string | undefined>(
  'user/fetchUsers',
  async (searchStr, thunkAPI) => {
    try {
      let page = 1;
      let response = await getUsers(100, page, searchStr);
      const users = [...response.data.results];

      while (response.data.next) {
        response = await getUsers(100, ++page, searchStr);
        users.push(...response.data.results);
      }

      return users;
    } catch {
      thunkAPI.dispatch(resetUsersState());

      return thunkAPI.rejectWithValue('Error fetching chats');
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<IUser, void>(
  'user/fetchCurrentUser',
  async (_, thunkAPI) => {
    try {
      const response = await getCurrentUser();

      return response.data;
    } catch {
      return thunkAPI.rejectWithValue('Error fetching current user');
    }
  }
);
