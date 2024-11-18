import { IMessage } from '@/shared/api/message';
import {
  createMessage,
  getMessages,
  postReadMessage
} from '@/shared/api/message/message';
import { ICreateMessageRequest } from '@/shared/api/message/types';
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

export const sendMessage = createAsyncThunk<IMessage, ICreateMessageRequest>(
  'messages/sendMessage',
  async (data, thunkAPI) => {
    try {
      const response = await createMessage(data);

      return response.data;
    } catch {
      return thunkAPI.rejectWithValue('Error sending message');
    }
  }
);

export const readMessage = createAsyncThunk<IMessage, string>(
  'messages/readMessage',
  async (msgId, thunkAPI) => {
    try {
      const response = await postReadMessage(msgId);

      return response.data;
    } catch {
      return thunkAPI.rejectWithValue('Error reading message');
    }
  }
);
