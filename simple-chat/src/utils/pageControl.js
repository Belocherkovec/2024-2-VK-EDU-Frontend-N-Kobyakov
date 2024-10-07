import { USERNAME } from '@consts/userName';

export function pageControl({ pageName, userId }) {
  const body = document.querySelector('body');
  const [currentPage] = body.children;

  const pages = {
    'CHAT-DIALOG': document.createElement('chat-dialog'),
    'CHATS-MENU': document.createElement('chats-menu'),
  };

  pages['CHATS-MENU'].setAttribute('username', USERNAME);
  pages['CHAT-DIALOG'].setAttribute('userid', userId);

  if (currentPage.tagName !== pageName) {
    currentPage.replaceWith(pages[pageName]);
  }
}
