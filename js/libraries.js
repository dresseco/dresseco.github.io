const libraries = [
  {
    type: "js",
    url: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js",
    integrity:
      "sha512-Sct/LCTfkoqr7upmX9VZKEzXuRk5YulFoDTunGapYJdlCwA+Rl4RhgcPCLf7awTNLmIVrszTPNUFu4MSesep5Q==",
    crossorigin: "anonymous",
  },
  {
    type: "css",
    url: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css",
    integrity:
      "sha512-72OVeAaPeV8n3BdZj7hOkaPSEk/uwpDkaGyP4W2jSzAC8tfiO4LMEDWoL3uFp5mcZu+8Eehb4GhZWFwvrss69Q==",
    crossorigin: "anonymous",
  },
  {
    type: "css",
    url: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css",
    integrity:
      "sha512-c0+vSv9tnGS4fzwTIBFPcdCZ0QwP+aTePvZeAJkYpbj67KvQ5+VrJjDh3lil48LILJxhICQf66dQ8t/BJyOo/g==",
    crossorigin: "anonymous",
  },
  {
    type: "css",
    url: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
    integrity:
      "sha512-c42qTSw/wPZ3/5LBzD+Bw5f7bSF2oxou6wEb+I/lqeaKV5FDIfMvvRp772y4jcJLKuGUOpbJMdg/BTl50fJYAw==",
    crossorigin: "anonymous",
  },
];

function loadLibraries() {
  const head = document.getElementsByTagName("head")[0];
  for (let i = 0; i < libraries.length; i++) {
    const library = libraries[i];
    let element;
    if (library.type === "css") {
      element = document.createElement("link");
      element.type = "text/css";
      element.rel = "stylesheet";
      element.href = library.url;
    } else if (library.type === "js") {
      element = document.createElement("script");
      element.type = "text/javascript";
      element.src = library.url;
      element.integrity = library.integrity;
      element.crossOrigin = library.crossorigin;
      element.defer = true;
    } else {
      console.error(`Invalid library: ${library.type}`);
      continue;
    }
    element.onload = function () {
      console.log(`Successfully loaded ${library.url}`);
    };
    element.onerror = function () {
      console.error(`Failed to load ${library.url}`);
    };
    head.appendChild(element);
  }
}

loadLibraries();
