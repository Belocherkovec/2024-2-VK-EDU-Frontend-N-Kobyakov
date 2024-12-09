import { useState } from 'react';

interface IUseSerachProps {
  onClose: () => void;
  onSearch: (search: string) => void;
}

export const useSearch = (props: IUseSerachProps) => {
  const { onClose, onSearch } = props;

  const [isSearchMode, setIsSearchMode] = useState(false);

  const handleSearchModeChange = () => setIsSearchMode(!isSearchMode);

  const handleSearch = (value: string) => {
    onSearch(value);
  };

  const handleBackClick = () => {
    setIsSearchMode(!isSearchMode);
    onClose();
  };

  return {
    handleBackClick,
    handleSearch,
    handleSearchModeChange,
    isSearchMode
  };
};
