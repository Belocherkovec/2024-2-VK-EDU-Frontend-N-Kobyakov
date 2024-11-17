import { resetUsersState } from '@/entities/User/model/User.slice';
import { getCurrentUser, getUsers, IUser } from '@/shared/api/user';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk<IUser[], void>(
  'user/fetchUsers',
  async (_, thunkAPI) => {
    try {
      const response = await getUsers(200);

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
      const response = await getCurrentUser();

      return response.data;
    } catch {
      return thunkAPI.rejectWithValue('Error fetching current user');
    }
  }
);
