import { chatSliceReducer } from 'ReactChat/src/entities/Chat';
import { messagesSliceReducer } from 'ReactChat/src/entities/Message';
import { userSliceReducer } from 'ReactChat/src/entities/User';
import { configureStore } from '@reduxjs/toolkit';
import { notificationsSliceReducer } from 'ReactChat/src/entities/Notification';

export const store = configureStore({
  reducer: {
    chats: chatSliceReducer,
    messages: messagesSliceReducer,
    user: userSliceReducer,
    notifications: notificationsSliceReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
