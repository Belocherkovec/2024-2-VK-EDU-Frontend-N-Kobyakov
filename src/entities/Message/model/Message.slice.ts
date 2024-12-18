import { IMessage } from '@/shared';
import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';

import { fetchMessages } from './Message.thunk';

interface IMessagesState {
  messagesIdx: string[];
  messagesMap: Record<string, IMessage>;
}

const initialState: IMessagesState = {
  messagesIdx: [],
  messagesMap: {}
};

const selectors = {
  selectMessagesIdx: (state: IMessagesState) => state.messagesIdx,
  selectMessagesMap: (state: IMessagesState) => state.messagesMap
};

const reducers = {
  addMessage: (state: IMessagesState, action: PayloadAction<IMessage>) => {
    state.messagesIdx.push(action.payload.id);
    state.messagesMap[action.payload.id] = action.payload;
  },
  deleteMessage: (state: IMessagesState, action: PayloadAction<IMessage>) => {
    const msgId = state.messagesIdx.indexOf(action.payload.id);

    state.messagesIdx.splice(msgId, 1);
    delete state.messagesMap[action.payload.id];
  },
  resetMessages: () => initialState,
  updateMessage: (state: IMessagesState, action: PayloadAction<IMessage>) => {
    state.messagesMap[action.payload.id] = action.payload;
  }
};

const extraReducers = (builder: ActionReducerMapBuilder<IMessagesState>) => {
  builder.addCase(
    fetchMessages.fulfilled,
    (state, action: PayloadAction<IMessage[]>) => {
      state.messagesIdx = action.payload.reverse().map((message) => message.id);
      state.messagesMap = action.payload.reverse().reduce(
        (acc, cur) => {
          acc[cur.id] = cur;

          return acc;
        },
        {} as Record<string, IMessage>
      );
    }
  );
  builder.addCase(fetchMessages.rejected, () => initialState);
};

const messageSlice = createSlice({
  extraReducers,
  initialState,
  name: 'messages',
  reducers,
  selectors
});

export const messagesSliceReducer = messageSlice.reducer;

export const { addMessage, deleteMessage, resetMessages, updateMessage } =
  messageSlice.actions;

export const { selectMessagesIdx, selectMessagesMap } = messageSlice.selectors;
