import { SettingsRounded } from '@mui/icons-material';
import { Chat } from '@/entities/Chat';
import { ActionsMenu, Loader, NewChatButton, TEXTS } from '@/shared';
import { ShowUpdates } from '@/widgets';

import { ChatsHeader } from './ui';
import { useChatsPage } from './hooks/useChatsPage';
import styles from './chatsPage.module.scss';

export const ChatsPage = () => {
  const {
    chatIds,
    userInfo,
    isShowMenu,
    isShowUpdates,
    isLoadingChats,
    handleClickSettings,
    handleCloseShowUpdates,
    handleIsShowMenuChange
  } = useChatsPage();

  return (
    <section>
      {isLoadingChats && <Loader />}
      <ChatsHeader
        username={userInfo?.first_name}
        onMenuClick={handleIsShowMenuChange}
        isMenuOpen={isShowMenu}
      />
      <ActionsMenu
        isShow={isShowMenu}
        changeShow={handleIsShowMenuChange}
        className={styles.chatsPage__actionsMenu}
      >
        <button
          type="button"
          aria-label={TEXTS.ariaLabels.sendGeo}
          onClick={handleClickSettings}
        >
          <SettingsRounded />
          <span>{TEXTS.pages.chatsPage.settings}</span>
        </button>
      </ActionsMenu>
      {chatIds.map((chatId) => (
        <Chat chatId={chatId} key={chatId} />
      ))}
      <NewChatButton />
      {isShowUpdates && (
        <ShowUpdates
          isVisible={isShowUpdates}
          onVisibleChange={handleCloseShowUpdates}
        />
      )}
    </section>
  );
};
