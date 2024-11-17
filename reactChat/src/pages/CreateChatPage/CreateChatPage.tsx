import { User } from '@/entities/User';
import { CreateChatHeader } from '@/widgets';

import { useCreateChatPage } from './hooks/useCreateChatPage';

export const CreateChatPage: React.FC = () => {
  const { handleUserClick, usersIds, usersMap } = useCreateChatPage();

  return (
    <section>
      <CreateChatHeader />
      {usersIds.map((id) => (
        <User
          avatar={usersMap[id].avatar}
          firstName={usersMap[id].first_name}
          key={id}
          lastName={usersMap[id].last_name}
          onCLick={handleUserClick}
          userId={id}
        />
      ))}
    </section>
  );
};
