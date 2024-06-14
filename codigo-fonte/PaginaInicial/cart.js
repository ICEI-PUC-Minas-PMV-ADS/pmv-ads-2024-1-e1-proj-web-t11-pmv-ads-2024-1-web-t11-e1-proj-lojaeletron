document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length > 0) {
        cart.forEach(product => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <h2>${product.nome}</h2>
                <p>Preço: R$${product.preco.toFixed(2)}</p>
                <img src="${product.imagens[0]}" alt="${product.nome}">
            `;
            cartItemsContainer.appendChild(itemDiv);
        });

        const totalPrice = cart.reduce((sum, product) => sum + product.preco, 0);
        totalPriceContainer.textContent = `Total: R$${totalPrice.toFixed(2)}`;
    } else {
        cartItemsContainer.innerHTML = '<p>O carrinho está vazio.</p>';
    }
});

//carrinho
document.addEventListener('DOMContentLoaded', () => {
    const productId = new URLSearchParams(window.location.search).get('id');
    const productDetails = document.getElementById('product-details');
    const addToCartButton = document.getElementById('add-to-cart');

    fetch('catalogo.json')
        .then(response => response.json())
        .then(data => {
            const product = data.catalogo.produtos.find(p => p.id == productId);

            if (product) {
                productDetails.innerHTML = `
             
                `;

                addToCartButton.addEventListener('click', () => {
                    addToCart(product);
                });
            } else {
                productDetails.innerHTML = '<p>Produto não encontrado</p>';
            }
        });
});

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'carrinho.html';
}