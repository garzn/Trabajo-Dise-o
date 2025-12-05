class Compra extends HTMLElement {
  constructor() {
    super();
    this.contenidoProducto = "";
    this.audio = ""; // propiedad para el audio
  }

  connectedCallback() {
    // Renderizamos el template
    this.innerHTML = this.template;

    // Variables internas
    const productCards = [...document.getElementsByClassName("card")];
    let productoSeleccionado = null;
    let productoPrecio = 0;

    // --- Funciones ---
    const cerrarModalCompra = () => {
      document.getElementById("fondoCompra").style.display = "none";
      document.getElementById("mensajeCompra").style.display = "none";
    };

    const abrirModalCompra = (cardEl) => {
      document.getElementById("fondoCompra").style.display = "flex";
      document.getElementById("mensajeCompra").style.display = "flex";

      const info = cardEl.querySelector(".card-info");
      const h3 = info ? info.querySelector("h3") : null;
      const priceEl = info ? info.querySelector(".price") : null;
      if (h3) productoSeleccionado = h3.textContent.trim();
      if (priceEl) {
        const raw = priceEl.textContent.replace(",", ".").replace(/[^0-9.]/g, "");
        productoPrecio = parseFloat(raw) || 0;
      }

      this.contenidoProducto = productoSeleccionado || "Producto";

      // Actualizar figcaption dinámicamente
      const figcaptionEl = document.getElementById("figcaptionProducto");
      if (figcaptionEl) figcaptionEl.textContent = `Música de ${this.contenidoProducto}:`;

      // Actualizar imagen
      const imgInCard = cardEl.querySelector("img");
      if (imgInCard) {
        document.getElementById("imgProducto").src = imgInCard.src;
      }

      // --- Selección de audio según producto ---
      const mapaAudios = {
        "Camiseta Zelda": "../audios/Zelda.flac",
        "Camiseta Mario": "../audios/MarioBros.wav",
        "Camiseta Pokemon": "../audios/Pokemon.ogg",
        "Camiseta Mii": "../audios/wii.mp3",
       

        
      };

      this.audio = mapaAudios[this.contenidoProducto] || "";

      // Actualizar el <audio> dinámicamente
      const audioEl = document.getElementById("audioProducto");
      if (audioEl) audioEl.src = this.audio;
    };

    const mostrarNotificacionCompra = () => {
      const confirmacionCompra = document.getElementById("confirmacionCompra");
      confirmacionCompra.style.display = "block";
      setTimeout(() => {
        confirmacionCompra.style.display = "none";
      }, 3000);
    };

    const anadirAlCarrito = () => {
      const radios = document.getElementsByName("tallas");
      let tallaSeleccionada = null;
      for (let j = 0; j < radios.length; j++) {
        if (radios[j].checked) {
          tallaSeleccionada = radios[j].value;
          radios[j].checked = false;
          break;
        }
      }

      if (!tallaSeleccionada) {
        alert("Por favor selecciona una talla antes de añadir al carrito.");
        return;
      }

      const imgEl = document.getElementById("imgProducto");
      const item = {
        nombre: productoSeleccionado,
        talla: tallaSeleccionada,
        price: productoPrecio || 0,
        img: imgEl ? imgEl.src : null,
        page: window.location.pathname.split("/").pop(),
      };

      const carritoActual = JSON.parse(sessionStorage.getItem("Carrito") || "[]");
      carritoActual.push(item);
      sessionStorage.setItem("Carrito", JSON.stringify(carritoActual));

      const mensaje = "¡Se ha añadido el producto y la talla correctamente al carrito!";
      const confEl = document.getElementById("confirmacionCompra");
      if (confEl) confEl.innerHTML = `<p>${mensaje}</p>`;
      cerrarModalCompra();
      mostrarNotificacionCompra();
      try {
        window.dispatchEvent(new Event("carritoUpdated"));
      } catch (e) {}
    };

    // --- Enganchar eventos ---
    productCards.forEach((cardEl) => {
      cardEl.style.cursor = "pointer";
      cardEl.addEventListener("click", () => abrirModalCompra(cardEl));
    });

    const botonCompraEl = document.getElementById("botonCompra");
    if (botonCompraEl) botonCompraEl.addEventListener("click", anadirAlCarrito);

    const cerrarBotonEl = document.getElementById("cerrarBoton");
    if (cerrarBotonEl) cerrarBotonEl.addEventListener("click", cerrarModalCompra);
  }

  get template() {
    return `
      <style>
        #fondoCompra { position: fixed; display: none; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); justify-content:center; align-items:center; z-index:9999; }
        #mensajeCompra { display:none; background:white; flex-direction:column; gap:20px; padding:20px; border-radius:10px; width:400px; box-shadow:0 0 20px rgba(0,0,0,0.3); position:relative; }
        #cerrarBoton { position:absolute; top:10px; right:10px; background:red; color:white; border:none; border-radius:5px; padding:5px 10px; cursor:pointer; }
        #imgProducto { height:200px; width:200px; }
        #confirmacionCompra { position:fixed; bottom:20px; left:50%; transform:translateX(-50%); display:none; background:green; color:white; padding:15px; border-radius:10px; }
      </style>

      <div id="fondoCompra">
        <div id="mensajeCompra">
          <button id="cerrarBoton">X</button>
          <h1>Elige tu talla:</h1>
          <img src="" id="imgProducto" alt="Producto">
          <form>
            <label><input type="radio" name="tallas" value="S"> S</label>
            <label><input type="radio" name="tallas" value="M"> M</label>
            <label><input type="radio" name="tallas" value="L"> L</label>
            <label><input type="radio" name="tallas" value="XL"> XL</label>
            <br><br>
            <figcaption id="figcaptionProducto">Música de ${this.contenidoProducto}:</figcaption>
            <br>
            <audio id="audioProducto" controls src=""></audio>
          </form>
          <button type="button" id="botonCompra">Añadir al carrito</button>
        </div>
      </div>
      <div id="confirmacionCompra">
        <p>¡Se ha añadido el producto correctamente al carrito!</p>
      </div>
    `;
  }
}

const etiquetaCompra = window.customElements.define("mi-compra", Compra);
export { etiquetaCompra };
