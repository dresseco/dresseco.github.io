class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <footer class="bg-light">
    <div id="dresseco-footer-container" class="container py-4">
      <div id="dresseco-footer-metadata" class="row">
        <div id="dresseco-footer-metadata-about-us" class="col-md-3">
          <img
            src="/assets/images/dresseco-logo.png"
            alt="Dresseco, S.L."
            class="img-fluid"
          />
          <p>
            Establerts a Barcelona, som una firma de moda sostenible i de
            qualitat.
          </p>
        </div>
        <div id="dresseco-footer-metadata-links" class="col-md-3 dresseco-link">
          <nav>
            <ul class="list-group list-unstyled list-inline mt-3">
              <li class="list-inline-item me-3">
                <h5>Enllaços</h5>
              </li>
              <li class="list-inline-item me-3">
                <a href="https://dresseco.github.io">Inici</a>
              </li>
              <li class="list-inline-item me-3">
                <a href="https://dresseco.github.io/catalogue">Catàleg</a>
              </li>
            </ul>
          </nav>
        </div>
        <div id="dresseco-footer-metadata-newsletter" class="col-md-6 mt-3">
          <div>
            <h5>Subscriu-te al nostre butlletí</h5>
            <p>No et perdis cap novetat sobre el món de la moda sostenible.</p>
            <form class="mb-1">
              <div class="input-group">
                <div class="form-floating">
                  <input
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="john.doe@email.com"
                  />
                  <label for="floatingInput">E-mail</label>
                </div>
                <button type="submit" class="btn btn-primary">
                  Subscriure-m'hi
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="position-relative pb-5">
        <hr style="border-top: 1px solid black" />
        <div id="dresseco-footer-social-media" class="dresseco-link">
          <ul class="list-unstyled list-inline mb-0">
            <li class="list-inline-item me-3">
              <a href="mailto:fastfashiontrcdmsc@proton.me"
                ><i class="bi bi-envelope-fill"></i
              ></a>
            </li>
            <li class="list-inline-item me-3">
              <a href="https://www.instagram.com/dressecoo" target="_blank"
                ><i class="bi bi-instagram"></i
              ></a>
            </li>
            <li class="list-inline-item me-3">
              <a href="https://twitter.com/dresseco" target="_blank"
                ><i class="bi bi-twitter"></i
              ></a>
            </li>
            <li class="list-inline-item me-3">
              <a href="https://www.tiktok.com/@dressecoo" target="_blank"
                ><i class="bi bi-tiktok"></i
              ></a>
            </li>
            <li class="list-inline-item">
              <a href="https://github.com/dresseco" target="_blank"
                ><i class="bi bi-github"></i
              ></a>
            </li>
          </ul>
        </div>
        <div
          id="dresseco-footer-disclaimer"
          class="text-md-start position-absolute top-1 start-0"
        >
          <p class="mb-1 small text-black">&copy; 2023 Dresseco, S.L.</p>
          <p class="mb-1 small text-muted">
            El codi font d'aquest lloc web està disponible a
            <span class="dresseco-link-muted"
              ><a
                href="https://github.com/dresseco/dresseco.github.io"
                target="_blank"
                >GitHub</a
              ></span
            >
            sota la licència MIT.
          </p>
        </div>
      </div>
    </div>
  </footer>
        `;
  }
}

customElements.define("dresseco-footer", Footer);
