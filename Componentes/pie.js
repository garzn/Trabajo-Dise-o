class Pie extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const logo_blanco ="../Imagenes/DAS_Blanco.png";
        this.innerHTML = `
           <style>
        footer {
  background-color: #111;
  color: #fff;
  text-align: center;
  margin-top: auto;
}

.logo-piePag {
  height: 150px;
}

.links-piePag {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-top: 2px;
  font-size: 14px;
}

footer a {
  color: #fff;
  text-decoration: none;
}

footer a:hover {
  text-decoration: underline;
}

footer p {
  font-size: 13px;
  color: #ccc;
  margin-top: 10px;
}

           </style>
          <footer>
    <img src="${logo_blanco}" alt="Logo DAS" class="logo-piePag">
    <div class="links-piePag">
      <a href="../Terminos/terminos.html">Términos y condiciones</a>
      <a href="../Terminos/terminos.html">Política de privacidad</a>
      <a href="../Terminos/terminos.html">Aviso legal</a>
      <a href="../Terminos/terminos.html">Métodos de pago</a>
      <a href="../Terminos/terminos.html">Guía de tallas</a>
    </div>
    <p>© 2025 DAS STYLE — Calle Alejandro Garzón · das@gmail.com · 645 78 21 34</p>
  </footer>

        `;
    }
}

const etiquetaMiPie = window.customElements.define("mi-pie", Pie);
export { etiquetaMiPie };
