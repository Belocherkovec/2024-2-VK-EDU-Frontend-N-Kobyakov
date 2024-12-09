import { getMessages, IMessage } from '@/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMessages = createAsyncThunk<IMessage[], string>(
  'messages/fetchMessages',
  async (chatId, thunkAPI) => {
    try {
      let page = 1;
      let response = await getMessages(chatId, page, 100);
      const messages = [...response.data.results];

      while (response.data.next) {
        response = await getMessages(chatId, page, 100);
        messages.push(...response.data.results);
      }

      return messages;
    } catch {
      return thunkAPI.rejectWithValue('Error fetching messages');
    }
  }
);
