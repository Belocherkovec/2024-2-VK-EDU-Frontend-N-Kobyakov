import { IChat } from '@/shared';
import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';

import { fetchChats } from './Chat.thunk';

interface IChatState {
  chatIds: string[];
  chatMap: Record<string, IChat>;
}

const initialState: IChatState = {
  chatIds: [],
  chatMap: {}
};

const selectors = {
  selectChatIds: (state: IChatState) => state.chatIds,
  selectChatMap: (state: IChatState) => state.chatMap,
  selectCurrentChat: (state: IChatState, id: string) => state.chatMap[id]
};

const reducers = {
  addChat: (state: IChatState, action: PayloadAction<IChat>) => {
    const chatId = action.payload.id;

    if (!state.chatMap[chatId]) {
      state.chatMap[chatId] = action.payload;
      state.chatIds.push(chatId);
    }
  },
  resetChat: () => initialState,
  setChatIds: (state: IChatState, action: PayloadAction<string[]>) => {
    state.chatIds = action.payload;
  },
  setChatMap: (
    state: IChatState,
    action: PayloadAction<Record<string, IChat>>
  ) => {
    state.chatMap = action.payload;
  },
  replaceChat: (state: IChatState, action: PayloadAction<IChat>) => {
    state.chatMap[action.payload.id] = action.payload;
  }
};

const extraReducers = (builder: ActionReducerMapBuilder<IChatState>) => {
  builder.addCase(
    fetchChats.fulfilled,
    (state, action: PayloadAction<IChat[]>) => {
      state.chatIds = action.payload.map((chat) => chat.id);
      state.chatMap = action.payload.reduce(
        (acc, cur) => {
          acc[cur.id] = cur;

          return acc;
        },
        {} as Record<string, IChat>
      );
    }
  );
  builder.addCase(fetchChats.rejected, () => initialState);
};

const chatSlice = createSlice({
  extraReducers,
  initialState,
  name: 'chats',
  reducers,
  selectors
});

export const chatSliceReducer = chatSlice.reducer;

export const { addChat, resetChat, setChatIds, setChatMap, replaceChat } =
  chatSlice.actions;

export const { selectChatIds, selectChatMap, selectCurrentChat } =
  chatSlice.selectors;
