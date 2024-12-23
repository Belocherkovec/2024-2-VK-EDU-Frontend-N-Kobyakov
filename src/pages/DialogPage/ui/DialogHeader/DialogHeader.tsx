import { ConfirmDialog, Header, HeaderThemes, UserInfo } from '@/features';
import { ActionsMenu, BackButton, RoutePaths, TEXTS } from '@/shared';
import { DeleteRounded, MoreVertRounded } from '@mui/icons-material';

import { useDialogHeader } from './hooks';
import styles from './dialogHeader.module.scss';
import cn from 'classnames';

export const DialogHeader: React.FC<{
  avatar: null | string;
  className?: string;
  title: string;
  isOnline?: boolean;
  lastOnline?: string;
}> = ({ avatar, className, title, lastOnline, isOnline }) => {
  const {
    isShowActions,
    isConfirmVisible,
    toggleShowActions,
    handleConfirmDeleteChat,
    handleIsConfirmVisibleChange
  } = useDialogHeader();

  return (
    <>
      <ConfirmDialog
        confirmTitle={TEXTS.pages.dialogPage.removeChat}
        confirmText={TEXTS.pages.dialogPage.removeChatMessage}
        isVisible={isConfirmVisible}
        onClose={handleIsConfirmVisibleChange}
        onConfirm={handleConfirmDeleteChat}
      />
      <Header
        centerNode={
          <UserInfo
            avatar={avatar}
            title={title}
            lastOnline={lastOnline}
            isOnline={isOnline}
          />
        }
        className={className}
        leftNode={<BackButton to={RoutePaths.chatsPage} isReplace />}
        rightNode={
          <button
            onClick={toggleShowActions}
            className={cn(
              styles.actionsMenu__button,
              isShowActions && styles._active
            )}
          >
            <MoreVertRounded />
          </button>
        }
        theme={HeaderThemes.WHITE}
      />
      <ActionsMenu
        isShow={isShowActions}
        changeShow={toggleShowActions}
        className={styles.actionsMenu}
      >
        <button onClick={handleIsConfirmVisibleChange}>
          <DeleteRounded />
          {TEXTS.pages.dialogPage.removeChat}
        </button>
      </ActionsMenu>
    </>
  );
};
