import { IChat } from '@/shared/api/chat';
import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';

import { fetchChats } from './Chat.thunk';

interface IChatState {
  chatList: IChat[];
  chatMap: Record<string, IChat>;
}

const initialState: IChatState = {
  chatList: [],
  chatMap: {}
};

const selectors = {
  selectChatList: (state: IChatState) => state.chatList,
  selectChatMap: (state: IChatState) => state.chatMap,
  selectCurrentChat: (state: IChatState, id: string) => state.chatMap[id]
};

const reducers = {
  resetChat: () => initialState,
  setChatList: (state: IChatState, action: PayloadAction<IChat[]>) => {
    state.chatList = action.payload;
  },
  setChatMap: (
    state: IChatState,
    action: PayloadAction<Record<string, IChat>>
  ) => {
    state.chatMap = action.payload;
  }
};

const extraReducers = (builder: ActionReducerMapBuilder<IChatState>) => {
  builder.addCase(
    fetchChats.fulfilled,
    (state, action: PayloadAction<IChat[]>) => {
      state.chatList = action.payload;
      state.chatMap = action.payload.reduce(
        (acc, cur) => {
          acc[cur.id] = cur;

          return acc;
        },
        {} as Record<string, IChat>
      );
    }
  );
};

const chatSlice = createSlice({
  extraReducers,
  initialState,
  name: 'chats',
  reducers,
  selectors
});

export const chatSliceReducer = chatSlice.reducer;

export const { resetChat, setChatList, setChatMap } = chatSlice.actions;

export const { selectChatList, selectChatMap, selectCurrentChat } =
  chatSlice.selectors;
