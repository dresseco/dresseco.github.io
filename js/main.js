//loading-screen.js - dresseco-loading-screen fading out, JS code:
window.addEventListener("load", function () {
  setTimeout(function () {
    const loadingScreen = document.getElementById("dresseco-loading-screen");
    loadingScreen.style.opacity = "0";
    window.scrollTo(0, 0);
    setTimeout(function () {
      loadingScreen.style.display = "none";
      document.documentElement.style.overflow = "visible";
    }, 500);
  }, 500);
});
