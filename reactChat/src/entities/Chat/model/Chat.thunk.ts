import { getChats, IChat } from '@/shared/api/chat';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchChats = createAsyncThunk<IChat[], void>(
  'chat/fetchChats',
  async (_, thunkAPI) => {
    try {
      const response = await getChats(100);

      return response.data.results;
    } catch {
      return thunkAPI.rejectWithValue('Error fetching chats');
    }
  }
);
