import { MessageInput } from '@components/MessageInput';
import { MessagesList } from '@components/MessagesList';
import { PersonChatHeader } from '@components/PersonChatHeader';

import styles from './Dialog.module.css';

export class Dialog extends HTMLElement {
  #userId;
  #userData;

  static get observedAttributes() {
    return ['userid'];
  }

  connectedCallback() {
    if (!customElements.get('messages-list')) {
      customElements.define('messages-list', MessagesList);
    }

    if (!customElements.get('message-input')) {
      customElements.define('message-input', MessageInput);
    }

    if (!customElements.get('chat-header')) {
      customElements.define('chat-header', PersonChatHeader);
    }

    this.render();
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === 'userid') {
      this.#userId = newValue;
      this.#userData = JSON.parse(localStorage.getItem('chat'))[this.#userId];
    }
  }

  render() {
    this.innerHTML = this.getHtml();
  }

  getHtml() {
    return `
      <style>${styles}</style>
      <chat-header userid=${this.#userId}></chat-header>
      <messages-list userid=${this.#userId}></messages-list>
      <message-input userid=${this.#userId}></message-input>
    `;
  }
}
