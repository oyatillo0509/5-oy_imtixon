document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.querySelector(".box");
  const minPriceInput = document.querySelector(".dan");
  const maxPriceInput = document.querySelector(".gacha");
  const searchButton = document.querySelector(".search-button");
  const categorySelect = document.querySelector("#popu");

  async function fetchProducts(
    minPrice = 0,
    maxPrice = Infinity,
    category = "Все"
  ) {
    try {
      const response = await fetch(
        `https://cars-pagination.onrender.com/products`
      );
      if (!response.ok) {
        throw new Error(`Api da xatolik ${response.status}`);
      }
      const data = await response.json();
      const filteredProducts = data.filter(
        (product) =>
          product.newPrice >= minPrice &&
          product.newPrice <= maxPrice &&
          (category === "Все" || product.category === category)
      );
      displayProducts(filteredProducts.slice(0, 12));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  function displayProducts(products) {
    productContainer.innerHTML = "";
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.dataset.productId = product.id;
      productCard.innerHTML = `
        <div class="availability">
          <span class="in-stock" style="color: ${
            product.isExist ? "green" : "red"
          };">${product.isExist ? "В наличии" : "Нет в наличии"}</span>
          ${product.comments ? '<span class="sale">SALE</span>' : ""}
        </div>
        ${product.gift ? '<span class="gift">Подарок</span>' : ""}
        <div class="product-image">
          <img src="${product.image}" alt="rasm" />
        </div>
        <div class="product_mal">
          <div class="product-info">
            <div class="rating">
              ${getRatingStars(product.star)}
              <span class="reviews">(${product.comments} отзывов)</span>
            </div>
            <h2 class="product-title">${product.name}</h2>
            <div class="price">
              <span class="current-price">${product.newPrice}Р</span>
              ${
                product.oldPrice
                  ? `<del class="old-price">${product.oldPrice}Р</del>`
                  : ""
              }
            </div>
          </div>
        </div>
      `;

      productCard.addEventListener("click", () => {
        window.location.href = `main.html?productId=${product.id}`;
      });

      productContainer.appendChild(productCard);
    });
  }

  function getRatingStars(rating) {
    const maxStars = 5;
    let stars = "";
    for (let i = 1; i <= maxStars; i++) {
      stars += `<span class="star">${i <= rating ? "★" : "☆"}</span>`;
    }
    return stars;
  }

  function handleSearchButtonClick() {
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
    const category = categorySelect.value;
    fetchProducts(minPrice, maxPrice, category);
  }

  categorySelect.addEventListener("change", handleSearchButtonClick);
  searchButton.addEventListener("click", handleSearchButtonClick);

  fetchProducts();
});
