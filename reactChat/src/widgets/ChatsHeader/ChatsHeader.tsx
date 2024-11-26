import { Header, HeaderThemes } from '@/features/Header';
import { MenuRoundedButton } from '@/shared';

export const ChatsHeader: React.FC<{
  username: string;
}> = ({ username }) => (
  <Header
    {...{
      centerNode: <h1>{username}</h1>,
      leftNode: <MenuRoundedButton />,
      theme: HeaderThemes.COLORED
    }}
  />
);
