import { useChatsPage } from '@/pages/ChatsPage/hooks/useChatsPage';
import { NewChatButton } from '@/shared/components/buttons';
import { USERNAME } from '@/shared/consts';
import { Chat, ChatsHeader, ShowUpdates } from '@/widgets';

export const ChatsPage = () => {
  const { chat, filter, handleCloseShowUpdates, isShowUpdates } =
    useChatsPage();

  return (
    <>
      <section>
        <ChatsHeader username={USERNAME} />
        {Object.values(chat)
          .filter((chat) =>
            chat.fullName.toLowerCase().includes(filter?.toLowerCase())
          )
          .map((chat) => (
            <Chat key={chat.userId} userId={chat.userId} />
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
