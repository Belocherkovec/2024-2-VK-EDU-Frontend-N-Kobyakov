import { Header, HeaderThemes } from '@/features/Header';
import { BackButton } from '@/shared/components';
import { SwapButton } from '@/shared/components/SwapButton';

import { UserInfo } from './ui';

export const DialogHeader: React.FC<{
  avatar: string;
  className?: string;
  userName: string;
}> = ({ avatar, className, userName }) => (
  <Header
    centerNode={<UserInfo avatar={avatar} userName={userName} />}
    className={className}
    leftNode={<BackButton />}
    rightNode={<SwapButton />}
    theme={HeaderThemes.WHITE}
  />
);
