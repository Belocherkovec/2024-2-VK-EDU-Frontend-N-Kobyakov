import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type NotificationTypes = 'ERROR' | 'SUCCESS';

export const NOTIFICATION_TYPES = {
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS'
} as const;

interface INotification {
  title: string;
  message: string;
  type: NotificationTypes;
  lifeTime: number;
  key?: string;
}

interface INotificationState {
  notifications: INotification[];
}

const initialState: INotificationState = {
  notifications: []
};

const reducers = {
  pushNotification: (
    state: INotificationState,
    action: PayloadAction<INotification>
  ) => {
    state.notifications.push({
      ...action.payload,
      key: Math.random().toString()
    });
  },
  removeNotification: (
    state: INotificationState,
    action: PayloadAction<string>
  ) => {
    state.notifications = state.notifications.filter(
      (notification) => notification.key !== action.payload
    );
  }
};

const selectors = {
  selectNotifications: (state: INotificationState) => state.notifications
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  selectors,
  reducers
});

export const notificationsSliceReducer = notificationSlice.reducer;

export const { selectNotifications } = notificationSlice.selectors;

export const { pushNotification, removeNotification } =
  notificationSlice.actions;
