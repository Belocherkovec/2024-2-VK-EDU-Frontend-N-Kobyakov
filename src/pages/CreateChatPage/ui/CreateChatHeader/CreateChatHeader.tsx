import { useDispatch } from 'react-redux';

import { Header, HeaderThemes, SearchInput } from '@/features';
import {
  BackButton,
  RoutePaths,
  SearchButton,
  TEXTS,
  useSearch
} from '@/shared';
import { AppDispatch } from '@/app';
import { fetchUsers } from '@/entities/User';
import styles from './createChatHeader.module.scss';

export const CreateChatHeader: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    isSearchMode,
    handleSearchModeChange,
    handleSearch,
    handleBackClick
  } = useSearch({
    onSearch: (value: string) => dispatch(fetchUsers(value)),
    onClose: () => dispatch(fetchUsers())
  });

  return (
    <Header
      className={styles.header}
      centerNode={
        isSearchMode ? (
          <SearchInput
            onSearch={handleSearch}
            placeholder={TEXTS.placeholders.search}
          />
        ) : (
          <h4 className={styles.header__title}>
            {TEXTS.pages.createChat.title}
          </h4>
        )
      }
      leftNode={
        <BackButton
          className={styles.header__button}
          onClick={isSearchMode ? handleBackClick : undefined}
          to={RoutePaths.chatsPage}
          isReplace
        />
      }
      rightNode={
        isSearchMode ? null : (
          <SearchButton
            onClick={handleSearchModeChange}
            className={styles.header__button}
          />
        )
      }
      theme={HeaderThemes.COLORED}
    />
  );
};
