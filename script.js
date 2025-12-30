const App = {
    products: [],
    cart: JSON.parse(localStorage.getItem('novacart')) || [],

    async init() {
        await this.loadProducts();
        this.renderCart();
        this.setupEventListeners();
    },

    async loadProducts() {
        try {
            const res = await fetch('api.php?action=getProducts');
            this.products = await res.json();
            this.renderProducts();
        } catch (e) { console.error("Error cargando productos", e); }
    },

    renderProducts() {
        const container = document.getElementById('product-container');
        container.innerHTML = this.products.map(p => `
            <div class="product-card" onclick="App.openModal(${p.id})">
                <div class="product-image"><img src="${p.imagen}"></div>
                <div class="product-info">
                    <h3>${p.nombre}</h3>
                    <p>$${p.precio}</p>
                </div>
            </div>
        `).join('');
    },

    openModal(id) {
        const p = this.products.find(x => x.id == id);
        document.getElementById('modal-img').src = p.imagen;
        document.getElementById('modal-title').innerText = p.nombre;
        document.getElementById('modal-price').innerText = `$${p.precio}`;
        document.getElementById('product-modal').classList.add('active');
        
        document.getElementById('add-to-cart-btn').onclick = () => this.addToCart(p);
    },

    addToCart(product) {
        this.cart.push(product);
        this.saveCart();
        this.renderCart();
        this.closeModal();
        toggleCart(true); // Abre el carrito automáticamente
    },

    saveCart() {
        localStorage.setItem('novacart', JSON.stringify(this.cart));
        document.getElementById('cart-count').innerText = this.cart.length;
    },

    renderCart() {
        const container = document.getElementById('cart-items');
        let total = 0;
        container.innerHTML = this.cart.map((item, index) => {
            total += parseFloat(item.precio);
            return `
                <div class="cart-item">
                    <img src="${item.imagen}" width="50">
                    <div>
                        <h4>${item.nombre}</h4>
                        <p>$${item.precio}</p>
                    </div>
                    <i data-lucide="trash" onclick="App.removeItem(${index})"></i>
                </div>
            `;
        }).join('');
        document.getElementById('cart-total').innerText = `$${total.toFixed(2)}`;
        document.getElementById('cart-count').innerText = this.cart.length;
        lucide.createIcons();
    },

    removeItem(index) {
        this.cart.splice(index, 1);
        this.saveCart();
        this.renderCart();
    }
};

function toggleCart(show = null) {
    const sidebar = document.getElementById('cart-sidebar');
    show === true ? sidebar.classList.add('active') : sidebar.classList.toggle('active');
}

function closeModal() {
    document.getElementById('product-modal').classList.remove('active');
}

document.addEventListener('DOMContentLoaded', () => App.init());