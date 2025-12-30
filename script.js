const App = {
    products: [],
    cart: JSON.parse(localStorage.getItem('novacart')) || [],
    selectedSize: null,
    currentAction: 'login',

    async init() {
        await this.loadProducts();
        this.renderCart();
    },

    async loadProducts() {
        try {
            const res = await fetch('api.php?action=getProducts');
            this.products = await res.json();
            this.renderProducts();
        } catch (e) { console.error("API Error", e); }
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
        this.selectedSize = null;
        document.querySelectorAll('.sizes button').forEach(b => b.classList.remove('active'));
        
        document.getElementById('modal-img').src = p.imagen;
        document.getElementById('modal-title').innerText = p.nombre;
        document.getElementById('modal-price').innerText = `$${p.precio}`;
        toggleModal('product-modal', true);
        
        document.getElementById('add-to-cart-btn').onclick = () => this.validateAddToCart(p);
    },

    selectSize(btn) {
        document.querySelectorAll('.sizes button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedSize = btn.innerText;
    },

    validateAddToCart(product) {
        if (!this.selectedSize) {
            alert("DEBES SELECCIONAR UN TALLE PARA CONTINUAR");
            return;
        }
        this.cart.push({ ...product, talle: this.selectedSize });
        this.saveCart();
        this.renderCart();
        toggleModal('product-modal', false);
        toggleCart(true);
    },

    renderCart() {
        const container = document.getElementById('cart-items');
        let total = 0;
        container.innerHTML = this.cart.map((item, index) => {
            total += parseFloat(item.precio);
            return `
                <div class="cart-item">
                    <img src="${item.imagen}">
                    <div class="item-info">
                        <h4>${item.nombre}</h4>
                        <p>Talle: ${item.talle} | $${item.precio}</p>
                    </div>
                    <i data-lucide="trash-2" onclick="App.removeItem(${index})"></i>
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
    },

    saveCart() { localStorage.setItem('novacart', JSON.stringify(this.cart)); },

    async handleAuth(e) {
        e.preventDefault();
        const data = new FormData();
        data.append('email', document.getElementById('auth-email').value);
        data.append('pass', document.getElementById('auth-pass').value);
        data.append('action', this.currentAction);

        const res = await fetch('auth.php', { method: 'POST', body: data });
        const result = await res.json();
        const msgBox = document.getElementById('auth-msg');
        msgBox.innerText = result.message;
        msgBox.style.color = result.success ? 'var(--electric-blue)' : '#ff4444';
        if(result.success) setTimeout(() => toggleModal('auth-modal', false), 1500);
    },

    checkoutWhatsApp() {
        if (this.cart.length === 0) return alert("TU BOLSA ESTÁ VACÍA");
        
        let msg = "*Nueva Orden - NovaWear Elite*\n\n";
        this.cart.forEach(i => msg += `- ${i.nombre} (Talle: ${i.talle}) - $${i.precio}\n`);
        msg += `\n*Total: ${document.getElementById('cart-total').innerText}*`;
        
        const url = `https://wa.me/5491100000000?text=${encodeURIComponent(msg)}`; // Reemplazar número
        window.open(url, '_blank');
        this.cart = [];
        this.saveCart();
        this.renderCart();
        toggleCart(false);
    }
};

// Helpers de UI
function toggleModal(id, show = null) {
    const m = document.getElementById(id);
    show === null ? m.classList.toggle('active') : (show ? m.classList.add('active') : m.classList.remove('active'));
}

function toggleCart(show = null) {
    const c = document.getElementById('cart-sidebar');
    show === null ? c.classList.toggle('active') : (show ? c.classList.add('active') : c.classList.remove('active'));
}

function switchAuth(btn, action) {
    document.querySelectorAll('.auth-tabs button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    App.currentAction = action;
}

document.addEventListener('DOMContentLoaded', () => App.init());