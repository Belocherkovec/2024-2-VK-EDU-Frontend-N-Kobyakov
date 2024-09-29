import styles from './MessageInput.module.css';

export class MessageInput extends HTMLElement {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.removeEventListeners();
    this.shadowRoot.innerHTML = this.getHtml();
    this.addEventListeners();
  }

  addEventListeners() {
    const form = this.shadowRoot.querySelector('.form');

    if (form) {
      form.addEventListener('submit', this.handleSubmit);
      form.addEventListener('keypress', this.handleKeyPress);
    }
  }

  removeEventListeners() {
    const form = this.shadowRoot.querySelector('.form');

    if (form) {
      form.removeEventListener('submit', this.handleSubmit);
      form.removeEventListener('keypress', this.handleKeyPress);
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const input = this.shadowRoot.querySelector('.form__input');
    const messageComponent = document.querySelector('messages-list');
    const messagesList = JSON.parse(localStorage.getItem('messages')) || [];

    if (input.value) {
      messagesList.push({
        author: 'Nikolai Kobiakov',
        sendDate: new Date(),
        text: input.value,
      });
      input.value = '';
      localStorage.setItem('messages', JSON.stringify(messagesList));
    }

    if (messageComponent) {
      messageComponent.render();
    }
  }

  handleKeyPress(event) {
    const form = this.shadowRoot.querySelector('.form');

    if (!event.shiftKey && event.keyCode === 13) {
      event.preventDefault();
      form.dispatchEvent(new Event('submit'));
    }
  }

  getHtml() {
    return `
      <style>${styles}</style>
      <form class="form" action="/" autocomplete="off">
        <textarea class="form__input" name="message-text" placeholder="Введите сообщение" rows="1"></textarea>
        <button class="form__send-button">
          <svg class="form__send-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 18.5V13.346L10.846 12L5 10.654V5.5L20.423 12L5 18.5Z"/>
          </svg>
        </button>
      </form>`;
  }
}
