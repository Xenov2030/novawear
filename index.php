<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NovaWear v2.0 | Techwear Elite</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Syncopate:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>

    <header class="glass-nav">
        <nav class="container">
            <div class="logo">NOVA<span>WEAR</span></div>
            <div class="nav-icons">
                <i data-lucide="user" id="open-auth"></i>
                <div class="cart-icon-wrapper" onclick="toggleCart()">
                    <i data-lucide="shopping-bag"></i>
                    <span id="cart-count">0</span>
                </div>
            </div>
        </nav>
    </header>

    <aside id="cart-sidebar" class="sidebar">
        <div class="sidebar-header">
            <h3>TU CARRITO</h3>
            <i data-lucide="x" onclick="toggleCart()" class="close-btn"></i>
        </div>
        <div id="cart-items" class="cart-body">
            </div>
        <div class="sidebar-footer">
            <div class="total-row">
                <span>TOTAL:</span>
                <span id="cart-total">$0.00</span>
            </div>
            <button class="btn-primary full-width">FINALIZAR COMPRA</button>
        </div>
    </aside>

    <main>
        <section id="product-container" class="product-grid container" style="margin-top: 120px;">
            </section>
    </main>

    <div id="product-modal" class="modal">
        <div class="modal-content">
            <i data-lucide="x" class="close-modal" onclick="closeModal()"></i>
            <div class="modal-grid">
                <div class="modal-img-container">
                    <img id="modal-img" src="" alt="">
                </div>
                <div class="modal-details">
                    <h2 id="modal-title"></h2>
                    <p id="modal-price" class="price"></p>
                    <div class="size-selector">
                        <span>TALLA:</span>
                        <div class="sizes">
                            <button>S</button><button>M</button><button>L</button><button>XL</button>
                        </div>
                    </div>
                    <button id="add-to-cart-btn" class="btn-primary">AÑADIR A NOVA-BAG</button>
                </div>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
    <script>lucide.createIcons();</script>
</body>
</html>