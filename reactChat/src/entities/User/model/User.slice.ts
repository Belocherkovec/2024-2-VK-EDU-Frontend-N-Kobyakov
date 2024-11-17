import { fetchCurrentUser, fetchUsers } from '@/entities/User/model/User.thunk';
import { IUser } from '@/shared/api/user';
import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';

interface IUserState {
  isAuthenticated: boolean;
  userInfo: IUser;
  usersIds: string[];
  usersMap: Record<string, IUser>;
}

const initialState: IUserState = {
  isAuthenticated: true,
  userInfo: {} as IUser,
  usersIds: [],
  usersMap: {}
};

const reducers = {
  resetCurrentUserState: (state: IUserState) => {
    state.isAuthenticated = initialState.isAuthenticated;
    state.userInfo = initialState.userInfo;
  },
  resetUsersState: (state: IUserState) => {
    state.usersIds = initialState.usersIds;
    state.usersMap = initialState.usersMap;
  },
  setUserAuthorized: (state: IUserState) => {
    state.isAuthenticated = true;
  },
  setUserIds: (state: IUserState, action: PayloadAction<string[]>) => {
    state.usersIds = action.payload;
  },
  setUserInfo: (state: IUserState, action: PayloadAction<IUser>) => {
    state.userInfo = action.payload;
  },
  setUsersMap: (
    state: IUserState,
    action: PayloadAction<Record<string, IUser>>
  ) => {
    state.usersMap = action.payload;
  },
  setUserUnauthorized: (state: IUserState) => {
    state.isAuthenticated = false;
  }
};

const extraReducers = (builder: ActionReducerMapBuilder<IUserState>) => {
  builder.addCase(
    fetchUsers.fulfilled,
    (state, action: PayloadAction<IUser[]>) => {
      state.usersIds = action.payload.map((user) => user.id);
      state.usersMap = action.payload.reduce(
        (acc, cur) => {
          acc[cur.id] = cur;

          return acc;
        },
        {} as Record<string, IUser>
      );
    }
  );
  builder.addCase(
    fetchCurrentUser.fulfilled,
    (state, action: PayloadAction<IUser>) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
    }
  );
  builder.addCase(fetchCurrentUser.rejected, (state) => {
    state.isAuthenticated = false;
  });
};

const selectors = {
  selectUserInfo: (state: IUserState) => state.userInfo,
  selectUserIsAuthenticated: (state: IUserState) => state.isAuthenticated,
  selectUsersIds: (state: IUserState) => state.usersIds,
  selectUsersMap: (state: IUserState) => state.usersMap
};

const userSlice = createSlice({
  extraReducers,
  initialState,
  name: 'user',
  reducers,
  selectors
});

export const userSliceReducer = userSlice.reducer;

export const {
  resetCurrentUserState,
  resetUsersState,
  setUserAuthorized,
  setUserIds,
  setUserInfo,
  setUsersMap,
  setUserUnauthorized
} = userSlice.actions;

export const {
  selectUserInfo,
  selectUserIsAuthenticated,
  selectUsersIds,
  selectUsersMap
} = userSlice.selectors;
