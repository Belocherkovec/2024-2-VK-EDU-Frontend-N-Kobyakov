import { Header, HeaderThemes } from '@/features/Header';
import { BackButton, RoutePaths } from '@/shared';

import { UserInfo } from './ui';

export const DialogHeader: React.FC<{
  avatar: null | string;
  className?: string;
  title: string;
  lastOnline?: string;
}> = ({ avatar, className, title, lastOnline }) => (
  <Header
    centerNode={
      <UserInfo avatar={avatar} title={title} lastOnline={lastOnline} />
    }
    className={className}
    leftNode={<BackButton to={RoutePaths.chatsPage} isReplace />}
    theme={HeaderThemes.WHITE}
  />
);
