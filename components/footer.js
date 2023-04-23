class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <footer class="bg-light">
    <div id="dresseco-footer-container" class="container py-5">
      <div id="dresseco-footer-container-metadata" class="row">
        <div id="dresseco-footer-container-metadata-about-us" class="col-md-3">
          <a href="/" target="_blank"
            ><img
              src="/assets/images/dresseco-logo.png"
              alt="Dresseco, S.L."
              title="Dresseco, S.L."
              class="img-fluid"
          /></a>
          <p>
            Establerts a Barcelona, som una distribuïdora de moda de
            qualitat.
          </p>
        </div>
        <div
          id="dresseco-footer-container-metadata-links"
          class="col-md-3 dresseco-link"
        >
          <nav>
            <ul class="list-group list-unstyled list-inline mt-3">
              <li class="list-inline-item me-3">
                <span class="fs-5 fw-bold">Enllaços</span>
              </li>
              <li class="list-inline-item me-3">
                <a href="/index.html">Inici</a>
              </li>
              <li class="list-inline-item me-3">
                <a href="/catalogue.html">Catàleg</a>
              </li>
            </ul>
          </nav>
        </div>
        <div
          id="dresseco-footer-container-metadata-newsletter"
          class="col-md-6 mt-3"
        >
          <div>
            <span class="fs-5 fw-bold">Subscriu-te al nostre butlletí</span>
            <p>No t'oblidis de cap novetat sobre nosaltres i el món de la moda.</p>
            <form
              id="dresseco-footer-container-metadata-newsletter-form"
              class="mb-1"
              onsubmit="newsletterThanksModal(event); clearFormInput(
                'dresseco-footer-container-metadata-newsletter-form')"
            >
              <div class="input-group">
                <div class="form-floating">
                  <input
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="E-mail"
                    required
                  />
                  <label for="floatingInput">E-mail</label>
                </div>
                <button
                  type="submit"
                  class="btn btn-primary"
                >
                <i class="bi bi-envelope-plus-fill pe-2"></i><span>Subscriure-m'hi</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  
      <div id="dresseco-footer-container-bottom" class="position-relative">
        <hr />
        <div
          id="dresseco-footer-container-bottom-social-media"
          class="dresseco-link"
        >
          <ul class="list-unstyled list-inline mb-0">
            <li class="list-inline-item me-3">
              <a href="mailto:fastfashiontrcdmsc@proton.me"
                ><i class="bi bi-envelope-fill" title="E-mail"></i
              ></a>
            </li>
            <li class="list-inline-item me-3">
            <a href="https://www.github.com/dresseco" target="_blank"
              ><i class="bi bi-github" title="GitHub"></i
            ></a>
          </li>
            <li class="list-inline-item me-3">
              <a href="https://www.instagram.com/dressecoo" target="_blank"
                ><i class="bi bi-instagram" title="Instagram"></i
              ></a>
            </li>
            <li class="list-inline-item me-3">
            <a href="https://www.tiktok.com/@dressecoo" target="_blank"
              ><i class="bi bi-tiktok" title="TikTok"></i
            ></a>
          </li>
            <li class="list-inline-item">
              <a href="https://www.twitter.com/dresseco" target="_blank"
                ><i class="bi bi-twitter" title="Twitter"></i
              ></a>
            </li>
          </ul>
        </div>
        <div
          id="dresseco-footer-container-bottom-disclaimer"
          class="text-md-start position-absolute top-1 start-0"
        >
          <span class="mb-1 small text-black notranslate">&copy; 2023 Dresseco, S.L.</span>
          <p class="mb-1 small text-black">Totes els logotips i productes són propietat de les seves respectives marques, amb les quals<span translate="no"> Dresseco </span>no n'està associat.</p>
          <p class="mb-1 small text-muted">
            El codi font d'aquest lloc web està disponible a
            <span class="dresseco-link-muted text-style-underline"
              ><a
                href="https://www.github.com/dresseco/dresseco.github.io"
                target="_blank" translate="no"
                >GitHub</a
              ></span
            >
            sota la licència <span class="notranslate">MIT</span>.
          </p>
        </div>
      </div>
    </div>
  </footer>
        `;
  }
}

customElements.define("dresseco-footer", Footer);
