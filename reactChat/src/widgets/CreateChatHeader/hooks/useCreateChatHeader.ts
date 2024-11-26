import { useState } from 'react';
import { fetchUsers } from '@/entities/User';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app';

export const useCreateChatHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isSearchMode, setIsSearchMode] = useState(false);

  const handleSearchModeChange = () => setIsSearchMode(!isSearchMode);

  const handleSearch = (value: string) => {
    dispatch(fetchUsers(value));
  };

  const handleBackClick = () => {
    setIsSearchMode(!isSearchMode);
    dispatch(fetchUsers());
  };

  return {
    handleBackClick,
    handleSearch,
    handleSearchModeChange,
    isSearchMode
  };
};
