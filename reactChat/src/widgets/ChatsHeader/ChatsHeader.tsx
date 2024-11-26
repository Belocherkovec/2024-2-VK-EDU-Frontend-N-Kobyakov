import { Header, HeaderThemes } from '@/features/Header';
import {
  BackButton,
  MenuRoundedButton,
  SearchButton,
  SearchInput,
  TEXTS
} from '@/shared';

import { useChatsHeader } from './hooks/useChatsHeader';
import styles from './сhatsHeader.module.scss';

export const ChatsHeader: React.FC<{
  username: string;
}> = ({ username }) => {
  const {
    handleBackClick,
    handleSearch,
    handleSearchModeChange,
    isSearchMode
  } = useChatsHeader();

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
            className={styles.header__button}
            onClick={handleBackClick}
          />
        ) : (
          <MenuRoundedButton />
        ),
        rightNode: isSearchMode ? null : (
          <SearchButton
            className={styles.header__button}
            onClick={handleSearchModeChange}
          />
        ),
        theme: HeaderThemes.COLORED
      }}
    />
  );
};
