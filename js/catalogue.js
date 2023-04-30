//Constant for e-commerces product metadata JSON files
const ecommerces = [
  "/data/e-commerces/canda.json",
  "/data/e-commerces/hm.json",
  "/data/e-commerces/reebok.json",
  "/data/e-commerces/tnf.json",
  "/data/e-commerces/uniqlo.json",
  "/data/e-commerces/zara.json",
];

//Fetch the JSON data
let products = [];

async function fetchData(callback) {
  for (let i = 0; i < ecommerces.length; i++) {
    let response = await fetch(ecommerces[i]);
    let productData = await response.json();

    for (let j = 0; j < productData.products.length; j++) {
      let productIdValue = Object.keys(productData.products[j])[0];
      let productMetadata =
        productData.products[j][productIdValue][0]["product-metadata"][0];
      let mainInformation =
        productData.products[j][productIdValue][0]["main-information"][0];

      let product = {
        shop: productMetadata.shop,
        origin_shop_img_url: productData["display-image"],
        id: productMetadata["product-id"],
        dresseco_url: productMetadata["dresseco-url"],
        image_url: productMetadata["images-urls"][0].model,
        name: mainInformation.name,
        price: mainInformation.price,
      };

      products.push(product);
    }
  }
  callback();
}

//Function that prints the items in the cart on the cart.html page
function printCatalogueUI() {
  products.forEach((product) => {
    /*Main*/
    const productsContainer = document.getElementById(
      "dresseco-catalogue-page-container-items"
    );
    productsContainer.style.animationName = "dresseco-catalogue-animation";

    const productsContainerCardContainer = document.createElement("div");
    productsContainerCardContainer.id = "product-" + product.id + "-card";
    productsContainerCardContainer.className = "col mb-3";
    productsContainer.appendChild(productsContainerCardContainer);

    const productsContainerCardContainer2 = document.createElement("div");
    productsContainerCardContainer2.id =
      "dresseco-catalogue-page-container-items-product-card";
    productsContainerCardContainer2.className = "card h-100 mb-3";
    productsContainerCardContainer.appendChild(productsContainerCardContainer2);

    const productsContainerCardHeader = document.createElement("div");
    productsContainerCardHeader.id =
      "dresseco-catalogue-page-container-items-product-card-origin-shop-img";
    productsContainerCardHeader.className = "card-header";
    productsContainerCardContainer2.appendChild(productsContainerCardHeader);

    const productsContainerCardOriginShopImg = document.createElement("img");
    productsContainerCardOriginShopImg.src = product.origin_shop_img_url;
    productsContainerCardOriginShopImg.alt = "Origin shop image";
    productsContainerCardOriginShopImg.className = "img-fluid";
    productsContainerCardOriginShopImg.crossOrigin = "anonymous";
    productsContainerCardHeader.appendChild(productsContainerCardOriginShopImg);

    const productsContainerCardProductImgContainer =
      document.createElement("div");
    productsContainerCardProductImgContainer.id =
      "dresseco-catalogue-page-container-items-product-card-product-image";
    productsContainerCardContainer2.appendChild(
      productsContainerCardProductImgContainer
    );

    const productsContainerCardProductImgContainerLink =
      document.createElement("a");
    productsContainerCardProductImgContainerLink.href = product.dresseco_url;
    productsContainerCardProductImgContainer.appendChild(
      productsContainerCardProductImgContainerLink
    );

    const productsContainerCardProductImgContainerImg =
      document.createElement("img");
    productsContainerCardProductImgContainerImg.src = product.image_url;
    productsContainerCardProductImgContainerImg.alt = "Product image";
    productsContainerCardProductImgContainerImg.crossOrigin = "anonymous";
    productsContainerCardProductImgContainerLink.appendChild(
      productsContainerCardProductImgContainerImg
    );

    const productsContainerCardInfo = document.createElement("div");
    productsContainerCardInfo.id =
      "dresseco-catalogue-page-container-items-product-card-product-info";
    productsContainerCardInfo.onclick = function () {
      location.href = product.dresseco_url;
    };
    productsContainerCardContainer2.appendChild(productsContainerCardInfo);

    const productsContainerCardInfo2 = document.createElement("div");
    productsContainerCardInfo2.className = "card-body dresseco-link-title";
    productsContainerCardInfo.appendChild(productsContainerCardInfo2);

    const productsContainerCardInfoTitleLink = document.createElement("a");
    productsContainerCardInfoTitleLink.href = product.dresseco_url;
    productsContainerCardInfo2.appendChild(productsContainerCardInfoTitleLink);

    const productsContainerCardInfoTitleText = document.createElement("span");
    productsContainerCardInfoTitleText.className =
      "card-title fs-3 fw-bold text-decoration-underline";
    productsContainerCardInfoTitleText.textContent = product.name;
    productsContainerCardInfoTitleLink.appendChild(
      productsContainerCardInfoTitleText
    );

    const productsContainerCardInfoPrice = document.createElement("p");
    productsContainerCardInfoPrice.className = "card-text fs-4";
    productsContainerCardInfoPrice.textContent = product.price;
    productsContainerCardInfo2.appendChild(productsContainerCardInfoPrice);

    productsContainer.innerHTML;
    window.scrollTo(0, 0);
  });
}

fetchData(printCatalogueUI);
