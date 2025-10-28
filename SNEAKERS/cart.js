let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Price: $${item.newPrice.toFixed(2)}</p>
                <button class="remove-item" data-index="${index}">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    updateCartTotal();
}

function displayRecommendedItems() {
    const recommendedContainer = document.getElementById('recommended-items');
    // Здесь вы можете добавить логику для выбора рекомендуемых товаров
    const recommendedProducts = products.slice(0, 4); // Просто берем первые 4 товара для примера

    recommendedProducts.forEach(product => {
        const item = document.createElement('div');
        item.classList.add('recommended-item');
        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p>$${product.newPrice.toFixed(2)}</p>
        `;
        recommendedContainer.appendChild(item);
    });
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + item.newPrice, 0);
    document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
        cartCount.style.display = cart.length > 0 ? 'block' : 'none';
    }
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#4ecdc4'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#4ecdc4',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            }
        },
        retina_detect: true
    });

    document.getElementById('cart-items').addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const index = parseInt(e.target.dataset.index);
            removeItem(index);
        }
    });

    document.getElementById('checkout-btn').addEventListener('click', () => {
        alert('Proceeding to checkout...');
        // Here you would typically redirect to a checkout page
    });

    // Apply the current theme
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});
