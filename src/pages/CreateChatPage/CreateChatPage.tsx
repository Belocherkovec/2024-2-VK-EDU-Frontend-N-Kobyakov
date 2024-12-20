import { User } from '@/entities/User';

import { CreateChatHeader } from './ui';
import { useCreateChatPage } from './hooks';

export const CreateChatPage: React.FC = () => {
  const { handleUserClick, usersIds, usersMap } = useCreateChatPage();

  return (
    <section>
      <CreateChatHeader />
      {usersIds.map((id) => (
        <User
          avatar={usersMap[id]?.avatar}
          firstName={usersMap[id]?.first_name}
          key={id}
          lastName={usersMap[id]?.last_name}
          onCLick={handleUserClick}
          userId={id}
          isOnline={usersMap[id]?.is_online}
        />
      ))}
    </section>
  );
};
