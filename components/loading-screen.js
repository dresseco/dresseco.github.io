class loadingScreen extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <div id="dresseco-loading-screen">
      <div id="dresseco-loading-screen-spinner" role="status"></div>
    </div>
        `;
  }
}

customElements.define("dresseco-loading-screen", loadingScreen);
