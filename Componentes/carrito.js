class Carrito extends HTMLElement {
    constructor() {
        super();
    }

     connectedCallback() {
        this.innerHTML = this.template;

        // Referencias a elementos dentro del template (no usamos Shadow DOM)
        const logo = this.querySelector('#logo_carrito');
        const badge = this.querySelector('#badge_carrito');
        const contenido = this.querySelector('#contenido_carrito');
        const botonCerrar = this.querySelector('#boton_cerrar');
        const listaProductos = this.querySelector('#lista_productos');
        const carritoFooter = this.querySelector('#carrito_footer');
        const carritoTotalEl = this.querySelector('#carrito_total');
        const vaciarBtn = this.querySelector('#vaciar_carrito');

        // Mostrar/ocultar el panel del carrito
        logo.addEventListener('click', () => {
            contenido.style.display = 'block';
            renderCarrito();
        });

        botonCerrar.addEventListener('click', () => {
            contenido.style.display = 'none';
        });

        // Renderiza los productos desde sessionStorage con expresiones regulares
        // Helper para evitar inyección simple
        function escapeHtml(str) {
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        }

        function renderCarrito() {
            const raw = sessionStorage.getItem('Carrito');
            let items = [];
            try {
                items = raw ? JSON.parse(raw) : [];
            } catch (e) {
                items = [];
            }

            if (!items || items.length === 0) {
                listaProductos.innerHTML = '<p>Carrito vacío</p>';
                // actualizar badge
                if (badge) {
                    badge.textContent = '0';
                    badge.style.display = 'none';
                }
                if (carritoTotalEl) {
                    carritoTotalEl.textContent = '';
                    carritoTotalEl.style.display = 'none';
                }
                if (vaciarBtn) vaciarBtn.style.display = 'none';
                return;
            }

            // Construir lista HTML (mostrar nombre, talla y precio)
            listaProductos.innerHTML = items.map((item, index) => {
                const img = item.img ? `<img src="${item.img}" style="height:40px;width:40px;object-fit:cover;align-items:center;margin-right:8px;"/>` : '';
                const precio = (typeof item.price === 'number') ? item.price : parseFloat(item.price) || 0;
                return `
                    <div class="item_carrito" data-index="${index}" style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
                        ${img}
                        <div style="flex:1;">
                            <div><strong>${escapeHtml(item.nombre)}</strong></div>
                            <div><strong>Talla:</strong> ${escapeHtml(item.talla)}</div>
                        </div>
                        <div>${precio.toFixed(2)}€</div>
                        <button class="quitar_btn" data-index="${index}" style="background:#c0392b;color:#fff;border:none;padding:6px;border-radius:6px;cursor:pointer;margin-left:8px;">Eliminar</button>
                    </div>`;
            }).join('');

            // Añadir manejadores para eliminar
            const botones = listaProductos.querySelectorAll('.quitar_btn');
            botones.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const index = Number(btn.getAttribute('data-index'));
                    quitarItem(index);
                });
            });
            // actualizar badge
            if (badge) {
                badge.textContent = String(items.length);
                badge.style.display = items.length > 0 ? 'inline-block' : 'none';
            }

            // mostrar/ocultar boton vaciar según contenido
            if (vaciarBtn) vaciarBtn.style.display = items.length > 0 ? 'inline-block' : 'none';

            // calcular total
            const total = items.reduce((s, item) => s + (parseFloat(item.price) || 0), 0);
            if (carritoTotalEl) {
                carritoTotalEl.textContent = 'Total: ' + total.toFixed(2) + '€';
                carritoTotalEl.style.display = 'block';
            }
            // manejar boton vaciar
            if (vaciarBtn) {
                vaciarBtn.onclick = () => {
                    sessionStorage.setItem('Carrito', JSON.stringify([]));
                    renderCarrito();
                };
            }
        }

        function quitarItem(index) {
            const raw = sessionStorage.getItem('Carrito');
            let items = [];
            try { items = raw ? JSON.parse(raw) : []; } catch (e) { items = []; }
            if (index < 0 || index >= items.length) return;
            items.splice(index, 1);
            sessionStorage.setItem('Carrito', JSON.stringify(items));
            renderCarrito();
        }
        // Render inicial y suscripción a cambios
        try { renderCarrito(); } catch (e) { /* ignore */ }
        // Actualiza en otras pestañas también
        window.addEventListener('storage', (e) => { if (e.key === 'Carrito') renderCarrito(); });
        // Actualiza en la misma ventana cuando se dispara el evento personalizado
        window.addEventListener('carritoUpdated', () => renderCarrito());
    }

    get template() {
        const imagen_carrito = "../Imagenes/Carrito.png";
        

        return `
        <style>
            .contenedor_carrito {
                position: relative;
                display: inline-block;
            }

            #contenido_carrito {
                display: none;
                position: absolute;
                top: 80px;
                left: -175px;
                width: 400px;
                height: 400px;
                background: white;
                border: 2px solid #000000ff;
                border-radius: 10px;
                padding: 10px;
                z-index: 1000;
                margin-left: -150px;
                margin-top: 10px;
            }

            #logo_carrito {
            margin-top: 5px;
            }

        </style>

        <div class="contenedor_carrito">
            <div class="icono_carrito" style="position:relative;display:inline-block;">
                <img src="${imagen_carrito}" id="logo_carrito">
                <span id="badge_carrito" style="display:none;position:absolute;top:-8px;right:-8px;background:#e74c3c;color:#fff;border-radius:50%;padding:3px 7px;font-size:12px;font-weight:700;">0</span>
            </div>
            <div id="contenido_carrito">
                <button id="boton_cerrar" style="position:absolute;top:8px;right:8px;background:red;color:white;border:none;border-radius:5px;padding:5px 8px;cursor:pointer;">X</button>
                <div id="lista_productos" style="padding-top:28px;overflow:auto;max-height:300px;"></div>
                <div id="carrito_footer" style="border-top:1px solid #ddd;padding-top:8px;margin-top:8px;display:flex;justify-content:space-between;align-items:center;">
                    <div id="carrito_total">Total: 0.00€</div>
                    <button id="vaciar_carrito" style="display:none;background:#f39c12;color:white;border:none;padding:6px;border-radius:6px;cursor:pointer;">Vaciar</button>
                </div>
            </div>
        </div>`;
    }
}

const etiquetaCarrito = window.customElements.define("mi-carrito", Carrito);
export { etiquetaCarrito };



