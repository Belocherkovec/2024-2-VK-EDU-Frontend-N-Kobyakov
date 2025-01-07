import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HistoryState {
  history: Array<{
    fromText: string;
    toText: string;
    selectedFrom: string;
    selectedTo: string;
  }>;
}

const initialState: HistoryState = {
  history: JSON.parse(localStorage.getItem('history') || '[]').reverse(),
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addHistory(state, action: PayloadAction<{
      fromText: string;
      toText: string;
      selectedFrom: string;
      selectedTo: string;
    }>) {
      state.history.unshift(action.payload);

      localStorage.setItem('history', JSON.stringify(state.history));
    },
    clearHistory(state) {
      state.history = [];
      localStorage.removeItem('history');
    },
  },
});

export const store = configureStore({
  reducer: {
    history: historySlice.reducer,
  },
});

export const { addHistory, clearHistory } = historySlice.actions;
export const selectHistory = (state: RootState) => state.history.history;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
