import { SettingsRounded } from '@mui/icons-material';
import { Chat } from '@/entities/Chat';
import { ActionsMenu, NewChatButton, TEXTS } from '@/shared';
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
    handleClickSettings,
    handleCloseShowUpdates,
    handleIsShowMenuChange
  } = useChatsPage();

  return (
    <>
      <ActionsMenu
        isShow={isShowMenu}
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
      <section>
        <ChatsHeader
          username={userInfo?.first_name}
          onMenuClick={handleIsShowMenuChange}
          isMenuOpen={isShowMenu}
        />
        {chatIds.map((chatId) => (
          <Chat chatId={chatId} key={chatId} />
        ))}
        <NewChatButton />
      </section>
      {isShowUpdates && (
        <ShowUpdates
          isVisible={isShowUpdates}
          onVisibleChange={handleCloseShowUpdates}
        />
      )}
    </>
  );
};
