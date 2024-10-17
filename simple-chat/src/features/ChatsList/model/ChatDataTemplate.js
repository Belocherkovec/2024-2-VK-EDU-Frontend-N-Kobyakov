import { STATUS_READ, STATUS_SEND } from '@consts/messageStatus';
import { USERNAME } from '@consts/userName';
import { generator } from '@utils/avatarGenerator';

export const templateChatsData = {
  1: {
    avatar: generator.generateRandomAvatar(),
    messages: [
      {
        author: USERNAME,
        sendDate: '2024-10-01T23:39:00.622Z',
        status: STATUS_READ,
        text: 'Привет, Эшли!',
      },
      {
        author: 'Дженнифер Эшли',
        sendDate: '2024-10-01T23:40:00.622Z',
        status: STATUS_READ,
        text: `Привет, ${USERNAME}!`,
      },
      {
        author: USERNAME,
        sendDate: '2024-10-01T23:39:00.622Z',
        status: STATUS_READ,
        text: 'Как дела?',
      },
      {
        author: 'Дженнифер Эшли',
        sendDate: '2024-10-06T08:40:00.622Z',
        status: STATUS_SEND,
        text: `Хорошо!`,
      },
    ],
    userName: 'Дженнифер Эшли',
  },
  2: {
    avatar: generator.generateRandomAvatar(),
    messages: [
      {
        author: USERNAME,
        sendDate: '2024-10-01T23:39:00.622Z',
        status: STATUS_READ,
        text: 'Привет, Тоха!',
      },
      {
        author: 'Антон Иванов',
        sendDate: '2024-10-01T23:40:00.622Z',
        status: STATUS_READ,
        text: `Привет, ${USERNAME}!`,
      },
      {
        author: USERNAME,
        sendDate: '2024-10-05T12:12:00.622Z',
        status: STATUS_READ,
        text: 'Тоха, ты где?',
      },
    ],
    userName: 'Антон Иванов',
  },
  3: {
    avatar: generator.generateRandomAvatar(),
    messages: [
      {
        author: USERNAME,
        sendDate: '2024-10-01T23:39:00.622Z',
        status: STATUS_READ,
        text: 'Привет, Серега!',
      },
      {
        author: 'Серёга (Должен 2000 ₽)',
        sendDate: '2024-10-01T23:40:00.622Z',
        status: STATUS_READ,
        text: `Привет, ${USERNAME}!`,
      },
      {
        author: USERNAME,
        sendDate: '2024-09-31T15:00:00.622Z',
        status: STATUS_SEND,
        text: 'Серег, где бабло моё?!',
      },
    ],
    userName: 'Серёга (Должен 2000 ₽)',
  },
  4: {
    avatar: generator.generateRandomAvatar(),
    messages: [
      {
        author: USERNAME,
        sendDate: '2023-12-31T23:39:00.622Z',
        status: STATUS_SEND,
        text: 'Привет, Сэм!',
      },
    ],
    userName: 'Сэм с Нижнего',
  },
};
