import { Header, HeaderThemes } from '@/features/Header';
import {
  BackButton,
  MenuRoundedButton,
  SearchInput
} from '@/shared/components';
import { SearchButton } from '@/shared/components';
import { TEXTS } from '@/shared/consts/texts.ts';

import styles from './ChatsHeader.module.scss';
import { useChatsHeader } from './hooks/useChatsHeader.ts';

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
