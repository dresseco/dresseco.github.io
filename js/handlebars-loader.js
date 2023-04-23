//product.html - dresseco-product-page JSON parser and Handlebars template loader into HTML, JS code
//Function to fetch JSON file data and load it into the Handlebars compiler as Handlebars code for then load it into the HTML
function loadTemplate(templateId, targetId, jsonData) {
  window.onload = function () {
    fetch(jsonData)
      .then((response) => response.json())
      .then((data) => {
        if (typeof Handlebars === "undefined") {
          console.error("Handlebars not loaded");
          return;
        }

        //Register the "inArray" custom helper to look if a key value is inside an array
        Handlebars.registerHelper("inArray", function (value, array, options) {
          if (array.includes(value)) {
            return options.fn(this);
          } else {
            return options.inverse(this);
          }
        });

        //Register the "json" custom helper to print values in a readable format
        Handlebars.registerHelper("json", function (context) {
          return JSON.stringify(context)
            .replace(/[\{\}\"]/g, "")
            .replace(/:/g, ": ");
        });

        //Compile the Handlebars template
        const template = Handlebars.compile(
          document.getElementById(templateId).innerHTML
        );
        const html = template(data);
        const target = document.getElementById(targetId);
        if (target) {
          target.innerHTML = html;
          window.scrollTo(0, 0);
          console.log("Handlebars template loaded");
        } else {
          console.error("Target element not found");
        }
      })
      .catch((error) => console.error(error));
  };
}

//Constants for e-commerces product metadata JSON files
const canda = "/data/e-commerces/canda.json";
const hm = "/data/e-commerces/hm.json";
const reebok = "/data/e-commerces/reebok.json";
const tnf = "/data/e-commerces/tnf.json";
const uniqlo = "/data/e-commerces/uniqlo.json";
const zara = "/data/e-commerces/zara.json";
