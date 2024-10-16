import styles from './ChatMenuHeader.module.css';

export class ChatMenuHeader extends HTMLElement {
  #searchButton;
  #backButton;
  #searchInput;
  #ChatListNode;
  #headerUsername;
  #isSearchMode = false;
  inputRequestDelay;

  constructor() {
    super();
    this.handleChangeIsSearch = this.handleChangeIsSearch.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  addEventListeners() {
    if (this.#searchButton) {
      this.#searchButton.addEventListener('click', this.handleChangeIsSearch);
    }

    if (this.#backButton) {
      this.#backButton.addEventListener('click', this.handleChangeIsSearch);
    }

    if (this.#searchInput) {
      this.#searchInput.addEventListener('keyup', this.handleSearch);
      this.#searchInput.addEventListener('enter', this.preventDefault);
    }
  }

  removeEventListeners() {
    if (this.#searchButton) {
      this.#searchButton.removeEventListener(
        'click',
        this.handleChangeIsSearch,
      );
    }

    if (this.#backButton) {
      this.#backButton.removeEventListener('click', this.handleChangeIsSearch);
    }

    if (this.#searchInput) {
      this.#searchInput.removeEventListener('keyup', this.handleSearch);
      this.#searchInput.removeEventListener('enter', this.preventDefault);
    }
  }

  handleChangeIsSearch() {
    this.#isSearchMode = !this.#isSearchMode;

    sessionStorage.removeItem('chat');

    this.render();

    if (this.#ChatListNode) {
      this.#ChatListNode.partialRerender();
    }
  }

  handleSearch() {
    if (this.inputRequestDelay) {
      clearTimeout(this.inputRequestDelay);
    }

    this.inputRequestDelay = setTimeout(() => {
      const chatData = JSON.parse(localStorage.getItem('chat'));
      const searchChatData = {};

      for (const id in chatData) {
        if (
          chatData[id].userName
            .trim()
            .toLowerCase()
            .includes(this.#searchInput.value.trim().toLowerCase())
        ) {
          searchChatData[id] = chatData[id];
        }
      }

      sessionStorage.setItem('chat', JSON.stringify(searchChatData));

      if (this.#ChatListNode) {
        this.#ChatListNode.partialRerender();
      }
    }, 500);
  }

  preventDefault(event) {
    event.preventDefault();
  }

  render() {
    this.removeEventListeners();

    this.shadowRoot.innerHTML = this.getHtml();
    this.#searchButton = this.shadowRoot.querySelector('#button-search');
    this.#backButton = this.shadowRoot.querySelector('#button-back');
    this.#searchInput = this.shadowRoot.querySelector('#input-search');
    this.#ChatListNode = document.querySelector('chats-menu');
    this.#headerUsername = this.shadowRoot.querySelector('.header__username');
    this.addEventListeners();

    // add animate after render
    if (this.#searchInput) {
      setTimeout(() => {
        this.#searchInput.classList.add('header__search-input_animate');
      }, 0);
    }

    // add animate after render
    if (this.#backButton) {
      setTimeout(() => {
        this.#backButton.classList.add('button-back_animate');
      }, 0);
    }

    if (this.#headerUsername) {
      setTimeout(() => {
        this.#headerUsername.classList.add('header__username_animate');
      }, 0);
    }
  }

  getHeaderContent() {
    if (!this.#isSearchMode) {
      return `
        <button class="header__button button-menu">
          <span class="material-symbols-rounded">menu</span>
        </button>
        <h1 class="header__username"><slot></slot></h1>
        <button class="header__button button-search" id="button-search">
          <span class="material-symbols-rounded">search</span>
        </button>
        `;
    }

    return `
      <button class="header__button button-back" id="button-back">
        <span class="material-symbols-rounded">arrow_back_ios_new</span>
      </button>
      <input placeholder="Поиск..." class="header__search-input" id="input-search" />
      `;
  }

  getHtml() {
    return `
      <link 
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0" 
      />
      <style>${styles}</style>
      <div class="header">
        ${this.getHeaderContent()}
      </div>
    `;
  }
}
