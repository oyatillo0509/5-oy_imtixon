const queryParams = new URLSearchParams(window.location.search);
let paramsItem = queryParams.get("productId");
const productDetails = document.querySelector("#product-details");

if (!paramsItem) {
  window.location.assign("http://127.0.0.1:5500/index.html");
}

async function getData(url) {
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (data) {
      productDetails.innerHTML = `
        <div class="product-image">
          <img src="${data.image}" alt="Rasm mavjud emas !!!" />
        </div>
        <div class="product-details">
          <h1>${data.name}</h1>
          <p>Замок дверной электронный Golden Soft GS-200Z-5 имеет роскошный глянцевый блеск, четкие линии, красивые формы.
             Подходит для установки на деревянную межкомнатную дверь</p>
          <p>Подходит для установки на деревянную/межкомнатную дверь.</p>
          <div class="price">
            <span class="current-price">${data.newPrice}Р</span>
            <span class="original-price">${data.oldPrice}Р</span>
          </div>
          <button class="cart-button">КОРЗИНКА</button>
        </div>
      `;

      const cardBtn = document.querySelector(".cart-button");
      cardBtn.addEventListener("click", () => {
        let storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        storedProducts.push(data);
        localStorage.setItem("products", JSON.stringify(storedProducts));
        alert("Savatga qo'shildi");
      });
    }
    return data;
  } catch (error) {
    console.error(error);
  }
}

getData(`https://cars-pagination.onrender.com/products/${paramsItem}`);
