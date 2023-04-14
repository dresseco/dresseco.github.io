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
    html: "<p class='text-center text-dark'>D'ara endavant rebràs novetats sobre nosaltres i el món de la moda al teu correu.</p>",
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
