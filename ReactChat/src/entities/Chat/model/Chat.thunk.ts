import { getChats, IChat } from 'ReactChat/src/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchChats = createAsyncThunk<IChat[], string | undefined>(
  'chat/fetchChats',
  async (searchStr, thunkAPI) => {
    try {
      let page = 1;
      let response = await getChats(100, page, searchStr);
      const chats = [...response.data.results];

      while (response.data.next) {
        response = await getChats(100, ++page, searchStr);
        chats.push(...response.data.results);
      }

      return chats;
    } catch {
      return thunkAPI.rejectWithValue('Error fetching chats');
    }
  }
);
