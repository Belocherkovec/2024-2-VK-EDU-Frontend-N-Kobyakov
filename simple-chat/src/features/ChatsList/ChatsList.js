import { ChatMenuDialog } from '@components/ChatMenuDialog';
import { ChatMenuHeader } from '@components/ChatMenuHeader';
import { CreateNewChatButton } from '@components/CreateNewChatButton';

export class ChatsList extends HTMLElement {
  #userName;
  chatData;

  static get observedAttributes() {
    return ['username'];
  }

  set name(newName) {
    this.#userName = newName;
  }

  get name() {
    return this.#userName;
  }

  connectedCallback() {
    if (!customElements.get('chatmenu-header')) {
      customElements.define('chatmenu-header', ChatMenuHeader);
    }

    if (!customElements.get('create-chat-button')) {
      customElements.define('create-chat-button', CreateNewChatButton);
    }

    if (!customElements.get('chatmenu-dialog')) {
      customElements.define('chatmenu-dialog', ChatMenuDialog);
    }

    this.render();
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === 'username') {
      this.userName = newValue;
    }
  }

  render() {
    this.chatData =
      JSON.parse(sessionStorage.getItem('chat')) ||
      JSON.parse(localStorage.getItem('chat')) ||
      [];
    this.innerHTML = this.getHtml();
  }

  partialRerender() {
    this.chatData =
      JSON.parse(sessionStorage.getItem('chat')) ||
      JSON.parse(localStorage.getItem('chat')) ||
      [];
    document.querySelector('.chats').innerHTML = Object.keys(this.chatData)
      .map((key) => `<chatmenu-dialog userid="${key}"></chatmenu-dialog>`)
      .join('');
  }

  getHtml() {
    return `
      <chatmenu-header>${this.userName}</chatmenu-header>
      <div class="chats">
        ${Object.keys(this.chatData)
          .map((key) => `<chatmenu-dialog userid="${key}"></chatmenu-dialog>`)
          .join('')}
      </div>
      <create-chat-button></create-chat-button>
    `;
  }
}
