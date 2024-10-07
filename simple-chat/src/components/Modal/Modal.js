export class Modal extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = this.getHtml();
  }

  getHtml() {
    return `
      <div class="modal">
        <button class="modal__close">
          <span class="material-symbols-rounded">close</span>
        </button>
      </div>
    `;
  }
}
