import { IMessage } from '../message';

export interface ICentrifugoResponse {
  token: string;
}

export interface ICentrifugoEvent {
  event: TCentrifugoEventTypes;
  message: IMessage;
}

export const CentrifugoEventTypes = {
  CREATE: 'create',
  DELETE: 'delete',
  READ: 'read',
  UPDATE: 'update'
} as const;

export type TCentrifugoEventTypes =
  (typeof CentrifugoEventTypes)[keyof typeof CentrifugoEventTypes];
