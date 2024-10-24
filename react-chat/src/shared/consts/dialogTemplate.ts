import { USERNAME } from '@/shared/consts';
import { MessageStatuses } from '@/shared/consts/statuses';
import { ChatType } from '@/shared/types';
import { AvatarGenerator } from 'random-avatar-generator';

export const generator = new AvatarGenerator();

export const templateChatsData: ChatType = {
  1: {
    avatar: generator.generateRandomAvatar(),
    messages: [
      {
        author: USERNAME,
        sendDate: '2024-10-01T23:39:00.622Z',
        status: MessageStatuses.STATUS_READ,
        text: 'Привет, Эшли!'
      },
      {
        author: 'Дженнифер Эшли',
        sendDate: '2024-10-01T23:40:00.622Z',
        status: MessageStatuses.STATUS_READ,
        text: `Привет, ${USERNAME}!`
      },
      {
        author: USERNAME,
        sendDate: '2024-10-01T23:39:00.622Z',
        status: MessageStatuses.STATUS_READ,
        text: 'Как дела?'
      },
      {
        author: 'Дженнифер Эшли',
        sendDate: '2024-10-06T08:40:00.622Z',
        status: MessageStatuses.STATUS_SEND,
        text: `Хорошо!`
      }
    ],
    userId: 1,
    userName: 'Дженнифер Эшли'
  },
  2: {
    avatar: generator.generateRandomAvatar(),
    messages: [
      {
        author: USERNAME,
        sendDate: '2024-10-01T23:39:00.622Z',
        status: MessageStatuses.STATUS_READ,
        text: 'Привет, Тоха!'
      },
      {
        author: 'Антон Иванов',
        sendDate: '2024-10-01T23:40:00.622Z',
        status: MessageStatuses.STATUS_READ,
        text: `Привет, ${USERNAME}!`
      },
      {
        author: USERNAME,
        sendDate: '2024-10-05T12:12:00.622Z',
        status: MessageStatuses.STATUS_READ,
        text: 'Тоха, ты где?'
      }
    ],
    userId: 2,
    userName: 'Антон Иванов'
  },
  3: {
    avatar: generator.generateRandomAvatar(),
    messages: [
      {
        author: USERNAME,
        sendDate: '2024-10-01T23:39:00.622Z',
        status: MessageStatuses.STATUS_READ,
        text: 'Привет, Серега!'
      },
      {
        author: 'Серёга (Должен 2000 ₽)',
        sendDate: '2024-10-01T23:40:00.622Z',
        status: MessageStatuses.STATUS_READ,
        text: `Привет, ${USERNAME}!`
      },
      {
        author: USERNAME,
        sendDate: '2024-09-31T15:00:00.622Z',
        status: MessageStatuses.STATUS_SEND,
        text: 'Серег, где бабло моё?!'
      }
    ],
    userId: 3,
    userName: 'Серёга (Должен 2000 ₽)'
  },
  4: {
    avatar: generator.generateRandomAvatar(),
    messages: [
      {
        author: USERNAME,
        sendDate: '2023-12-31T23:39:00.622Z',
        status: MessageStatuses.STATUS_SEND,
        text: 'Привет, Сэм!'
      }
    ],
    userId: 4,
    userName: 'Сэм с Нижнего'
  }
};
