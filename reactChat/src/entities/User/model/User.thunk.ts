import { getUsers, IUser, switchStatusOnline } from '@/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { resetUsersState } from './User.slice';

export const fetchUsers = createAsyncThunk<IUser[], string | undefined>(
  'user/fetchUsers',
  async (searchStr, thunkAPI) => {
    try {
      const response = await getUsers(200, undefined, searchStr);

      return response.data.results;
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
      const response = await switchStatusOnline();

      return response.data;
    } catch {
      return thunkAPI.rejectWithValue('Error fetching current user');
    }
  }
);
