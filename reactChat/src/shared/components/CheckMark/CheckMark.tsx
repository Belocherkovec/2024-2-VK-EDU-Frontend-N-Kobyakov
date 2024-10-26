import { USERNAME } from '@/shared/consts';
import { MessageStatuses } from '@/shared/consts/statuses';
import { IReactChat, IReactChatMessage } from '@/shared/types';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';

export const CheckMark: React.FC<{
  unreadClassName?: string;
  userData: IReactChat;
}> = ({ unreadClassName, userData }) => {
  const lastMessage = userData.messages.at(-1);
  const { author, status: messageStatus } = lastMessage as IReactChatMessage;

  const unreadMessage: number = userData.messages.filter(
    (msg: IReactChatMessage) =>
      msg.author !== USERNAME && msg.status === MessageStatuses.STATUS_SEND
  ).length;

  return (
    <>
      {messageStatus === MessageStatuses.STATUS_READ && author === USERNAME && (
        <DoneAllRoundedIcon />
      )}
      {messageStatus === MessageStatuses.STATUS_SEND && author === USERNAME && (
        <CheckRoundedIcon />
      )}
      {author !== USERNAME && !!unreadMessage && (
        <span className={unreadClassName}>{unreadMessage}</span>
      )}
    </>
  );
};
