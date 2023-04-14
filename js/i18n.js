//Function to embed the Google Translate widget into an element with an specific ID
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "ca",
    },
    "google_translate_element"
  );
}

//Inject custom code into the Google Translate select element
window.onload = function () {
  let translateElement = document.getElementById(":0.targetLanguage");
  let selectElement = translateElement.querySelector("select");
  selectElement.classList.add("form-select");
};

let dropdownMenu = document.querySelectorAll(".dropdown-menu");
dropdownMenu.forEach(function (menu) {
  menu.addEventListener("click", function (e) {
    e.stopPropagation();
  });
});
