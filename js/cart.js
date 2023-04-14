//hook to print as html the additem metadata (got) in cart.html (function?)

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
        document.location.href = "/cart.html";
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
    text: "Actualment tens** $(product.quantity)/20",
    icon: "warning",
    iconColor: "#fd7e14",
    showConfirmButton: true,
    confirmButtonText: "Tanca",
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
  const eventItemAdded = new CustomEvent("cartItemAdded");
  event.preventDefault();

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
      //id: productMetadata["product-id"],
      dresseco_url: productMetadata["dresseco-url"],
      image_url: productMetadata["images-urls"][0].item,
      name: mainInformation.name,
      price: mainInformation.price,
      size: size,
      quantity: quantity,
      //composition: composition,
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
function removeFromCart(index) {
  const eventItemRemoved = new CustomEvent("cartItemRemoved");
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));

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
    console.log("Your cart is empty.");
    return;
  }

  //Loop through the cart items and display them in the console
  for (let item of cart) {
    console.log(`- ${item.name}, ${item.size}, ${item.quantity}`);
  }
}

//Function that prints the items in the cart on the cart.html page
function printCartUI() {
  cart.forEach((product) => {
    /*Main*/
    const productsContainer = document.getElementById(
      "dresseco-cart-page-container-items"
    );

    const productContainer = document.createElement("div");
    productContainer.className = "card mb-3";
    productsContainer.appendChild(productContainer);

    const productContainer2 = document.createElement("div");
    productContainer2.className = "row g-0";
    productContainer.appendChild(productContainer2);

    const productImgContainer = document.createElement("div");
    productImgContainer.className = "col-md-4";
    productContainer2.appendChild(productImgContainer);

    const productImg = document.createElement("img");
    productImg.src = product.image_url;
    productImg.alt = "Product image";
    productImg.className = "rounded-start img-fluid";
    productImgContainer.appendChild(productImg);

    const productInfoContainer = document.createElement("div");
    productInfoContainer.className = "col-md-8";
    productContainer2.appendChild(productInfoContainer);

    const productInfoContainerBody = document.createElement("div");
    productInfoContainerBody.className = "card-body";
    productInfoContainer.appendChild(productInfoContainerBody);

    const productInfoNameContainer = document.createElement("div");
    productInfoNameContainer.id =
      "dresseco-cart-page-container-items-item-name";
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
    productInfoPrice.className = "fs-4 fw-bold";
    productInfoPrice.textContent = product.price;
    productInfoContainerBody.appendChild(productInfoPrice);

    /*Description*/
    const productInfoDescriptionContainer = document.createElement("div");
    productInfoDescriptionContainer.id =
      "dresseco-cart-page-container-items-item-description";
    productInfoContainerBody.appendChild(productInfoDescriptionContainer);

    const productInfoDescription = document.createElement("ul");
    productInfoDescription.className = "list-unstyled";
    productInfoDescriptionContainer.appendChild(productInfoDescription);

    /*Shop*/
    const productInfoDescriptionShopContainer = document.createElement("li");
    productInfoDescription.appendChild(productInfoDescriptionShopContainer);

    const productInfoDescriptionShop = document.createElement("span");
    productInfoDescriptionShopContainer.appendChild(productInfoDescriptionShop);

    const productInfoDescriptionShopIcon = document.createElement("i");
    productInfoDescriptionShopIcon.className = "bi bi-shop pe-2";
    productInfoDescriptionShop.appendChild(productInfoDescriptionShopIcon);

    const productInfoDescriptionShopLabel = document.createElement("span");
    productInfoDescriptionShopLabel.textContent = `Botiga: ${product.shop}`;
    productInfoDescriptionShop.appendChild(productInfoDescriptionShopLabel);

    /*Size*/
    const productInfoDescriptionSizeContainer = document.createElement("li");
    productInfoDescription.appendChild(productInfoDescriptionSizeContainer);

    const productInfoDescriptionSize = document.createElement("span");
    productInfoDescriptionSizeContainer.appendChild(productInfoDescriptionSize);

    const productInfoDescriptionSizeIcon = document.createElement("i");
    productInfoDescriptionSizeIcon.className = "bi bi-rulers pe-2";
    productInfoDescriptionSize.appendChild(productInfoDescriptionSizeIcon);

    const productInfoDescriptionSizeLabel = document.createElement("span");
    productInfoDescriptionSizeLabel.textContent = `Mida: ${product.size}`;
    productInfoDescriptionSize.appendChild(productInfoDescriptionSizeLabel);

    /*Quantity*/
    const productInfoDescriptionQuantityContainer =
      document.createElement("li");
    productInfoDescription.appendChild(productInfoDescriptionQuantityContainer);

    const productInfoDescriptionQuantity = document.createElement("span");
    productInfoDescriptionQuantityContainer.appendChild(
      productInfoDescriptionQuantity
    );

    const productInfoDescriptionQuantityIcon = document.createElement("i");
    productInfoDescriptionQuantityIcon.className = "bi bi-box pe-2";
    productInfoDescriptionQuantity.appendChild(
      productInfoDescriptionQuantityIcon
    );

    const productInfoDescriptionQuantityLabel = document.createElement("span");
    productInfoDescriptionQuantityLabel.textContent = `Quantitat: ${product.quantity}`;
    productInfoDescriptionQuantity.appendChild(
      productInfoDescriptionQuantityLabel
    );

    /*Composition*/
    const productInfoDescriptionCompositionContainer =
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
    );

    /*Remove product button*/
    const productRemoveButton = document.createElement("button");
    productRemoveButton.id =
      "dresseco-cart-page-container-items-item-remove-btn";
    productRemoveButton.className = "btn btn-link link-danger";
    productRemoveButton.type = "button";
    productRemoveButton.onclick = "removeFromCart(cart.indexOf(product))";
    productInfoContainerBody.appendChild(productRemoveButton);

    const productRemoveButtonIcon = document.createElement("i");
    productRemoveButtonIcon.className = "bi bi-trash3 pe-2 small";
    productRemoveButton.appendChild(productRemoveButtonIcon);

    const productRemoveButtonLabel = document.createElement("span");
    productRemoveButtonLabel.className = "small";
    productRemoveButtonLabel.textContent = "Eliminar";
    productRemoveButton.appendChild(productRemoveButtonLabel);

    productsContainer.innerHTML;
  });
}

//Event that runs when the DOM has finished loading and listens when items have been added or removed to the cart and updates the labels of the cart button
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

if (fileName === "cart.html") {
  printCartUI();
}
