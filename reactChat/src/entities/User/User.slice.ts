import { createSlice } from '@reduxjs/toolkit';

type UserState = {
  isAuthenticated: boolean;
};

const initialState: UserState = {
  isAuthenticated: false
};

const reducers = {
  reset: () => initialState,
  setUserAuthorized: (state: UserState) => {
    state.isAuthenticated = true;
  }
};

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers
});

export const userSliceReducer = userSlice.reducer;

export const { reset, setUserAuthorized } = userSlice.actions;
