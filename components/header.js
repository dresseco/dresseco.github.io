class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <nav
    id="dresseco-header-navbar"
    class="navbar navbar-expand-lg sticky-top dresseco-header-navbar-blur"
  >
    <div class="container-fluid">
      <div id="dresseco-header-navbar-brand">
        <a href="/">
          <img
            src="/assets/images/dresseco-logo.png"
            alt="Dresseco, S.L."
            title="Dresseco, S.L."
            class="img-fluid"
          />
        </a>
      </div>
      <div id="dresseco-header-navbar-action-buttons" class="order-lg-1">
        <div id="dresseco-header-navbar-action-buttons-main">
          <button
            id="dresseco-header-navbar-action-buttons-main-language"
            class="btn btn-outline-primary dropdown dropdown-toggle"
            type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false"
          >
            <div id="dresseco-header-navbar-action-buttons-main-language-dropdown" class="dropdown-menu">
            <span class="fw-bold dropdown-header"
            >Selecciona el teu idioma:</span
          >
            <div id="google_translate_element"></div>
            </div>
            <i class="bi bi-globe"></i>
          </button>
          <button class="btn btn-outline-primary ms-1" type="button" onclick="document.location.href='/cart.html'">
            <i class="bi bi-cart-fill pe-2"></i><span id="cart-product-count"></span><span id="cart-product-count-label"></span>
          </button>
          <button
            id="dresseco-header-navbar-action-buttons-main-collapse"
            class="btn btn-outline-primary ms-1"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="bi bi-list"></i>
          </button>
        </div>
      </div>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <hr id="dresseco-header-navbar-separator" />
        <ul id="dresseco-header-navbar-pages" class="navbar-nav me-auto mb-lg-0">
          <li class="nav-item">
            <a
              id="dresseco-header-navbar-pages-home"
              class="nav-link mx-3"
              href="/"
              ><i class="bi bi-house-fill pe-2"></i
              ><span class="fw-bold">Inici</span></a
            >
          </li>
          <li class="nav-item">
            <a
              id="dresseco-header-navbar-pages-catalogue"
              class="nav-link mx-3"
              href="/catalogue.html"
              ><i class="bi bi-bag-fill pe-2"></i
              ><span class="fw-bold">Catàleg</span>
            </a>
          </li>
        </ul>
        <div class="me-1">
          <form class="d-flex" role="search" name="user-search-input" method="POST" data-netlify="true">
            <div class="input-group">
              <div class="form-floating">
                <input
                  type="search"
                  class="form-control me-2"
                  id="floatingInput"
                  placeholder="Search"
                  aria-label="Search"
                  name="input"
                  required
                />
                <label for="floatingInput">Cerca</label>
              </div>
              <button
                class="btn btn-outline-primary dresseco-button"
                type="submit"
              >
                <i class="bi bi-search"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </nav>
      `;
  }
}

customElements.define("dresseco-header", Header);
