import { Header, HeaderThemes } from '@/features/Header';
import { BackButton, SearchButton, TEXTS } from '@/shared';

export const CreateChatHeader: React.FC = () => (
  <Header
    centerNode={<h4>{TEXTS.pages.createChat.title}</h4>}
    leftNode={<BackButton />}
    rightNode={<SearchButton onClick={() => {}} />}
    theme={HeaderThemes.COLORED}
  />
);
