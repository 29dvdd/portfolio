const products = [
    { name: "Nike Air Max", oldPrice: 179.99, newPrice: 129.99, image: "images/air-max.png", category: "men", rating: 4.5, sizes: [40, 41, 42, 43, 44, 45, 46], popularity: 95, tags: ["running", "cushioning"], colors: ["red", "blue", "black"], inStock: true },
    { name: "Adidas Ultraboost", oldPrice: 199.99, newPrice: 149.99, image: "images/ultra.png", category: "women", rating: 4.8, sizes: [36, 37, 38, 39, 40, 41], popularity: 98, tags: ["running", "responsive"], colors: ["white", "gray", "pink"], inStock: false  },
    { name: "Puma RS-X", oldPrice: 129.99, newPrice: 99.99, image: "images/puma rs-x.png", category: "men", rating: 4.2, sizes: [41, 42, 43, 44, 45, 46], popularity: 85, tags: ["lifestyle", "retro"], colors: ["yellow", "green", "blue"], inStock: true  },
    { name: "Reebok Classic", oldPrice: 99.99, newPrice: 79.99, image: "images/reebok.png", category: "women", rating: 4.0, sizes: [35, 36, 37, 38, 39, 40], popularity: 80, tags: ["lifestyle", "classic"], colors: ["white", "black", "beige"], inStock: false  },
    { name: "New Balance 574", oldPrice: 109.99, newPrice: 89.99, image: "images/new-balance.png", category: "kids", rating: 4.3, sizes: [33, 34, 35, 36, 37, 38], popularity: 88, tags: ["lifestyle", "comfortable"], colors: ["navy", "gray", "red"], inStock: false  },
    { name: "Vans Old School", oldPrice: 79.99, newPrice: 69.99, image: "images/vans.png", category: "men", rating: 4.6, sizes: [40, 41, 42, 43, 44, 45, 46], popularity: 92, tags: ["skateboarding", "classic"], colors: ["black", "white", "red"], inStock: true  },
    { name: "Converse Chuck Taylor", oldPrice: 69.99, newPrice: 59.99, image: "images/converse.png", category: "unisex", rating: 4.7, sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45], popularity: 97, tags: ["casual", "classic"], colors: ["black", "white", "red", "blue"], inStock: true  },
    { name: "Asics Gel-Nimbus", oldPrice: 159.99, newPrice: 139.99, image: "images/asics.png", category: "men", rating: 4.6, sizes: [40, 41, 42, 43, 44, 45, 46], popularity: 89, tags: ["running", "cushioning"], colors: ["blue", "black", "gray"], inStock: true  },
    { name: "Skechers D'Lites", oldPrice: 89.99, newPrice: 69.99, image: "images/skechers.png", category: "women", rating: 4.4, sizes: [35, 36, 37, 38, 39, 40, 41], popularity: 86, tags: ["lifestyle", "comfort"], colors: ["white", "pink", "black"], inStock: false  },
    { name: "Under Armour HOVR", oldPrice: 129.99, newPrice: 109.99, image: "images/under-armour.png", category: "men", rating: 4.5, sizes: [40, 41, 42, 43, 44, 45, 46], popularity: 88, tags: ["running", "responsive"], colors: ["black", "red", "gray"], inStock: true  },
    { name: "Fila Disruptor", oldPrice: 79.99, newPrice: 69.99, image: "images/fila_disruptor.png", category: "women", rating: 4.3, sizes: [35, 36, 37, 38, 39, 40, 41], popularity: 90, tags: ["lifestyle", "chunky"], colors: ["white", "pink", "black"], inStock: true  },
    { name: "Brooks Ghost", oldPrice: 139.99, newPrice: 119.99, image: "images/brooks.png", category: "unisex", rating: 4.7, sizes: [38, 39, 40, 41, 42, 43, 44, 45], popularity: 93, tags: ["running", "neutral"], colors: ["blue", "gray", "black"], inStock: false  }
];

let currentPage = 1;
const productsPerPage = 6;
let cart = [];

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const count = JSON.parse(localStorage.getItem('cart') || '[]').length;
        cartCount.textContent = count;
        cartCount.style.display = count > 0 ? 'block' : 'none';
    }
}

function createRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return '★'.repeat(fullStars) +
           (halfStar ? '<span class="half-star"></span>' : '') +
           '☆'.repeat(emptyStars);
}

function createProductCard(product) {
    const discount = Math.round((1 - product.newPrice / product.oldPrice) * 100);
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.dataset.category = product.category;

    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <div class="rating" title="${product.rating} out of 5 stars">
            ${createRatingStars(product.rating)}
        </div>
        <div class="price-block">
            <div class="prices">
                <span class="old-price">$${product.oldPrice.toFixed(2)}</span>
                <span class="new-price">$${product.newPrice.toFixed(2)}</span>
            </div>
            <span class="discount">-${discount}%</span>
        </div>
        <div class="sizes">
            ${product.sizes.map(size => `<span class="size">${size}</span>`).join('')}
        </div>
        <div class="colors">
            ${product.colors.map(color => `<span class="color" style="background-color: ${color};" title="${color}"></span>`).join('')}
        </div>
        <div class="stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}">
            ${product.inStock ? 'In Stock' : 'Out of Stock'}
        </div>
        <button class="add-to-cart" ${!product.inStock ? 'disabled' : ''}>Add to Cart</button>
        <div class="quick-view">Quick View</div>
    `;

    card.querySelector('.add-to-cart').addEventListener('click', () => addToCart(product));
    card.querySelector('.quick-view').addEventListener('click', (e) => {
        e.stopPropagation();
        showQuickView(product);
    });

    return card;
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`Added ${product.name} to cart!`);
}

function showQuickView(product) {
    const modal = document.getElementById('quick-view');
    const content = document.getElementById('quick-view-content');
    const discount = Math.round((1 - product.newPrice / product.oldPrice) * 100);

    content.innerHTML = `
        <div class="quick-view-layout">
            <div class="quick-view-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="quick-view-details">
                <h2>${product.name}</h2>
                <div class="rating" title="${product.rating} out of 5 stars">
                    ${createRatingStars(product.rating)}
                </div>
                <div class="price-block">
                    <div class="prices">
                        <span class="old-price">$${product.oldPrice.toFixed(2)}</span>
                        <span class="new-price">$${product.newPrice.toFixed(2)}</span>
                    </div>
                    <span class="discount">-${discount}%</span>
                </div>
                <p class="product-category">Category: ${product.category}</p>
                <p class="product-tags">Tags: ${product.tags.join(', ')}</p>
                <div class="sizes">
                    <p>Available Sizes:</p>
                    ${product.sizes.map(size => `<span class="size">${size}</span>`).join('')}
                </div>
                <div class="colors">
                    <p>Available Colors:</p>
                    ${product.colors.map(color => `<span class="color" style="background-color: ${color};" title="${color}"></span>`).join('')}
                </div>
                <div class="stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}">
                    ${product.inStock ? 'In Stock' : 'Out of Stock'}
                </div>
                <button class="add-to-cart" ${!product.inStock ? 'disabled' : ''}>Add to Cart</button>
            </div>
        </div>
    `;
    content.querySelector('.add-to-cart').addEventListener('click', () => addToCart(product));
    modal.style.display = "block";

    setTimeout(() => {
        modal.querySelector('.modal-content').classList.add('active');
    }, 10);
}

function sortProducts(products, sortBy) {
    return [...products].sort((a, b) => {
        switch (sortBy) {
            case 'popularity':
                return b.popularity - a.popularity;
            case 'price-low':
                return a.newPrice - b.newPrice;
            case 'price-high':
                return b.newPrice - a.newPrice;
            case 'rating':
                return b.rating - a.rating;
            default:
                return 0;
        }
    });
}

function searchProducts(query) {
    const searchString = query.toLowerCase();
    return products.filter(product =>
        product.name.toLowerCase().includes(searchString) ||
        product.category.toLowerCase().includes(searchString) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchString))
    );
}

function loadProducts(filter = 'all', sortBy = 'popularity', searchQuery = '', loadMore = false) {
    const catalog = document.getElementById('catalog');
    const loadMoreButton = document.getElementById('load-more');

    if (!loadMore) {
        catalog.innerHTML = '';
        currentPage = 1;
    } else {
        currentPage++;
    }

    let filteredProducts = searchQuery ? searchProducts(searchQuery) : products;
   
    if (filter !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === filter);
    }
   
    let sortedProducts = sortProducts(filteredProducts, sortBy);
   
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = sortedProducts.slice(startIndex, endIndex);
   
    productsToShow.forEach(product => {
        const card = createProductCard(product);
        catalog.appendChild(card);
       
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });

    loadMoreButton.style.display = endIndex < sortedProducts.length ? 'block' : 'none';

    if (sortedProducts.length === 0) {
        catalog.innerHTML = '<p class="no-results">No products found.</p>';
        loadMoreButton.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    updateCartCount();

    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sort-select');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const loadMoreButton = document.getElementById('load-more');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            const sortBy = sortSelect.value;
            const searchQuery = searchInput.value;
            loadProducts(filter, sortBy, searchQuery);
           
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    sortSelect.addEventListener('change', () => {
        const currentFilter = document.querySelector('.filter-btn.active').dataset.filter;
        const searchQuery = searchInput.value;
        loadProducts(currentFilter, sortSelect.value, searchQuery);
    });

    searchButton.addEventListener('click', () => {
        const currentFilter = document.querySelector('.filter-btn.active').dataset.filter;
        const sortBy = sortSelect.value;
        const searchQuery = searchInput.value;
        loadProducts(currentFilter, sortBy, searchQuery);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const currentFilter = document.querySelector('.filter-btn.active').dataset.filter;
            const sortBy = sortSelect.value;
            const searchQuery = searchInput.value;
            loadProducts(currentFilter, sortBy, searchQuery);
        }
    });

    loadMoreButton.addEventListener('click', () => {
        const currentFilter = document.querySelector('.filter-btn.active').dataset.filter;
        const sortBy = sortSelect.value;
        const searchQuery = searchInput.value;
        loadProducts(currentFilter, sortBy, searchQuery, true);
    });


    document.querySelector('.close').addEventListener('click', () => {
        const modal = document.getElementById('quick-view');
        modal.style.display = "none";
        modal.querySelector('.modal-content').classList.remove('active');
    });

    window.addEventListener('click', (event) => {
        const modal = document.getElementById('quick-view');
        if (event.target == modal) {
            modal.style.display = "none";
            modal.querySelector('.modal-content').classList.remove('active');
        }
    });

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }

    const cartBtn = document.getElementById('cart-btn');
    const profileBtn = document.getElementById('profile-btn');

    cartBtn.addEventListener('click', () => {
        alert('Cart clicked! Here you would show the cart contents.');
    });

    profileBtn.addEventListener('click', () => {
        alert('Profile clicked! Here you would show the user profile or login form.');
    });
});

document.addEventListener('mouseover', function(e) {
    const card = e.target.closest('.product-card');
    if (card) {
        card.style.transform = 'translateY(-5px) scale(1.03)';
    }
});

document.addEventListener('mouseout', function(e) {
    const card = e.target.closest('.product-card');
    if (card) {
        card.style.transform = 'translateY(0) scale(1)';
    }
});

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
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            },
            polygon: {
                nb_sides: 5
            }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#4ecdc6',
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
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
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
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
});