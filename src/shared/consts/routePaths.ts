export const PublicPaths = {
  authPage: '/auth',
  registrationPage: '/registration'
};

export const RoutePaths = {
  ...PublicPaths,
  chatsPage: '/chats',
  createChatPage: '/chats/create',
  dialogPage: '/dialog/:chatId',
  editProfilePage: '/profile/edit/:profileId',
  initial: '/',
  main: '',
  notFound: '*'
};
