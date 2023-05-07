//loading-screen.js - dresseco-loading-screen fading out, JS code
//Wait for the DOM content to load
document.addEventListener("DOMContentLoaded", function () {
  //Set a timeout to delay the start of the fade-out animation
  setTimeout(function () {
    //Get the loading screen element
    const loadingScreen = document.getElementById("dresseco-loading-screen");
    //Set the opacity of the loading screen to 0 to start the fade-out animation
    loadingScreen.style.opacity = "0";
    //Scroll to the top of the page
    window.scrollTo(0, 0);
    //Set a timeout to delay hiding the loading screen until after the fade-out animation has completed
    setTimeout(function () {
      //Hide the loading screen
      loadingScreen.style.display = "none";
      //Allow scrolling on the page
      document.documentElement.style.overflow = "visible";
    }, 500);
  }, 500);
});

//product.html - code to show a thanks modal when clicking the subscribe button in the newsletter section on the footer
function newsletterThanksModal(event) {
  event.preventDefault();
  dressecoModal.fire({
    title:
      "<p class='text-center fs-3 fw-bold text-dark'>Gràcies per subscriure't!</p>",
    html: "<p class='text-center text-dark'>D'ara endavant rebràs novetats sobre nosaltres i el món de la moda al teu correu.</p><p id='newsletter-modal-disclaimer' class='text-center text-muted fst-italic'>Subscripció fictícia</p>",
    icon: "success",
    iconColor: "#20c997",
    showConfirmButton: true,
    confirmButtonText: "Tanca",
  });
}

//Function to clear input of form
function clearFormInput(targetId) {
  var form = document.getElementById(targetId);
  form.reset();
}

//Code to get the current date in the format yyyyMMddHHmmss (yes, literally)
let currentDate = new Date();
let year = currentDate.getFullYear();
let month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
let date = currentDate.getDate();
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
let seconds = currentDate.getSeconds();

let formattedDate = `${year}${month}${date}${hours}${minutes}${seconds}`;

//Function to embed the Google Translate widget into an element with an specific ID (i18n)
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "ca",
    },
    "google_translate_element"
  );
}

//AJAX modal form about legal terms of downloading the research paper memory
function downloadPaperMemoryModal() {
  //event.preventDefault();
  dressecoModal
    .fire({
      title:
        "<p class='text-center fs-3 fw-bold text-dark'>Baixada de la memòria</p>",
      html: `
      <form>
      <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="check1">
      <label class="form-check-label" for="check1">Tots els drets reservats. Cap part d'aquest projecte pot ser reproduïda o transmesa sense el permís escrit a <span class='dresseco-link-title fst-underline'><a href="mailto:fastfashiontrcdmsc@proton.me">fastfashiontrcdmsc@proton.me</a></span></label>
  </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="check2">
            <label class="form-check-label" for="check2">Les marques comercials registrades que apareixen en aquest projecte són propietat dels seus respectius propietaris i no estan associades amb els autors.</label>
        </div>
    </form>`,
      icon: "info",
      iconColor: "#0dcaf0",
      showConfirmButton: true,
      confirmButtonText:
        "<i class='bi bi-file-earmark-pdf-fill pe-2'></i><span>Memòria (PDF)</span>",
      focusConfirm: true,
      showCloseButton: true,
      closeButtonHtml: "",
      preConfirm: () => {
        //Code to run when the confirm button is clicked and before the modal is closed
      },
    })
    .then((result) => {
      if (result.isConfirmed) {
        //Code to run when the confirm button is clicked after the modal has been closed and the result of the user’s action has been resolved
        //Download file from specified path
        let link = document.createElement("a");
        link.href =
          "/assets/documents/PR ESO4 22-23 DM EL FENOMEN DEL FAST FASHION.pdf"; //File path
        link.download = "PR ESO4 22-23 DM EL FENOMEN DEL FAST FASHION.pdf"; //File name
        downloadStartedToast();
        link.click();
      }
    });

  const checkStatus = () => {
    let check1 = document.getElementById("check1").checked;
    let check2 = document.getElementById("check2").checked;

    if (check1 && check2) {
      Swal.getConfirmButton().disabled = false;
    } else {
      Swal.getConfirmButton().disabled = true;
    }
  };

  document.getElementById("check1").addEventListener("change", checkStatus);
  document.getElementById("check2").addEventListener("change", checkStatus);

  Swal.getConfirmButton().disabled = true;
}

//SweetAlert2 toast that shows up when the download of the research paper memory has started
function downloadStartedToast() {
  dressecoToast.fire({
    title: "La baixada començarà aviat...",
    icon: "info",
    iconColor: "#0dcaf0",
    width: "fit-content",
  });
}

//Checkout page textarea character counter
const fileName2 = window.location.pathname.split("/").pop();
if (fileName2 === "checkout") {
  document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById(
      "dresseco-checkout-page-container-other-data-reviews-form-textarea"
    );
    const characterCount = document.getElementById(
      "dresseco-checkout-page-container-other-data-reviews-form-character-count"
    );
    characterCount.textContent = "0/2000";

    textarea.addEventListener("input", () => {
      const count = textarea.value.length;
      characterCount.textContent = `${count}/2000`;
    });
  });
}

//Thanks modal when submitting the website review at the checkout page (optional)
function reviewThanksModal(event) {
  event.preventDefault();
  dressecoModal.fire({
    title: "<p class='text-center fs-3 fw-bold text-dark'>Ressenya enviada</p>",
    html: "<p class='text-center text-dark'>Moltes gràcies!",
    icon: "success",
    iconColor: "#20c997",
    showConfirmButton: true,
    confirmButtonText: "Tanca",
  });
}

//Submit the review form at the checkout page with AJAX
if (fileName2 === "checkout") {
  document.addEventListener("DOMContentLoaded", function () {
    const characterCount = document.getElementById(
      "dresseco-checkout-page-container-other-data-reviews-form-character-count"
    );
    const handleSubmit = (event) => {
      event.preventDefault();

      const myForm = event.target;
      const formData = new FormData(myForm);

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      })
        .then(() => {
          reviewThanksModal(event);
          clearFormInput(
            "dresseco-checkout-page-container-other-data-reviews-form-form"
          );
          characterCount.textContent = "0/2000";
        })
        .catch((error) => alert(error));
    };

    document
      .getElementById(
        "dresseco-checkout-page-container-other-data-reviews-form-form"
      )
      .addEventListener("submit", handleSubmit);
  });
}

//Show a warning reload modal when there's data on the statistics span
if (fileName2 === "checkout") {
  let checkoutStats = document.getElementById("checkout-stats");
  var hasUserGesture = false;

  function enableBeforeUnload() {
    hasUserGesture = true;
    window.removeEventListener("scroll", enableBeforeUnload);
    window.removeEventListener("keydown", enableBeforeUnload);
    window.removeEventListener("click", enableBeforeUnload);
  }

  window.addEventListener("scroll", enableBeforeUnload);
  window.addEventListener("keydown", enableBeforeUnload);
  window.addEventListener("click", enableBeforeUnload);

  window.onbeforeunload = function (event) {
    let checkoutStats = document.getElementById("checkout-stats");
    if (
      hasUserGesture &&
      checkoutStats.textContent !==
        "Has de 'pagar' algun producte per tal de poder veure estadístiques aquí"
    ) {
      event.preventDefault();
      event.returnValue = "";
    }
  };
}

//Code that prompts you to install the PWA, if you want
window.addEventListener("beforeinstallprompt", (event) => {
  // Prevent the mini-infobar from appearing on mobile.
  event.preventDefault();
  console.log("beforeinstallprompt", event);
  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;
});

function detectBrowser(userAgent) {
  // The order matters here, and this may report false positives for unlisted browsers.

  if (userAgent.includes("Firefox")) {
    // "Mozilla/5.0 (X11; Linux i686; rv:104.0) Gecko/20100101 Firefox/104.0"
    return "Mozilla Firefox";
  } else if (userAgent.includes("SamsungBrowser")) {
    // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36"
    return "Samsung Internet";
  } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
    // "Mozilla/5.0 (Macintosh; Intel Mac OS X 12_5_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36 OPR/90.0.4480.54"
    return "Opera";
  } else if (userAgent.includes("Edge")) {
    // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
    return "Microsoft Edge (Legacy)";
  } else if (userAgent.includes("Edg")) {
    // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36 Edg/104.0.1293.70"
    return "Microsoft Edge (Chromium)";
  } else if (userAgent.includes("Chrome")) {
    // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
    return "Google Chrome or Chromium";
  } else if (userAgent.includes("Safari")) {
    // "Mozilla/5.0 (iPhone; CPU iPhone OS 15_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Mobile/15E148 Safari/604.1"
    return "Apple Safari";
  } else {
    return "unknown";
  }
}

const browserName = detectBrowser(navigator.userAgent);

//If mobile, run x, else (desktop) run y
if (
  navigator.userAgent.match(/Android/i) ||
  navigator.userAgent.match(/iPhone/i) ||
  navigator.userAgent.match(/iPad/i) ||
  navigator.userAgent.match(/iPod/i) ||
  navigator.userAgent.match(/BlackBerry/i) ||
  navigator.userAgent.match(/Windows Phone/i) ||
  navigator.userAgent.match(/webOS/i)
) {
  //If not Chromium based browser (Firefox, Opera...), don't show PWA advertisement
  if (
    browserName === "Mozilla Firefox" ||
    browserName === "Opera" ||
    browserName === "Microsoft Edge (Legacy)" ||
    browserName === "unknown"
  ) {
    document.addEventListener("DOMContentLoaded", function () {
      const pwaContainer = document.getElementById("dresseco-home-page-pwa");
      const presentationContainer = document.getElementById(
        "dresseco-home-page-presentation"
      );
      pwaContainer.style.display = "none";
      presentationContainer.style.paddingTop = "30%";
    });
  } else {
    //Function for when clicking the link
    if (browserName === "Apple Safari") {
      //If Safari, show custom SweetAlert2 modal with steps of how to install the PWA if you click the link
      dressecoModal.fire({});
    } else if (
      //If Chromium based browser, show native modal prompting you to install the PWA if you click the link
      browserName !== "Mozilla Firefox" &&
      browserName !== "Opera" &&
      browserName !== "Microsoft Edge (Legacy)" &&
      browserName !== "Apple Safari" &&
      browserName !== "unknown"
    ) {
      document.addEventListener("DOMContentLoaded", function () {
        const presentationContainer = document.getElementById(
          "dresseco-home-page-presentation"
        );
        const linkInstallContainer = document.getElementById(
          "dresseco-home-page-pwa"
        );
        const linkInstall = document.getElementById(
          "dresseco-home-page-pwa-text-link"
        );

        linkInstall.addEventListener("click", async () => {
          console.log("linkInstall clicked");
          const promptEvent = window.deferredPrompt;
          if (!promptEvent) {
            // The deferred prompt isn't available.
            return;
          }
          // Show the install prompt.
          promptEvent.prompt();
          // Log the result
          const result = await promptEvent.userChoice;
          console.log("userChoice", result);
          // Reset the deferred prompt variable, since
          // prompt() can only be called once.
          window.deferredPrompt = null;
        });

        window.addEventListener("appinstalled", (event) => {
          console.log("appinstalled", event);
          // Clear the deferredPrompt so it can be garbage collected
          window.deferredPrompt = null;
          // Change the advertisement display property to "none"
          linkInstallContainer.style.display = "none";
          presentationContainer.style.paddingTop = "30%";
        });
      });
    }
  }
} else {
  //Is desktop
  document.addEventListener("DOMContentLoaded", function () {
    const pwaContainer = document.getElementById("dresseco-home-page-pwa");
    const presentationContainer = document.getElementById(
      "dresseco-home-page-presentation"
    );
    pwaContainer.style.display = "none";
    presentationContainer.style.paddingTop = "13%";
    /*
  if (window.matchMedia("screen and (max-width: 767.98px)").matches) {
    presentationContainer.style.paddingTop = "30%"
  }
  */
  });
}

//Handler for when the PWA is already installed
//Check if browser version supports the API
document.addEventListener("DOMContentLoaded", async function () {
  const linkInstallContainer = document.getElementById(
    "dresseco-home-page-pwa"
  );
  const presentationContainer = document.getElementById(
    "dresseco-home-page-presentation"
  );

  if ("getInstalledRelatedApps" in window.navigator) {
    const relatedApps = await navigator.getInstalledRelatedApps();
    relatedApps.forEach((app) => {
      //If your PWA exists in the array it is installed
      console.log(app.platform, app.url);
      // Change the advertisement display property to "none"
      linkInstallContainer.style.display = "none";
      presentationContainer.style.paddingTop = "30%";
    });
  }
});
