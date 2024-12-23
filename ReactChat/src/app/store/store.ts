import { chatSliceReducer } from '@/entities/Chat';
import { messagesSliceReducer } from '@/entities/Message';
import { userSliceReducer } from '@/entities/User';
import { configureStore } from '@reduxjs/toolkit';
import { notificationsSliceReducer } from '@/entities/Notification';

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
