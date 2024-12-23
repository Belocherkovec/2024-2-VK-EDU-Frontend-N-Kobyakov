import { useDispatch } from 'react-redux';
import cn from 'classnames';

import { AppDispatch } from '@/app';
import { Header, HeaderThemes, SearchInput } from '@/features';
import {
  BackButton,
  MenuRoundedButton,
  RoutePaths,
  SearchButton,
  TEXTS,
  useSearch
} from '@/shared';
import { fetchChats } from '@/entities/Chat';

import styles from './сhatsHeader.module.scss';

export const ChatsHeader: React.FC<{
  username: string;
  onMenuClick: () => void;
  isMenuOpen?: boolean;
}> = ({ username, onMenuClick, isMenuOpen }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    isSearchMode,
    handleSearch,
    handleBackClick,
    handleSearchModeChange
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
        ) : (
          <MenuRoundedButton
            onClick={onMenuClick}
            className={cn(styles.header__button, isMenuOpen && styles._isOpen)}
          />
        ),
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
