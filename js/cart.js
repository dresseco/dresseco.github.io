//Delay function
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

//OK modal that shows up when a product has been added to the cart
function addCartModal() {
  dressecoModal
    .fire({
      title:
        "<p class='text-center fs-3 fw-bold text-dark'>Producte afegit a la cistella</p>",
      icon: "success",
      iconColor: "#20c997",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Anar a la cistella",
      cancelButtonText: "Tanca",
    })
    .then((result) => {
      if (result.isConfirmed) {
        document.location.href = "/cart";
      } else if (result.isDismissed) {
        dressecoModal.close();
      }
    });
}

//Max quantity modal that shows up when a product has reached its max quantity of 20
function maxQuantityModal() {
  dressecoModal.fire({
    title:
      "<p class='text-center fs-3 fw-bold text-dark'>La quantitat màxima per afegir a aquest producte és 20</p>",
    html: "Pots visualitzar la quantitat que ja disposes anant a la <span class='dresseco-link-title text-style-underline'><a href='/cart'>cistella</a></span>.",
    icon: "warning",
    iconColor: "#fd7e14",
    showConfirmButton: true,
    confirmButtonText: "Tanca",
    focusConfirm: true,
  });
}

//SweetAlert2 toast that shows up when a product has been removed from the cart
function productFromCartRemovedToast() {
  dressecoToast.fire({
    title: "Producte eliminat",
    icon: "info",
    iconColor: "#0dcaf0",
    width: "fit-content",
  });
}

//Get the cart JSON data from local storage. If there is no data, initialize the cart as an empty array instead
let cart = JSON.parse(localStorage.getItem("cart")) || [];

//Function to add items to the cart
async function addToCart(
  event,
  productIdElementId,
  productDataElementId,
  sizeSelectorId,
  quantityInputId
) {
  event.preventDefault();

  const eventItemAdded = new CustomEvent("cartItemAdded");
  //Get the product ID from the data-product-id attribute that contains the reference
  let productIdElement = document.getElementById(productIdElementId);
  let productIdValue = productIdElement.dataset.productId;

  //Get the product data from the data-origin-json attribute that contains the path to the product metadata JSON file
  let productDataElement = document.getElementById(productDataElementId);
  let productDataPath = productDataElement.dataset.originJson;
  let response = await fetch(productDataPath);
  let productData = await response.json();

  //Find the index position of the product with its given ID with productIdValue in the products array
  let productIndex = productData.products.findIndex(
    (product) => Object.keys(product)[0] === productIdValue
  );

  //Get the selected size and quantity from inputs on the HTML
  let sizeSelector = document.getElementById(sizeSelectorId);
  let quantityInput = document.getElementById(quantityInputId);
  let selectedIndex = sizeSelector.selectedIndex;
  let size;

  if (selectedIndex > 0) {
    let selectedValue = sizeSelector.options[selectedIndex].value;
    let allIndexString = selectedValue
      .split(".")[1]
      .replace("[", "")
      .replace("]", "");
    let allIndex = parseInt(allIndexString);
    size =
      productData.products[productIndex][productIdValue][0][
        "main-information"
      ][0].sizes[0].all[allIndex];
  } else {
    size = null;
  }

  let quantity = parseInt(quantityInput.value); //Convert quantity to integer

  //Get the product data from the metadata JSON file (3 arrays)
  let productMetadata =
    productData.products[productIndex][productIdValue][0][
      "product-metadata"
    ][0];
  let mainInformation =
    productData.products[productIndex][productIdValue][0][
      "main-information"
    ][0];
  let composition =
    productData.products[productIndex][productIdValue][0]["composition"][0];

  //Check if there's already an item in the cart with the same name and size
  let matchingItem = cart.find(
    (item) => item.name === mainInformation.name && item.size === size
  );

  if (matchingItem && matchingItem.quantity + quantity > 20) {
    //If the item already exists in the cart and the quantity of the new item plus the existing quantity is greater than 20, show a SweetAlert2 warning modal
    maxQuantityModal();
  } else if (matchingItem) {
    //If there is, add the new quantity to the existing quantity
    matchingItem.quantity += quantity;

    //Show the OK modal, which means that the product has been successfully added or updated to the cart
    addCartModal();
  } else {
    //Create an object for the product
    let product = {
      shop: productMetadata.shop,
      id: productMetadata["product-id"],
      dresseco_url: productMetadata["dresseco-url"],
      image_url: productMetadata["images-urls"][0].item,
      name: mainInformation.name,
      price: mainInformation.price,
      size: size,
      quantity: quantity,
      composition: composition,
    };

    //Add the product to the cart
    cart.push(product);

    //Show the OK modal, which means that the product has been successfully added or updated to the cart
    addCartModal();
  }

  //Save the cart to local storage
  localStorage.setItem("cart", JSON.stringify(cart));

  //Trigger the added item event
  document.dispatchEvent(eventItemAdded);
}

//Function to remove an item from the cart
function removeFromCart(index, productIdToRemove) {
  const eventItemRemoved = new CustomEvent("cartItemRemoved");
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));

  //Remove the product card from the cart page
  const productCard = document.getElementById(productIdToRemove);
  if (productCard) {
    productCard.classList.add("fade-out");
    productCard.addEventListener("animationend", function () {
      productCard.style.display = "none";
      productCard.remove();
    });
  }
  productFromCartRemovedToast();
  cartElementsShow();

  //Trigger the removed item event
  document.dispatchEvent(eventItemRemoved);
}

//Function to clear the cart (CLI only)
function clearCart() {
  localStorage.clear(cart);
  cart = [];
  console.log("Cleared the cart");
}

function displayCartCLI() {
  //CLI only
  //Get the cart items from local storage
  let cart = JSON.parse(localStorage.getItem("cart"));

  //Check if the cart is empty
  if (!cart || cart.length === 0) {
    console.log("Your cart is empty");
    return;
  }

  //Loop through the cart items and display them in the console
  for (let item of cart) {
    console.log(`- ${item.name}, ${item.size}, ${item.quantity}`);
  }
}

//Generate unique per product ID for the cart page to avoid problems when deleting products
function generateProductId(product) {
  const { id, size, quantity } = product;
  const generatedId = `${id}-${size}${quantity}` + formattedDate;
  return generatedId;
}

function getTopLeftPixelColor(img) {
  var canvas = document.createElement("canvas"); // Create a canvas element
  var ctx = canvas.getContext("2d"); // Get the canvas context
  canvas.width = img.width; // Set the canvas width to the image width
  canvas.height = img.height; // Set the canvas height to the image height
  ctx.drawImage(img, 0, 0); // Draw the image onto the canvas
  var pixelData = ctx.getImageData(0, 0, 1, 1).data; // Get the pixel data for the top-left pixel
  var r = pixelData[0];
  var g = pixelData[1];
  var b = pixelData[2];
  var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1); // Convert RGB to HEX
  return hex;
}

//Function that prints the items in the cart on the cart.html page
function printCartUI() {
  window.onload = function () {
    cartElementsShow();
    cart.forEach((product) => {
      /*Main*/
      const productsContainer = document.getElementById(
        "dresseco-cart-page-container-data-items"
      );
      productsContainer.style.animationName = "dresseco-cart-animation";

      const productContainer = document.createElement("div");
      productContainer.id = "product-" + generateProductId(product) + "-card";
      productContainer.className = "card mb-3";

      //Set width to 100% if there's just one product in the cart, so it fits better on mobile
      if (cart.length === 1) {
        productContainer.className = "card mb-3 single-item";
        productsContainer.className = "no-x-scrollbar";
      } else {
        productContainer.className = "card mb-3";
        productsContainer.className = "";
      }
      productsContainer.appendChild(productContainer);

      const productContainer2 = document.createElement("div");
      productContainer2.className = "row g-0";
      productContainer.appendChild(productContainer2);

      const productImgContainer = document.createElement("div");
      productImgContainer.id =
        "dresseco-cart-page-container-data-items-card-image-container";
      productImgContainer.className = "rounded-start col-md-4";
      productContainer2.appendChild(productImgContainer);

      const productImg = document.createElement("img");
      productImg.id =
        "dresseco-cart-page-container-data-items-card-image-container-image";
      productImg.src = product.image_url;
      productImg.alt = "Product image";
      productImg.className = "img-fluid";
      productImg.crossOrigin = "anonymous";
      productImgContainer.appendChild(productImg);

      //Change the imgContainer background-color to the background color of the product image, so it fits better on the UI
      productImg.addEventListener("load", function () {
        productImgContainer.style.backgroundColor =
          getTopLeftPixelColor(productImg);
      });

      const productInfoContainer = document.createElement("div");
      productInfoContainer.className = "col-md-8";
      productContainer2.appendChild(productInfoContainer);

      const productInfoContainerBody = document.createElement("div");
      productInfoContainerBody.id =
        "dresseco-cart-page-container-data-items-card-info";
      productInfoContainerBody.className = "card-body";
      productInfoContainer.appendChild(productInfoContainerBody);

      const productInfoNameContainer = document.createElement("div");
      productInfoNameContainer.id =
        "dresseco-cart-page-container-data-items-card-info-name";
      productInfoNameContainer.className = "dresseco-link-title";
      productInfoContainerBody.appendChild(productInfoNameContainer);

      const productInfoNameLink = document.createElement("a");
      productInfoNameLink.href = product.dresseco_url;
      productInfoNameContainer.appendChild(productInfoNameLink);

      const productInfoName = document.createElement("span");
      productInfoName.className =
        "fs-4 fw-bold pe-2 text-decoration-underline card-title";
      productInfoName.textContent = product.name;
      productInfoNameLink.appendChild(productInfoName);

      const productInfoPrice = document.createElement("p");
      productInfoPrice.className = "fs-4";
      productInfoPrice.textContent = product.price;
      productInfoContainerBody.appendChild(productInfoPrice);

      /*Description*/
      const productInfoDescriptionContainer = document.createElement("div");
      productInfoDescriptionContainer.id =
        "dresseco-cart-page-container-data-items-card-info-description";
      productInfoContainerBody.appendChild(productInfoDescriptionContainer);

      const productInfoDescription = document.createElement("ul");
      productInfoDescription.className = "list-unstyled";
      productInfoDescriptionContainer.appendChild(productInfoDescription);

      /*Shop*/
      const productInfoDescriptionShopContainer = document.createElement("li");
      productInfoDescription.appendChild(productInfoDescriptionShopContainer);

      const productInfoDescriptionShop = document.createElement("span");
      productInfoDescriptionShopContainer.appendChild(
        productInfoDescriptionShop
      );

      const productInfoDescriptionShopIcon = document.createElement("i");
      productInfoDescriptionShopIcon.className = "bi bi-shop pe-2";
      productInfoDescriptionShop.appendChild(productInfoDescriptionShopIcon);

      const productInfoDescriptionShopLabel = document.createElement("span");
      productInfoDescriptionShopLabel.textContent = "Botiga: ";
      productInfoDescriptionShop.appendChild(productInfoDescriptionShopLabel);

      const productInfoDescriptionShopLabelShop =
        document.createElement("span");
      productInfoDescriptionShopLabelShop.className = "notranslate";
      productInfoDescriptionShopLabelShop.textContent = `${product.shop}`;
      productInfoDescriptionShopLabel.appendChild(
        productInfoDescriptionShopLabelShop
      );

      /*Size*/
      const productInfoDescriptionSizeContainer = document.createElement("li");
      productInfoDescription.appendChild(productInfoDescriptionSizeContainer);

      const productInfoDescriptionSize = document.createElement("span");
      productInfoDescriptionSizeContainer.appendChild(
        productInfoDescriptionSize
      );

      const productInfoDescriptionSizeIcon = document.createElement("i");
      productInfoDescriptionSizeIcon.className = "bi bi-rulers pe-2";
      productInfoDescriptionSize.appendChild(productInfoDescriptionSizeIcon);

      const productInfoDescriptionSizeLabel = document.createElement("span");
      productInfoDescriptionSizeLabel.textContent = `Mida: ${product.size}`;
      productInfoDescriptionSize.appendChild(productInfoDescriptionSizeLabel);

      /*Quantity*/
      const productInfoDescriptionQuantityContainer =
        document.createElement("li");
      productInfoDescription.appendChild(
        productInfoDescriptionQuantityContainer
      );

      const productInfoDescriptionQuantity = document.createElement("span");
      productInfoDescriptionQuantityContainer.appendChild(
        productInfoDescriptionQuantity
      );

      const productInfoDescriptionQuantityIcon = document.createElement("i");
      productInfoDescriptionQuantityIcon.className = "bi bi-box pe-2";
      productInfoDescriptionQuantity.appendChild(
        productInfoDescriptionQuantityIcon
      );

      const productInfoDescriptionQuantityLabel =
        document.createElement("span");
      productInfoDescriptionQuantityLabel.textContent = `Quantitat: ${product.quantity}`;
      productInfoDescriptionQuantity.appendChild(
        productInfoDescriptionQuantityLabel
      );

      /*Composition*/
      /*const productInfoDescriptionCompositionContainer =
        document.createElement("li");
      productInfoDescriptionCompositionContainer.className = "dresseco-link";
      productInfoDescription.appendChild(
        productInfoDescriptionCompositionContainer
      );

      const productInfoDescriptionComposition = document.createElement("a");
      productInfoDescriptionComposition.href = `${product.dresseco_url}#dresseco-product-page-container-product-info-data-additional-information`;
      productInfoDescriptionCompositionContainer.appendChild(
        productInfoDescriptionComposition
      );

      const productInfoDescriptionCompositionIcon = document.createElement("i");
      productInfoDescriptionCompositionIcon.className = "bi bi-layers pe-2";
      productInfoDescriptionComposition.appendChild(
        productInfoDescriptionCompositionIcon
      );

      const productInfoDescriptionCompositionLabel =
        document.createElement("span");
      productInfoDescriptionCompositionLabel.className =
        "text-decoration-underline";
      productInfoDescriptionCompositionLabel.textContent = "Composició";
      productInfoDescriptionComposition.appendChild(
        productInfoDescriptionCompositionLabel
      );*/

      /*Separator*/
      const productInfoSeparator = document.createElement("hr");
      productInfoContainerBody.appendChild(productInfoSeparator);

      /*Remove product button*/
      const productRemoveButton = document.createElement("button");
      productRemoveButton.id =
        "dresseco-cart-page-container-data-items-card-info-remove-btn";
      productRemoveButton.className = "btn btn-link link-danger";
      productRemoveButton.type = "button";
      productRemoveButton.onclick = function () {
        removeFromCart(cart.indexOf(product), productContainer.id);
      };
      productInfoContainerBody.appendChild(productRemoveButton);

      const productRemoveButtonIcon = document.createElement("i");
      productRemoveButtonIcon.className = "bi bi-trash3 pe-2 small";
      productRemoveButton.appendChild(productRemoveButtonIcon);

      const productRemoveButtonLabel = document.createElement("span");
      productRemoveButtonLabel.className = "small";
      productRemoveButtonLabel.textContent = "Eliminar producte";
      productRemoveButton.appendChild(productRemoveButtonLabel);

      productsContainer.innerHTML;
    });
  };
}

//Code that runs when the DOM has finished loading and listens when items have been added or removed to the cart and updates the labels of the cart button as well as the cart title product count. Also sets the prices of the resume section at the cart page
document.addEventListener("DOMContentLoaded", function () {
  const productCountSpan = document.getElementById("cart-product-count");
  const productCountLabelSpan = document.getElementById(
    "cart-product-count-label"
  );
  const updateProductCount = () => {
    const productCount = cart.length;
    productCountSpan.textContent = productCount;
  };
  const updateProductCountLabel = () => {
    const productCount = cart.length;
    if (productCount === 0) {
      productCountLabelSpan.textContent = " productes";
    } else if (productCount === 1) {
      productCountLabelSpan.textContent = " producte";
    } else {
      productCountLabelSpan.textContent = " productes";
    }
  };

  //If only one product on the cart, make it have full width
  function fullWidthSingleItemCart() {
    if (fileName === "cart.html") {
      let productsContainer = document.getElementById(
        "dresseco-cart-page-container-data-items"
      );
      if (cart.length === 1) {
        productsContainer.className =
          "justify-content-center single-item-from-parent no-x-scrollbar";
      } else {
        productsContainer.className = "no-x-scrollbar";
      }
    }
  }

  updateProductCount();
  updateProductCountLabel();
  fullWidthSingleItemCart();

  document.addEventListener("cartItemAdded", () => {
    updateProductCount();
    updateProductCountLabel();
    fullWidthSingleItemCart();
  });
  document.addEventListener("cartItemRemoved", () => {
    updateProductCount();
    updateProductCountLabel();
    fullWidthSingleItemCart();
  });

  //Resume container prices code
  if (fileName === "cart.html") {
    //Set cart title product count value
    const productCountTitle = document.getElementById(
      "dresseco-cart-page-container-title-count"
    );
    const productCountTitleLabel = document.getElementById(
      "dresseco-cart-page-container-title-label"
    );

    const updateProductCount = () => {
      const productCount = cart.length;
      productCountTitle.textContent = productCount;
    };
    const updateProductCountLabel = () => {
      const productCount = cart.length;
      if (productCount === 0) {
        productCountTitleLabel.textContent = " productes";
      } else if (productCount === 1) {
        productCountTitleLabel.textContent = " producte";
      } else {
        productCountTitleLabel.textContent = " productes";
      }
    };
    updateProductCount();
    updateProductCountLabel();
    document.addEventListener("cartItemAdded", () => {
      updateProductCount();
      updateProductCountLabel();
    });
    document.addEventListener("cartItemRemoved", () => {
      updateProductCount();
      updateProductCountLabel();
    });

    //Set prices
    const subtotalValueId = document.getElementById("subtotal-value");
    const shippingValueId = document.getElementById("shipping-value");
    const totalValueId = document.getElementById("total-value");

    function updateResumeContainerPrices() {
      cart.map((product) => ({
        price: product.price,
        quantity: product.quantity,
      }));

      let subtotalValue = cart.reduce((acc, product) => {
        let price = parseFloat(
          product.price.replace("€", "").replace(",", ".")
        );
        return acc + price * product.quantity;
      }, 0);

      let shippingValue = cart.reduce(
        (acc, product) => acc + 1.05 * product.quantity,
        0
      );
      if (shippingValue <= "150 €") {
        shippingValue = shippingValue;
      } else {
        shippingValue = 0;
      }

      let totalValue = subtotalValue + shippingValue;

      subtotalValueId.textContent =
        subtotalValue.toLocaleString("de-DE") + " €";

      if (shippingValue <= "150 €") {
        shippingValueId.textContent =
          shippingValue.toLocaleString("de-DE") + " €";
      } else {
        shippingValueId.textContent = "GRATUÏTA";
      }

      totalValueId.textContent = totalValue.toLocaleString("de-DE") + " €";
    }

    updateResumeContainerPrices();
    document.addEventListener("cartItemRemoved", () => {
      updateResumeContainerPrices();
    });
  }
});

//Modify the page title by the product name
//If the HTML page file name start with "product-", run the code
const fileName = window.location.pathname.split("/").pop();
if (fileName.startsWith("product-")) {
  //Run the code when the DOM content has loaded
  document.addEventListener("DOMContentLoaded", async function () {
    //Get the product ID from the data-product-id attribute that contains the reference
    let productIdElement = document.getElementById("dresseco-product-id");
    let productIdValue = productIdElement.dataset.productId;

    //Get the product data from the data-origin-json attribute that contains the path to the product metadata JSON file
    let productDataElement = document.getElementById(
      "dresseco-product-data-path"
    );
    let productDataPath = productDataElement.dataset.originJson;
    let response = await fetch(productDataPath);
    let productData = await response.json();

    //Find the index position of the product with its given ID with productIdValue in the products array
    let productIndex = productData.products.findIndex(
      (product) => Object.keys(product)[0] === productIdValue
    );

    //Get the product data and name from the metadata JSON file
    let mainInformation =
      productData.products[productIndex][productIdValue][0][
        "main-information"
      ][0];
    let productNameTitle = mainInformation["name"];

    //Modify the page title
    document.title = productNameTitle + " | Dresseco";
  });
}

//Code that prints the data of the cart array into the cart page
if (fileName === "cart.html") {
  printCartUI();
  window.scrollTo(0, 0);

  //Code to reload the page every time the user leaves and returns, so the cart gets updated on time
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
      window.location.reload();
    }
  });
}

//Function that shows the emptyCart text and image if there are no products on the cart
function cartElementsShow() {
  const emptyCart = document.getElementById(
    "dresseco-cart-page-container-empty"
  );
  const cartResume = document.getElementById(
    "dresseco-cart-page-container-data-resume"
  );

  if (cart.length === 0) {
    emptyCart.className = "visible";
    emptyCart.style.animationName = "dresseco-cart-empty-animation";
    cartResume.className = "d-none";
  } else {
    emptyCart.classList.add("d-none");
    emptyCart.classList.add("invisible");
    emptyCart.classList.remove("visible");
    cartResume.style.animationName = "dresseco-cart-animation";
    cartResume.className = "";
  }
}

//Code that replaces the checkout button text and icon by a "think" text and icon
if (fileName === "cart.html") {
  let button = document.querySelector(
    "#dresseco-cart-page-container-data-resume-checkout-button"
  );
  let icon = document.querySelector(
    "#dresseco-cart-page-container-data-resume-checkout-button-icon"
  );
  let label = document.querySelector(
    "#dresseco-cart-page-container-data-resume-checkout-button-label"
  );

  button.addEventListener("mouseenter", function () {
    icon.className = "bi bi-arrow-clockwise pe-2";
    label.textContent = "Reflexionar";
  });

  button.addEventListener("mouseleave", function () {
    icon.className = "bi bi-credit-card-fill pe-2";
    label.textContent = "Procedir al pagament";
  });
}

function goToCheckout() {
  window.location.href = "/checkout";
}

//Function to print the data from the cart page (total price and composition) into the checkout page
function dataCheckout() {
  //Get/calculate the total price (again)
  cart.map((product) => ({
    price: product.price,
    quantity: product.quantity,
  }));

  let subtotalValue = cart.reduce((acc, product) => {
    let price = parseFloat(product.price.replace("€", "").replace(",", "."));
    return acc + price * product.quantity;
  }, 0);

  let shippingValue = cart.reduce(
    (acc, product) => acc + 1.05 * product.quantity,
    0
  );
  if (shippingValue <= "150 €") {
    shippingValue = shippingValue;
  } else {
    shippingValue = 0;
  }

  let totalValue = subtotalValue + shippingValue;

  var defPrice = totalValue.toLocaleString("de-DE") + " €";
  var defComposition1 = cart.map((product) => ({
    composition: product.composition,
    quantity: product.quantity,
  }));

  var defPriceContainer = document.getElementById("checkout-stats-defprice");
  var defCompositionContainer = document.getElementById(
    "checkout-stats-defcomposition"
  );

  //Calculate the total used materials values
  const defComposition2 = defComposition1.reduce((sums, product) => {
    Object.entries(product.composition).forEach(([key, value]) => {
      value = parseFloat(
        value.replace(/[ %L]/g, "").replace(".", "").replace(",", ".")
      );
      if (!isNaN(value)) {
        value *= product.quantity;
        sums[key] = (sums[key] || 0) + value;
      }
    });
    return sums;
  }, {});

  //Convert to spanish locale
  Object.keys(defComposition2).forEach((key) => {
    let value = defComposition2[key];
    value = value.toLocaleString("de-DE");
    defComposition2[key] = value;
  });

  //Define the mapping object
  const keyMap = {
    cotton: "de cotó",
    elastane: "d'elastà",
    "fabrication-used-water": "d'aigua",
    linen: "de lli",
    "metallised-fibre": "de fibra metal·litzada",
    nylon: "de niló",
    polyester: "de polièster",
  };

  //Build the string by concatenating all the key-value pairs
  const entries = Object.entries(defComposition2);
  const lastIndex = entries.length - 1;
  const text = entries
    .map(([key, value], index) => {
      const displayName = keyMap[key] || key;
      let suffix = key === "fabrication-used-water" ? " L" : " %";
      let prefix = index === lastIndex ? "i " : "";
      let separator = index === lastIndex ? "" : ", ";
      return `${prefix}<span class="text-decoration-underline">${value}${suffix}</span> ${displayName}`;
    })
    .join(", ")
    .replace(/, i/, " i");

  //Append the data to its container
  defCompositionContainer.innerHTML = text;
  defPriceContainer.textContent = defPrice;
}

if (fileName === "checkout.html") {
  window.onload = function () {
    let productCountSpan = document.getElementById("cart-product-count");
    let productCountLabelSpan = document.getElementById(
      "cart-product-count-label"
    );
    let checkoutStats = document.getElementById("checkout-stats");
    if (cart.length === 0) {
      checkoutStats.textContent =
        "Has de 'pagar' algun producte per tal de poder veure estadístiques aquí";
    } else {
      checkoutStats.innerHTML =
        "Per <span id='checkout-stats-defprice'></span> en roba gastats, has consumit: <span id='checkout-stats-defcomposition'></span>";
      dataCheckout();
      delay(3000);
      clearCart();
      productCountSpan.textContent = "0 ";
      productCountLabelSpan.textContent = "productes";
    }
  };
}
