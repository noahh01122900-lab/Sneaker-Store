let cart = [];

function addToCart(name, price) {

    // Check if product already exists
    const existingProduct = cart.find(
        product => product.name === name
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();
}


function updateCart() {

    document.getElementById("cart-count").textContent =
        cart.reduce((total, product) => total + product.quantity, 0);


    const cartItems = document.getElementById("cart-items");

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        document.getElementById("cart-total").textContent = "0.00";

        return;
    }


    cart.forEach(function(product, index) {

        const item = document.createElement("div");

        item.classList.add("cart-item");

    item.innerHTML = `
        <div>
            <strong>${product.name}</strong>
            <p>$${product.price.toFixed(2)}</p>
        </div>

        <div class="quantity">

            <button onclick="decreaseQuantity(${index})">
                −
            </button>

            <span>${product.quantity}</span>

            <button onclick="increaseQuantity(${index})">
                +
            </button>

            <button class="remove-btn" onclick="removeProduct(${index})">
                ×
            </button>

        </div>
    `;
        cartItems.appendChild(item);

    });


    // Calculate total price
    let total = 0;

    cart.forEach(function(product) {

        total += product.price * product.quantity;

    });


    document.getElementById("cart-total").textContent =
        total.toFixed(2);
}

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();
}

function decreaseQuantity(index) {

    cart[index].quantity--;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    updateCart();
}

function removeProduct(index) {

    cart.splice(index, 1);

    updateCart();
}

function toggleCart() {

    const panel = document.getElementById("cart-panel");

    panel.classList.toggle("active");

}

const favoriteButtons =
    document.querySelectorAll(".favorite");

favoriteButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        if (button.textContent === "♡") {
            button.textContent = "♥";
        } else {
            button.textContent = "♡";
        }

    });

});