import { StatusMark } from '@/shared/components';
import { TMessageStatuses } from '@/shared/consts/statuses';
import { TEXTS } from '@/shared/consts/texts';

export const CheckMark: React.FC<{
  isShowUnread?: boolean;
  messageStatus: TMessageStatuses;
  undeadMessagesCount?: number;
  unreadClassName?: string;
}> = ({
  isShowUnread,
  messageStatus,
  undeadMessagesCount,
  unreadClassName
}) => (
  <>
    {isShowUnread && undeadMessagesCount ? (
      <span className={unreadClassName}>{undeadMessagesCount}</span>
    ) : (
      TEXTS.empty
    )}
    {!isShowUnread && <StatusMark status={messageStatus} />}
  </>
);
