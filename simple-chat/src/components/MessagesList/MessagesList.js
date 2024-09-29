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
    }
  }

  #getFormattedDate(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
  }

  hadnleContextClick(event) {
    event.preventDefault();

    const item = event.target.closest('.messages-container__message');

    if (item) {
      this.messageContextIndex = item.getAttribute('data-index');
    } else {
      this.messageContextIndex = null;
    }

    if (this.actions) {
      const screenWidth = window.innerWidth;
      const elementWidth = 142;

      if (event.pageX < screenWidth / 2) {
        this.actions.style.left = `${event.pageX}px`;
      } else {
        this.actions.style.left = `${event.pageX - elementWidth}px`; // Устанавливаем на правую границу
      }

      this.actions.style.top = `${event.pageY}px`;
      this.actions.classList.toggle('actions_active');
    }
  }

  removeMessage() {
    this.messages = [
      ...this.messages.slice(0, this.messageContextIndex),
      ...this.messages.slice(this.messageContextIndex + 1),
    ];
    localStorage.setItem('messages', JSON.stringify(this.messages));
    this.render();
  }

  getHtml() {
    return `
      <style>${styles}</style>
      <ul class="messages-container">
        ${this.messages
          .map(
            (msg, index) => `
          <li data-index="${index}" class="messages-container__message">
          <p class="messages-container__text">${msg.text.replace(/\n/g, '<br>')}</p>
          <span class="messages-container__timestamp">${this.#getFormattedDate(new Date(msg.sendDate))}</span>
          </li>
          `,
          )
          .join('')}
      </ul>
      <div class="actions">
        <button class="actions__elem" data-action="delete" onclick="this.getRootNode().host.removeMessage()">Удалить сообщение</button>
      </div>
    `;
  }

  // disconnectedCallback() {}
}
