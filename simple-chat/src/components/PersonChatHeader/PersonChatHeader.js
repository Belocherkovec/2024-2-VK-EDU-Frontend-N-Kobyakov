import { USERAVATAR, USERNAME } from '@consts/userName';
import { pageControl } from '@utils/pageControl';

import styles from './PersonChatHeader.module.css';

export class PersonChatHeader extends HTMLElement {
  #userId;
  #userName;
  #avatarSrc;
  #isSwapped = false;
  backButton;
  swapButton;

  static get observedAttributes() {
    return ['userid'];
  }

  constructor() {
    super();
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleSwapClick = this.handleSwapClick.bind(this);
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === 'userid') {
      const localStorageChatData = JSON.parse(localStorage.getItem('chat'));

      this.#userId = newValue;
      this.#userName = localStorageChatData[this.#userId].userName;
      this.#avatarSrc = localStorageChatData[this.#userId].avatar;
    }
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  addEventListeners() {
    if (this.backButton) {
      this.backButton.addEventListener('click', this.handleBackClick);
      this.swapButton.addEventListener('click', this.handleSwapClick);
    }
  }

  removeEventListeners() {
    if (this.backButton) {
      this.backButton.removeEventListener('click', this.handleBackClick);
      this.swapButton.removeEventListener('click', this.handleSwapClick);
    }
  }

  render() {
    this.removeEventListeners();

    this.shadowRoot.innerHTML = this.getHtml();
    this.backButton = this.shadowRoot.querySelector('#button-back');
    this.swapButton = this.shadowRoot.querySelector('#button-swap');

    this.addEventListeners();
  }

  handleBackClick() {
    pageControl({ pageName: 'CHATS-MENU' });
  }

  handleSwapClick() {
    const messagesList = document.querySelector('messages-list');
    const messageInput = document.querySelector('message-input');

    if (messagesList) {
      messagesList.invertUsers();
    }

    if (messageInput) {
      messageInput.invertAuthor();
    }

    this.#isSwapped = !this.#isSwapped;
    this.render();
  }

  getAvatar() {
    return [this.#avatarSrc, USERAVATAR][+this.#isSwapped];
  }

  getUserName() {
    return [this.#userName, USERNAME][+this.#isSwapped];
  }

  getHtml() {
    return `
      <link rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0" />
      <style>${styles}</style>
      <header class="header">
        <button class="button" id="button-back">
          <span class="material-symbols-rounded">
            arrow_back_ios_new
          </span>
        </button>
        <div class="user">
          <img src="${this.getAvatar()}" alt="Аватар пользователя" class="user__avatar">
          <div class="user__name-container">
            <p class="user__name">${this.getUserName()}</p>
            <p class="user__last-online">был недавно</p>
          </div>
        </div>
        <button class="button" id="button-swap"><span class="material-symbols-rounded">more_vert</span></button>
      </header>
    `;
  }
}
