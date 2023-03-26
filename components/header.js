class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <nav
      id="dresseco-header-navbar"
      class="navbar navbar-expand-lg sticky-top bg-light"
    >
      <div class="container-fluid">
      <div id="dresseco-header-navbar-brand">
        <a "class="navbar-brand" href="https://dresseco.github.io/">
          <img
            src="/assets/images/dresseco-logo.png"
            alt="Dresseco, S.L."
            class="img-fluid"
          />
        </a>
        </div>
        <div id="dresseco-header-navbar-action-buttons-main" class="order-lg-1">
          <div id="dresseco-header-navbar-action-buttons">
            <button
              class="btn btn-outline-primary ms-1 dropdown dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <ul class="dropdown-menu">
                <li>
                  <h6 class="dropdown-header">Selecciona el teu idioma:</h6>
                </li>
                <li>
                  <a class="dropdown-item" href="#"
                    ><span class="pe-2">🇦🇩</span>Català</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="#"
                    ><span class="pe-2">🇪🇸</span>Español</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="#"
                    ><span class="pe-2">🇬🇧</span>English</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="#"
                    ><span class="pe-2">🇫🇷</span>Français</a
                  >
                </li>
              </ul>
              <i class="bi bi-globe"></i>
            </button>
            <button class="btn btn-outline-primary ms-1" type="button">
              <i class="bi bi-cart-fill pe-2"></i><span>0 productes</span>
            </button>
            <button
              id="dresseco-header-navbar-action-buttons-collapse"
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
          <hr />
          <ul
            id="dresseco-header-navbar-pages"
            class="navbar-nav me-auto mb-2 mb-lg-0"
          >
            <li class="nav-item">
              <a
                id="dresseco-header-navbar-pages-home"
                class="nav-link mx-3"
                href="https://dresseco.github.io/"
                ><i class="bi bi-house-fill pe-2"></i><span class="fw-bold">Inici</span></a
              >
            </li>
            <li class="nav-item">
              <a
                id="dresseco-header-navbar-pages-catalogue"
                class="nav-link mx-3"
                href="https://dresseco.github.io/catalogue/"
                ><i class="bi bi-bag-fill pe-2"></i><span class="fw-bold">Catàleg</span>
              </a>
            </li>
          </ul>
          <div class="me-1">
          <form class="d-flex" role="search">
          <div class="input-group">
            <div class="form-floating">
              <input
                type="search"
                class="form-control me-2"
                id="floatingInput"
                placeholder="Search"
                aria-label="Search"
              />
              <label for="floatingInput">Cerca</label>
            </div>
            <button class="btn btn-outline-primary dresseco-button" type="submit">
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
