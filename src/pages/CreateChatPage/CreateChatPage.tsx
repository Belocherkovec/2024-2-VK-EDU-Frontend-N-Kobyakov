import { User } from '@/entities/User';

import { CreateChatHeader } from './ui';
import { useCreateChatPage } from './hooks';
import { Loader } from '@/shared';

export const CreateChatPage: React.FC = () => {
  const { isUsersLoading, handleUserClick, usersIds, usersMap } =
    useCreateChatPage();

  return (
    <section>
      {isUsersLoading && <Loader />}
      <CreateChatHeader />
      {usersIds.map((id) => (
        <User
          key={id}
          userId={id}
          onCLick={handleUserClick}
          username={usersMap[id]?.username}
          avatar={usersMap[id]?.avatar}
          firstName={usersMap[id]?.first_name}
          lastName={usersMap[id]?.last_name}
          isOnline={usersMap[id]?.is_online}
        />
      ))}
    </section>
  );
};
