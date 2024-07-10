let products = JSON.parse(localStorage.getItem("products")) || [];

const deleteItemLocalstorage = (index) => {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
};

const renderProducts = () => {
  const cardWrapper = document.querySelector("#cardWrapper");

  if (cardWrapper) {
    cardWrapper.innerHTML = "";
    products.forEach((pro) => {
      const productHTML = `
      <div class="cart">
      
      <div class="cart-item">
        <img src="${pro.image}" alt="Product Image" />
        <div class="item-details">
          <p>${pro.name}</p>
          <p class="gift">+ Gift: <a href="#">"Golden Service Lock Appendices"</a></p>
        </div>
        <div class="item-quantity">
          <button class="quantity-btn">−</button>
          <input type="text" value="1" />
          <button class="quantity-btn">+</button>
        </div>
        <div class="item-price">${pro.newPrice}₽</div>
        <button class="remove-btn">Delete</button>
      </div> 
      <div class="cart-summary">
            <p>Итого: <span class="total-price">66 000₽</span></p>
            <button class="checkout-btn">Оформить заказ</button>
            <button class="continue-shopping-btn">Продолжить покупки</button>
          </div>
      </div>
      `;

      cardWrapper.innerHTML += productHTML;
    });

    const deleteBtns = document.querySelectorAll(".remove-btn");
    deleteBtns.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        deleteItemLocalstorage(index);
      });
    });
  } else {
    console.error("error");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});
