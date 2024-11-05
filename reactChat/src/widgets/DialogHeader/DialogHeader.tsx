import { Header, HeaderThemes } from '@/features/Header';
import { BackButton, SwapButton } from '@/shared/components/buttons';

import { UserInfo } from './ui';

export const DialogHeader: React.FC<{
  avatar: string;
  chatId: string;
  className?: string;
  fullName: string;
}> = ({ avatar, chatId, className, fullName }) => (
  <Header
    centerNode={
      <UserInfo avatar={avatar} chatId={chatId} fullName={fullName} />
    }
    className={className}
    leftNode={<BackButton />}
    rightNode={<SwapButton />}
    theme={HeaderThemes.WHITE}
  />
);
