import styles from './MessageInput.module.css';

export class MessageInput extends HTMLElement {
  form;
  input;
  formSendButton;

  #defaultPlaceholder = 'Введите сообщение';
  #errorPlaceholder = 'Сначала вы должны ввести имя';

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
    const messagesList = JSON.parse(localStorage.getItem('messages')) || [];

    if (this.input.value.trim()) {
      messagesList.push({
        author: document.getElementById('userName')?.value,
        text: this.input.value.trim(),
        sendDate: new Date(),
      });
      this.input.value = '';
      this.formSendButton.classList.remove('form__send-button_active');
      localStorage.setItem('messages', JSON.stringify(messagesList));
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

  getHtml() {
    return `
      <style>${styles}</style>
      <form class="form" action="/" autocomplete="off">
        <textarea 
          class="form__input" 
          name="message-text" 
          placeholder="${this.#errorPlaceholder}" 
          rows="1" 
          disabled
        ></textarea>
        <button class="form__send-button">
          <svg class="form__send-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 18.5V13.346L10.846 12L5 10.654V5.5L20.423 12L5 18.5Z"/>
          </svg>
        </button>
      </form>`;
  }
}
