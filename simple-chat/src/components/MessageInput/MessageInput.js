import { STATUS_SEND } from '@consts/messageStatus';
import { USERNAME } from '@consts/userName';

import styles from './MessageInput.module.css';

export class MessageInput extends HTMLElement {
  form;
  input;
  formSendButton;

  #userId;
  #companionName;
  #isInvertAuthor = false;
  #messages;
  #defaultPlaceholder = 'Введите сообщение';
  #errorPlaceholder = 'Сначала вы должны ввести имя';

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  static get observedAttributes() {
    return ['userid'];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    const localStorageChatData = JSON.parse(localStorage.getItem('chat'));

    if (attrName === 'userid') {
      this.#userId = newValue;
      this.#messages = localStorageChatData[this.#userId].messages;
      this.#companionName = localStorageChatData[this.#userId].userName;
    }
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.removeEventListeners();

    this.shadowRoot.innerHTML = this.getHtml();

    this.form = this.shadowRoot.querySelector('.form');
    this.input = this.shadowRoot.querySelector('.form__input');
    this.formSendButton = this.shadowRoot.querySelector('.form__send-button');

    this.addEventListeners();
  }

  addEventListeners() {
    this.form.addEventListener('submit', this.handleSubmit);
    this.form.addEventListener('keypress', this.handleKeyPress);
    this.input.addEventListener('input', this.handleInputChange);
  }

  removeEventListeners() {
    if (this.form && this.input) {
      this.form.removeEventListener('submit', this.handleSubmit);
      this.form.removeEventListener('keypress', this.handleKeyPress);
      this.input.removeEventListener('input', this.handleInputChange);
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const messageComponent = document.querySelector('messages-list');
    const currentChatData = JSON.parse(localStorage.getItem('chat'));

    if (this.input.value.trim()) {
      this.#messages.push({
        author: this.getAuthor(),
        sendDate: new Date(),
        status: STATUS_SEND,
        text: this.input.value.trim(),
      });

      this.input.value = '';
      this.formSendButton.classList.remove('form__send-button_active');

      localStorage.setItem(
        'chat',
        JSON.stringify({
          ...currentChatData,
          [this.#userId]: {
            ...currentChatData[this.#userId],
            messages: this.#messages,
          },
        }),
      );
    }

    if (messageComponent) {
      messageComponent.render();
    }
  }

  handleKeyPress(event) {
    if (!event.shiftKey && event.keyCode === 13) {
      event.preventDefault();
      this.form.dispatchEvent(new Event('submit'));
    }
  }

  handleInputChange() {
    if (this.input.value) {
      this.formSendButton.classList.add('form__send-button_active');
    } else {
      this.formSendButton.classList.remove('form__send-button_active');
    }
  }

  lockInput() {
    this.input.disabled = true;
    this.input.placeholder = this.#errorPlaceholder;
    this.formSendButton.classList.remove('form__send-button_active');
  }

  unLockInput() {
    this.input.disabled = false;
    this.input.placeholder = this.#defaultPlaceholder;
    this.handleInputChange();
  }

  getAuthor() {
    return [USERNAME, this.#companionName][+this.#isInvertAuthor];
  }

  invertAuthor() {
    this.#isInvertAuthor = !this.#isInvertAuthor;
  }

  getHtml() {
    return `
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0" />
      <style>${styles}</style>
      <form class="form" action="/" autocomplete="off">
        <textarea 
          class="form__input" 
          name="message-text" 
          placeholder="${this.#defaultPlaceholder}" 
          rows="1" 
        ></textarea>
        <button class="form__send-button">
          <span class="material-symbols-rounded form__send-icon">
            send
          </span>
        </button>
      </form>`;
  }
}
