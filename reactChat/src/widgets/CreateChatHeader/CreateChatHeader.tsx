import { Header, HeaderThemes } from '@/features/Header';
import {
  BackButton,
  RoutePaths,
  SearchButton,
  SearchInput,
  TEXTS
} from '@/shared';
import { useCreateChatHeader } from './hooks';

export const CreateChatHeader: React.FC = () => {
  const {
    handleBackClick,
    handleSearch,
    handleSearchModeChange,
    isSearchMode
  } = useCreateChatHeader();

  return (
    <Header
      centerNode={
        isSearchMode ? (
          <SearchInput
            onSearch={handleSearch}
            placeholder={TEXTS.placeholders.search}
          />
        ) : (
          <h4>{TEXTS.pages.createChat.title}</h4>
        )
      }
      leftNode={
        <BackButton
          onClick={isSearchMode ? handleBackClick : undefined}
          to={RoutePaths.chatsPage}
          isReplace
        />
      }
      rightNode={
        isSearchMode ? null : <SearchButton onClick={handleSearchModeChange} />
      }
      theme={HeaderThemes.COLORED}
    />
  );
};
