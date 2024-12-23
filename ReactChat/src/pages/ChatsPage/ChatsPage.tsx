import { Chat } from 'ReactChat/src/entities/Chat';
import { NewChatButton } from 'ReactChat/src/shared';
import { ShowUpdates } from 'ReactChat/src/widgets';

import { ChatsHeader } from './ui';
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
