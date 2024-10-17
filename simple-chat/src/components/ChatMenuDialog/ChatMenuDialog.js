import {
  dayFormatter,
  monthFormatter,
  timeFormatter,
  yearFormatter,
} from '@consts/formatters';
import { STATUS_DRAFT, STATUS_READ, STATUS_SEND } from '@consts/messageStatus';
import { USERNAME } from '@consts/userName';
import { pageControl } from '@utils/pageControl';

import styles from './ChatMenuDialog.module.css';

export class ChatMenuDialog extends HTMLElement {
  #userId;
  #dialogData;
  #lastMessage;
  container;

  static get observedAttributes() {
    return ['userid'];
  }

  constructor() {
    super();
    this.hadnleClick = this.hadnleClick.bind(this);
  }

  get userId() {
    return this.#userId;
  }

  set userId(newValue) {
    this.#userId = newValue;
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === 'userid') {
      this.userId = newValue;
    }
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  addEventListeners() {
    if (this.container) {
      this.container.addEventListener('click', this.hadnleClick);
    }
  }

  removeEventListeners() {
    if (this.container) {
      this.container.removeEventListener('click', this.hadnleClick);
    }
  }

  render() {
    this.#dialogData = JSON.parse(localStorage.getItem('chat'))[this.userId];
    this.#lastMessage = this.#dialogData.messages.at(-1);

    this.removeEventListeners();
    this.shadowRoot.innerHTML = this.getHtml();
    this.container = this.shadowRoot.querySelector('.dialog');

    this.addEventListeners();
  }

  hadnleClick() {
    pageControl({
      pageName: 'CHAT-DIALOG',
      userId: this.userId,
    });
  }

  #getFormattedDate(date) {
    const now = new Date();
    const dateDay = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const formattedTime = timeFormatter.format(date);
    const formattedDay = dayFormatter.format(date);
    const formattedMonth = monthFormatter.format(date);
    const formattedYear = yearFormatter.format(date);

    let result;

    if (
      dateDay === now.getDate() &&
      month === now.getMonth() &&
      year === now.getFullYear()
    ) {
      result = `${formattedTime}`;
    } else if (month === now.getMonth() && year === now.getFullYear()) {
      result = `${formattedTime} ${formattedDay}`;
    } else if (year === now.getFullYear()) {
      result = `${formattedMonth}`;
    } else {
      result = `${formattedYear}`;
    }

    return result;
  }

  #getCheckMark() {
    const { author } = this.#lastMessage;
    const messageStatus = this.#lastMessage.status;

    const unreadMessage = this.#dialogData.messages.filter(
      (msg) => msg.author !== USERNAME && msg.status === STATUS_SEND,
    ).length;

    let statusIcon;
    let result;

    switch (messageStatus) {
      case STATUS_DRAFT:
        statusIcon = '';
        break;
      case STATUS_READ:
        statusIcon = 'done_all';
        break;
      case STATUS_SEND:
        statusIcon = 'check';
        break;
    }

    if (author === USERNAME) {
      result = `<span class="material-symbols-rounded">${statusIcon}</span>`;
    } else {
      result = unreadMessage
        ? `<p class="dialog__unread">${unreadMessage}</p>`
        : ``;
    }

    return result;
  }

  getHtml() {
    return `
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0"
      />
      <style>${styles}</style>
      <div class="dialog">
        <img src="${this.#dialogData.avatar}" class="dialog__avatar loading" alt="изображение пользователя" onload="this.classList.remove('loading')" />
        <div class="dialog__user">
          <h2 class="dialog__username">${this.#dialogData.userName}</h2>
          <p class="dialog__last-message">${this.#lastMessage?.text || ''}</p>
        </div>
        <div class="dialog__info">
          <p class="dialog__last-message-time">${this.#lastMessage ? this.#getFormattedDate(new Date(this.#lastMessage?.sendDate)) : ''}</p>
          <p class="dialog__check-mark">
            ${this.#lastMessage ? this.#getCheckMark() : ''}
          </p>
        </div>
      </div>
    `;
  }
}
