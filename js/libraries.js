//global - Library loader to avoid adding too many script tags per HTML file/page head
const libraries = [
  {
    type: "js",
    url: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js",
    integrity:
      "sha512-Sct/LCTfkoqr7upmX9VZKEzXuRk5YulFoDTunGapYJdlCwA+Rl4RhgcPCLf7awTNLmIVrszTPNUFu4MSesep5Q==",
    crossorigin: "anonymous",
    defer: true,
  },
  {
    type: "js",
    url: "https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.7/handlebars.min.js",
    integrity:
      "sha512-RNLkV3d+aLtfcpEyFG8jRbnWHxUqVZozacROI4J2F1sTaDqo1dPQYs01OMi1t1w9Y2FdbSCDSQ2ZVdAC8bzgAg==",
    crossorigin: "anonymous",
    defer: true,
  },
  {
    type: "js",
    url: "https://cdn.jsdelivr.net/npm/sweetalert2@11",
    integrity:
      "sha512-2JsZvEefv9GpLmJNnSW3w/hYlXEdvCCfDc+Rv7ExMFHV9JNlJ2jaM+uVVlCI1MAQMkUG8K83LhsHYx1Fr2+MuA==",
    crossorigin: "anonymous",
    defer: true,
  },
  {
    type: "js",
    //url: "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit", DEPRECATED, a lot of delay
    url: "/js/element.js?cb=googleTranslateElementInit",
  },
  {
    type: "css",
    url: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css",
    integrity:
      "sha512-72OVeAaPeV8n3BdZj7hOkaPSEk/uwpDkaGyP4W2jSzAC8tfiO4LMEDWoL3uFp5mcZu+8Eehb4GhZWFwvrss69Q==",
    crossorigin: "anonymous",
    defer: true,
  },
  {
    type: "css",
    url: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css",
    integrity:
      "sha512-c0+vSv9tnGS4fzwTIBFPcdCZ0QwP+aTePvZeAJkYpbj67KvQ5+VrJjDh3lil48LILJxhICQf66dQ8t/BJyOo/g==",
    crossorigin: "anonymous",
    defer: true,
  },
];

//Function to load the libraries const with the metadata that we defined before
function loadLibraries(callback) {
  const head = document.getElementsByTagName("head")[0];
  let counter = 0;
  const numLibraries = libraries.length;
  for (let i = 0; i < numLibraries; i++) {
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
      if (library.integrity) {
        element.integrity = library.integrity;
      }
      if (library.crossorigin) {
        element.crossOrigin = library.crossorigin;
      }
      if (library.async) {
        element.async = true;
      } else if (library.defer) {
        element.defer = true;
      }
    } else {
      console.error(`Invalid library: ${library.type}`);
      continue;
    }
    element.onload = function () {
      console.log(`Successfully loaded ${library.url}`);
      counter++;
      if (counter === numLibraries) {
        callback();
      }
    };
    element.onerror = function () {
      console.error(`Failed to load ${library.url}`);
    };

    head.appendChild(element);
  }
}

//SweetAlert2 initialization function and custom modals mixin ("template"):
let dressecoModal;

function swalInit() {
  console.log("SweetAlert2 initialized");
  dressecoModal = Swal.mixin({
    padding: "1rem",
    color: "#fff",
    buttonsStyling: false,
    focusConfirm: false,
    returnFocus: false,
    customClass: {
      container: "dresseco-modal-container",
      popup: "dresseco-modal-popup",
      closeButton: "btn-close",
      htmlContainer: "dresseco-modal-htmlcontainer",
      confirmButton: "dresseco-modal-button btn btn-primary",
      cancelButton: "dresseco-modal-button btn btn-secondary",
    },
  });

  dressecoToast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    buttonsStyling: false,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
    customClass: {
      title: "dresseco-toast-title",
    },
  });
}

//Load the libraries and initialize SweetAlert2
loadLibraries(function () {
  console.log("All libraries have been loaded");
  swalInit();
});
