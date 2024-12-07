import { getMessages, IMessage } from '@/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMessages = createAsyncThunk<IMessage[], string>(
  'messages/fetchMessages',
  async (chatId, thunkAPI) => {
    try {
      const response = await getMessages(chatId, undefined, 200);

      return response.data.results;
    } catch {
      return thunkAPI.rejectWithValue('Error fetching messages');
    }
  }
);
