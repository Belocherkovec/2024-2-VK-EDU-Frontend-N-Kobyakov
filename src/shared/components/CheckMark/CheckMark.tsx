import { StatusMark } from '../index';
import { TEXTS, TMessageStatuses } from '../../consts';

export const CheckMark: React.FC<{
  isShowUnread?: boolean;
  messageStatus: TMessageStatuses;
  unreadMessagesCount?: number;
  unreadClassName?: string;
}> = ({
  isShowUnread,
  messageStatus,
  unreadMessagesCount,
  unreadClassName
}) => (
  <>
    {isShowUnread && unreadMessagesCount ? (
      <span className={unreadClassName}>{unreadMessagesCount}</span>
    ) : (
      TEXTS.empty
    )}
    {!isShowUnread && <StatusMark status={messageStatus} />}
  </>
);
