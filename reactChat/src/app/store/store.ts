import { chatSliceReducer } from '@/entities/Chat/model';
import { userSliceReducer } from '@/entities/User/model';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    chats: chatSliceReducer,
    user: userSliceReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
