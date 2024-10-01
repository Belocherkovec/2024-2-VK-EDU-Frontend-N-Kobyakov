import { MessagesList } from './components/MessagesList';
import { MessageInput } from './components/MessageInput';
import './img/avatar.jpg';
import './index.css';

customElements.define('messages-list', MessagesList);
customElements.define('message-input', MessageInput);

const messageInput = document.querySelector('message-input');
const messagesList = document.querySelector('messages-list');

const userInput = document.getElementById('userName');

userInput.addEventListener('input', handleInputUser);

function handleInputUser() {
  if (!userInput.value.trim()) {
    messageInput.lockInput();
  } else {
    messageInput.unLockInput();
  }

  messagesList.render();
}
