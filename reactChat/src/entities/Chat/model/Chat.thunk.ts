import { getChats, IChat } from '@/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchChats = createAsyncThunk<IChat[], string | undefined>(
  'chat/fetchChats',
  async (searchStr, thunkAPI) => {
    try {
      const response = await getChats(100, undefined, searchStr);

      return response.data.results;
    } catch {
      return thunkAPI.rejectWithValue('Error fetching chats');
    }
  }
);
