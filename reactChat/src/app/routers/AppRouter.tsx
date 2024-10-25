import { Chats } from '@/pages/Chats';
import { Dialog } from '@/pages/Dialog';
import { useEffect, useState } from 'react';

const pages = {
  default: <Chats />,
  dialog: <Dialog />
};

const getPageName = (): string => location.hash.slice(1);

export const AppRouter: React.FC = () => {
  const [page, setPage] = useState<string>(() => getPageName());
  const CurrentPage = page.includes('dialog') ? pages.dialog : pages.default;

  useEffect(() => {
    const handleHashChange = () => {
      setPage(getPageName());
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return <main>{CurrentPage}</main>;
};
