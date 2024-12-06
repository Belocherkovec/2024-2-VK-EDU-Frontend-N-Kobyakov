import { Header, HeaderThemes } from '@/features/Header';
import {
  BackButton,
  MenuRoundedButton,
  RoutePaths,
  SearchButton,
  SearchInput,
  TEXTS,
  useSearch
} from '@/shared';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app';
import { fetchChats } from '@/entities/Chat';

export const ChatsHeader: React.FC<{
  username: string;
}> = ({ username }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    isSearchMode,
    handleSearchModeChange,
    handleSearch,
    handleBackClick
  } = useSearch({
    onSearch: (value: string) => dispatch(fetchChats(value)),
    onClose: () => dispatch(fetchChats())
  });

  return (
    <Header
      {...{
        centerNode: isSearchMode ? (
          <SearchInput
            onSearch={handleSearch}
            placeholder={TEXTS.placeholders.search}
          />
        ) : (
          <h1>{username}</h1>
        ),
        leftNode: isSearchMode ? (
          <BackButton
            onClick={handleBackClick}
            to={RoutePaths.chatsPage}
            isReplace
          />
        ) : (
          <MenuRoundedButton />
        ),
        rightNode: isSearchMode ? null : (
          <SearchButton onClick={handleSearchModeChange} />
        ),
        theme: HeaderThemes.COLORED
      }}
    />
  );
};
