import { IUser } from '@/shared/api/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
  isAuthenticated: boolean;
  userInfo: IUser;
}

const initialState: IUserState = {
  isAuthenticated: false,
  userInfo: {} as IUser
};

const reducers = {
  resetUserState: () => initialState,
  setUserAuthorized: (state: IUserState) => {
    state.isAuthenticated = true;
  },
  setUserInfo: (state: IUserState, action: PayloadAction<IUser>) => {
    state.userInfo = action.payload;
  }
};

const selectors = {
  selectUserInfo: (state: IUserState) => state.userInfo,
  selectUserIsAuthenticated: (state: IUserState) => state.isAuthenticated
};

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers,
  selectors
});

export const userSliceReducer = userSlice.reducer;

export const { resetUserState, setUserAuthorized, setUserInfo } =
  userSlice.actions;

export const { selectUserInfo, selectUserIsAuthenticated } =
  userSlice.selectors;
