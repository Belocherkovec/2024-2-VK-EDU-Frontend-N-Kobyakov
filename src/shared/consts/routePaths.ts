export const PublicPaths = {
  authPage: '/auth',
  registrationPage: '/registration'
};

export const RoutePaths = {
  ...PublicPaths,
  chatsPage: '/chats',
  createChatPage: '/chats/create',
  dialogPage: '/dialog/:chatId',
  ProfilePage: '/profile/:profileId',
  editProfilePage: '/profile/edit',
  initial: '/',
  main: '',
  notFound: '*'
};
