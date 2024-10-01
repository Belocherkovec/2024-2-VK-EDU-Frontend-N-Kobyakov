import styles from './MessagesList.module.css';

export class MessagesList extends HTMLElement {
  container;
  messages;
  actions;
  messageContextIndex;

  constructor() {
    super();
    this.handleMessageMouseDown = this.handleMessageMouseDown.bind(this);
    this.hadnleContextClick = this.hadnleContextClick.bind(this);
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.messages = JSON.parse(localStorage.getItem('messages')) || [];

    this.removeEventListeners();
    this.shadowRoot.innerHTML = this.getHtml();

    this.container = this.shadowRoot.querySelector('.messages-container');
    this.actions = this.shadowRoot.querySelector('.actions');

    this.addEventListeners();
  }

  addEventListeners() {
    if (this.container) {
      this.container.addEventListener('contextmenu', this.hadnleContextClick);
      this.container.addEventListener('mousedown', this.handleMessageMouseDown);
    }
  }

  removeEventListeners() {
    if (this.container) {
      this.container.removeEventListener(
        'contextmenu',
        this.hadnleContextClick,
      );
      this.container.removeEventListener(
        'mousedown',
        this.handleMessageMouseDown,
      );
    }
  }

  handleMessageMouseDown(event) {
    if (
      event.button !== 2 &&
      this.actions.classList.contains('actions_active')
    ) {
      this.actions.classList.remove('actions_active');
      this.messageContextIndex = null;
    }
  }

  hadnleContextClick(event) {
    event.preventDefault();

    const item = event.target.closest('.messages-container__message');

    const isActionsMenuShow = this.actions.classList.contains('actions_active');

    if (item && !isActionsMenuShow) {
      this.messageContextIndex = +item.getAttribute('data-index');
      this.renderActionsMenu(event);
    } else {
      this.messageContextIndex = null;
      this.actions.classList.remove('actions_active');
    }
  }

  renderActionsMenu(event) {
    const screenWidth = window.innerWidth;
    const elementWidth = 142;

    if (event.pageX < screenWidth / 2) {
      this.actions.style.left = `${event.pageX}px`;
    } else {
      this.actions.style.left = `${event.pageX - elementWidth}px`;
    }

    this.actions.style.top = `${event.pageY}px`;
    this.actions.classList.add('actions_active');
  }

  removeMessage() {
    this.messages = [
      ...this.messages.slice(0, this.messageContextIndex),
      ...this.messages.slice(this.messageContextIndex + 1),
    ];
    localStorage.setItem('messages', JSON.stringify(this.messages));
    this.render();
  }

  #getFormattedDate(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
  }

  #getMessage(msg, index) {
    let messageClasses;

    if (
      msg.author.trim() === document.getElementById('userName')?.value.trim()
    ) {
      messageClasses =
        'messages-container__message messages-container__message';
    } else {
      messageClasses =
        'messages-container__message messages-container__message_user';
    }

    return `
      <li data-index="${index}" class="${messageClasses}">
        <h6 class="messages-container__author">${msg.author.trim()}</h6>
        <p class="messages-container__text">${msg.text.replace(/\n/g, '<br>')}</p>
        <span class="messages-container__timestamp">${this.#getFormattedDate(new Date(msg.sendDate))}</span>
      </li>
      `;
  }

  getHtml() {
    return `
      <style>${styles}</style>
      <ul class="messages-container">
        ${this.messages.map((msg, index) => this.#getMessage(msg, index)).join('')}
      </ul>
      <div class="actions">
        <button class="actions__elem" data-action="delete" onclick="this.getRootNode().host.removeMessage()">Удалить сообщение</button>
      </div>
    `;
  }
}
