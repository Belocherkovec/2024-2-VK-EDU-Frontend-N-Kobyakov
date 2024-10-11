import { USERNAME } from '@consts/userName';
import { ChatsList } from '@features/ChatsList';
import { templateChatsData } from '@features/ChatsList';
import { Dialog } from '@features/Dialog';
import '@icons/favicon.ico';
import '@public/index.css';

if (!customElements.get('chat-dialog')) {
  customElements.define('chat-dialog', Dialog);
}

if (!customElements.get('chats-menu')) {
  customElements.define('chats-menu', ChatsList);
}

const root = document.querySelector('#root');
const chatList = document.createElement('chats-menu');

chatList.setAttribute('username', USERNAME);
root.replaceWith(chatList);

if (!localStorage.getItem('chat')) {
  localStorage.setItem('chat', JSON.stringify(templateChatsData));
  chatList.render();
}
