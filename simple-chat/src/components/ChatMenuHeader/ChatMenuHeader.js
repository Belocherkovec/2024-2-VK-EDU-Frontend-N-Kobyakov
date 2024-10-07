import styles from './ChatMenuHeader.module.css';

export class ChatMenuHeader extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = this.getHtml();
  }

  getHtml() {
    return `
      <link 
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0" 
      />
      <style>${styles}</style>
      <div class="header">
        <button class="header__button button-menu">
          <span class="material-symbols-rounded">menu</span>
        </button>
        <h1 class="header__username"><slot></slot></h1>
        <button class="header__button button-search">
          <span class="material-symbols-rounded">search</span>
        </button>
      </div>
    `;
  }
}
