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
    html: "<p class='text-center text-dark'>D'ara endavant rebràs novetats sobre nosaltres i el món de la moda al teu correu.</p><p id='newsletter-modal-disclaimer' class='text-center text-muted fst-italic'>Subscripció fictícia.</p>",
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
      <input class="form-check-input" type="checkbox" value="" id="check2">
      <label class="form-check-label" for="check2">Tots els drets reservats. Cap part d’aquest treball pot ser reproduïda o transmesa sense el permís escrit a <span class='dresseco-link-title text-style-underline'><a href="mailto:fastfashiontrcdmsc@proton.me">fastfashiontrcdmsc@proton.me</a></span></label>
  </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="check3">
            <label class="form-check-label" for="check3">Les marques comercials i registrades que apareixen en aquest treball són propietat dels seus respectius propietaris.</label>
        </div>
        <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="check1">
        <label class="form-check-label" for="check1">Les opinions expressades en aquest treball són dels autors (Fast Fashion TR CDMSC).</label>
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
        link.href = "/assets/documents/"; //File path
        link.download = "PR ESO4 22-23 DM EL FENOMEN DEL FAST FASHION.pdf"; //File name
        downloadStartedToast();
        link.click();
      }
    });

  const checkStatus = () => {
    let check1 = document.getElementById("check1").checked;
    let check2 = document.getElementById("check2").checked;
    let check3 = document.getElementById("check3").checked;

    if (check1 && check2 && check3) {
      Swal.getConfirmButton().disabled = false;
    } else {
      Swal.getConfirmButton().disabled = true;
    }
  };

  document.getElementById("check1").addEventListener("change", checkStatus);
  document.getElementById("check2").addEventListener("change", checkStatus);
  document.getElementById("check3").addEventListener("change", checkStatus);

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
if (fileName2 === "checkout.html") {
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
if (fileName2 === "checkout.html") {
  document.addEventListener("DOMContentLoaded", function () {
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
