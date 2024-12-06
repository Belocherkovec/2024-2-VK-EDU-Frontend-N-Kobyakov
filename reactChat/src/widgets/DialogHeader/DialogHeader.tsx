import { Header, HeaderThemes } from '@/features/Header';
import { BackButton, RoutePaths } from '@/shared';

import { UserInfo } from './ui';

export const DialogHeader: React.FC<{
  avatar: null | string;
  className?: string;
  title: string;
  isOnline?: boolean;
  lastOnline?: string;
}> = ({ avatar, className, title, lastOnline, isOnline }) => {
  return (
    <Header
      centerNode={
        <UserInfo
          avatar={avatar}
          title={title}
          lastOnline={lastOnline}
          isOnline={isOnline}
        />
      }
      className={className}
      leftNode={<BackButton to={RoutePaths.chatsPage} isReplace />}
      theme={HeaderThemes.WHITE}
    />
  );
};
