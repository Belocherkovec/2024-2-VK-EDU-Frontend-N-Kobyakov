import { Store } from '@/app/store';
import { Chat } from '@/features/Chat';
import { USERNAME } from '@/shared/consts';
import { ChatsHeader } from '@/widgets/ChatsHeader';
import { CreateNewChat } from '@/widgets/CreateNewChat';
import { useContext } from 'react';

export const Chats = () => {
  const {
    store: { chat, filter }
  } = useContext(Store);

  return (
    <section>
      <ChatsHeader username={USERNAME} />
      {Object.values(chat)
        .filter((chat) =>
          chat.userName.toLowerCase().includes(filter?.toLowerCase())
        )
        .map((chat) => (
          <Chat key={chat.userId} userId={chat.userId} />
        ))}
      <CreateNewChat />
    </section>
  );
};
