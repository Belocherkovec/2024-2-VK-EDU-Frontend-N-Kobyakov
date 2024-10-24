import { Store } from '@/app/store';
import { Header, HeaderThemes } from '@/features/Header';
import {
  BackButton,
  MenuRoundedButton,
  SearchInput
} from '@/shared/components';
import { SearchButton } from '@/shared/components';
import { useContext, useState } from 'react';

import styles from './ChatsHeader.module.scss';

export const ChatsHeader: React.FC<{
  username: string;
}> = ({ username }) => {
  const [isSearchMode, setIsSearchMode] = useState(false);

  const { handleStoreUpdate } = useContext(Store);

  const handleSearch = (value: string) => {
    handleStoreUpdate('filter', value);
  };

  const handleBackClick = () => {
    setIsSearchMode(!isSearchMode);
  };

  return (
    <Header
      {...{
        centerNode: isSearchMode ? (
          <SearchInput onSearch={handleSearch} placeholder="Поиск..." />
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
            onClick={() => setIsSearchMode(!isSearchMode)}
          />
        ),
        theme: HeaderThemes.COLORED
      }}
    />
  );
};
