import { chatSliceReducer } from '@/entities/Chat/model';
import { messagesSliceReducer } from '@/entities/Message/Message/model/Message.slice';
import { userSliceReducer } from '@/entities/User/model';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    chats: chatSliceReducer,
    messages: messagesSliceReducer,
    user: userSliceReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
