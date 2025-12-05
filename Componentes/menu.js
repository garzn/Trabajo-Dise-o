class Menu extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const logo ="../Imagenes/DAS.png";
        const logout ="../Imagenes/logout.png";

        this.innerHTML = `

            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                html, body {
                    height: 100%;
                }

                main {
                    flex: 1;
                    padding: 50px 80px;
                }
                body {
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: #f4f4f4;
                    color: #333;
                }
                .barra-promocional {
                    background-color: #000;
                    color: #fff;
                    text-align: center;
                    font-size: 14px;
                    padding: 8px 0;
                    letter-spacing: 0.5px;
                }

                header {
                    background-color: #ffffff;
                    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
                    position: sticky;
                    top: 0;
                    z-index: 100;
                }

                .barra-navegacion {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 25px 70px;
                    height: 70px;
                }

                .logo-tienda {
                    display: flex;
                    align-items: center;
                    height: 100px;
                    margin-top: 0;
                }

                .logo-tienda a img  {
                    height: 100%;
                    width: 70px;
                    object-fit: contain;
                }

                .menu-principal {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                }

                .right-controls {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-left: auto;
                }

                .logo-logout {
                    display: flex;
                    align-items: center;
                    height: 40px;
                }

                .logo-logout a img {
                
                    height: 40px;
                    width: 40px;
                    object-fit: contain;
                    
                   
                }

                .menu-principal ul {
                    list-style: none;
                    display: flex;
                    gap: 45px;
                }

                .menu-principal a {
                    text-decoration: none;
                    color: #333;
                    font-size: 18px;
                    font-weight: 600;
                    transition: color 0.3s ease;
                }

                .menu-principal a:hover {
                    color: #0078ff;
                }

                .carrito img{
                    height: 50px;
                    width: 50px;
                }
            </style>

            <div class="barra-promocional">
                ¡Hazte miembro ahora para disfrutar de nuestros descuentos!
            </div>

            <header>
                <div class="barra-navegacion">
                    <div class="logo-tienda">
                    <a href="../Inicio/inicio.html">
                    <img src="${logo}" alt="Logo DAS">
                    </a>    
                    </div>
                    <nav class="menu-principal">
                        <ul>
                            <li><a href="../Filtrar/filtrar.html">Productos</a></li>
                            <li><a href="../Camisetas/camisetas.html">Camisetas</a></li>
                            <li><a href="../Videos/videos.html">Videos</a></li>
                           
                        </ul>
                    </nav>
                    <div class="logo-logout">
                            <a href="../Login/login.html">
                                <img src="${logout}" alt="Logo Logout">
                            </a>
                        </div>
                    <div class="right-controls">
                        <mi-carrito class="carrito"></mi-carrito>
                        
                    </div>
                </div>
            </header>
        `;
    }
}

const etiquetaMiMenu = window.customElements.define("mi-menu", Menu);
export { etiquetaMiMenu };
