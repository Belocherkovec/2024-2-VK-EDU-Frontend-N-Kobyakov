export const MessageStatuses = {
  STATUS_READ: 'MESSAGE_READ',
  STATUS_SEND: 'MESSAGE_SEND'
} as const;

export type TMessageStatuses =
  (typeof MessageStatuses)[keyof typeof MessageStatuses];
