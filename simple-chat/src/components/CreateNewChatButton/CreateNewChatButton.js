import { generator } from '@utils/avatarGenerator';

import styles from './CreateNewChatButton.module.css';

export class CreateNewChatButton extends HTMLElement {
  button;

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.removeEventListeners();

    this.shadowRoot.innerHTML = this.getHtml();
    this.button = this.shadowRoot.querySelector('#button-create-chat');

    this.addEventListeners();
  }

  addEventListeners() {
    if (this.button) {
      this.button.addEventListener('click', this.handleClickNewChatButton);
    }
  }

  removeEventListeners() {
    if (this.button) {
      this.button.removeEventListener('click', this.handleClickNewChatButton);
    }
  }

  handleClickNewChatButton() {
    const newUserName = prompt('Введите имя пользователя для нового диалога');
    const localStorageChatData = JSON.parse(localStorage.getItem('chat'));
    const lastChatId = Object.keys(localStorageChatData).length;
    const chatsMenuComponent = document.querySelector('chats-menu');

    if (newUserName.trim()) {
      localStorageChatData[lastChatId + 1] = {
        avatar: generator.generateRandomAvatar(),
        messages: [],
        userName: newUserName.trim(),
      };

      localStorage.setItem('chat', JSON.stringify(localStorageChatData));

      if (chatsMenuComponent) {
        chatsMenuComponent.render();
      }
    }
  }

  getHtml() {
    return `
      <link 
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0" 
      />
      <style>${styles}</style>
      <button class="new-chat-button" id="button-create-chat">
        <span class="material-symbols-rounded">add</span>
      </button>
    `;
  }
}
