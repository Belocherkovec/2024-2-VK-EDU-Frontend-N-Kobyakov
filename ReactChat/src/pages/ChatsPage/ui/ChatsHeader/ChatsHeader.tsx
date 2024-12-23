import { useDispatch } from 'react-redux';

import { AppDispatch } from 'ReactChat/src/app';
import { Header, HeaderThemes, SearchInput } from 'ReactChat/src/features';
import {
  BackButton,
  RoutePaths,
  SearchButton,
  TEXTS,
  useSearch
} from 'ReactChat/src/shared';
import { fetchChats } from 'ReactChat/src/entities/Chat';

import styles from './сhatsHeader.module.scss';

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
      className={styles.header}
      {...{
        centerNode: isSearchMode ? (
          <SearchInput
            onSearch={handleSearch}
            placeholder={TEXTS.placeholders.search}
          />
        ) : (
          <h1 className={styles.header__title}>{username}</h1>
        ),
        leftNode: isSearchMode ? (
          <BackButton
            onClick={handleBackClick}
            to={RoutePaths.chatsPage}
            className={styles.header__button}
            isReplace
          />
        ) : null,
        rightNode: isSearchMode ? null : (
          <SearchButton
            onClick={handleSearchModeChange}
            className={styles.header__button}
          />
        ),
        theme: HeaderThemes.COLORED
      }}
    />
  );
};
