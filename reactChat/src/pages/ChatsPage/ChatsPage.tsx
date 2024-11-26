import { Chat } from '@/entities/Chat';
import { NewChatButton } from '@/shared';
import { ChatsHeader, ShowUpdates } from '@/widgets';

import { useChatsPage } from './hooks/useChatsPage';

export const ChatsPage = () => {
  const { chatIds, handleCloseShowUpdates, isShowUpdates, userInfo } =
    useChatsPage();

  return (
    <>
      <section>
        <ChatsHeader username={userInfo?.first_name} />
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
