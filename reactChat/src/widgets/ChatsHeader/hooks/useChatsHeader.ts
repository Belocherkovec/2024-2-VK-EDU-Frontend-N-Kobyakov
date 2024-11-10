import { Store } from '@/app/oldStore';
import { useContext, useState } from 'react';

export const useChatsHeader = () => {
  const [isSearchMode, setIsSearchMode] = useState(false);
  const { handleStoreUpdate } = useContext(Store);

  const handleSearchModeChange = () => setIsSearchMode(!isSearchMode);

  const handleSearch = (value: string) => {
    handleStoreUpdate('filter', value);
  };

  const handleBackClick = () => {
    setIsSearchMode(!isSearchMode);
  };

  return {
    handleBackClick,
    handleSearch,
    handleSearchModeChange,
    isSearchMode
  };
};
