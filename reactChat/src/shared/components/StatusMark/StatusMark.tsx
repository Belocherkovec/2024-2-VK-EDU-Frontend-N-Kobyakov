import { MessageStatuses, TMessageStatuses } from '@/shared/consts/statuses';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';

export const StatusMark: React.FC<{
  className?: string;
  status: TMessageStatuses;
}> = ({ className, status }) => (
  <>
    {status === MessageStatuses.STATUS_READ && (
      <DoneAllRoundedIcon className={className} />
    )}
    {status === MessageStatuses.STATUS_SEND && (
      <CheckRoundedIcon className={className} />
    )}
  </>
);
