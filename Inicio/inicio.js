document.addEventListener("DOMContentLoaded", () => {
  const carrusel = document.querySelector('.imagenes-carrusel');
  const botonAnterior = document.querySelector('.anterior');
  const botonSiguiente = document.querySelector('.siguiente');
  const totalSlides = carrusel.children.length;
  let indice = 0;
  let autoplayInterval;

  function mostrarSlide(i) {
    indice = (i + totalSlides) % totalSlides;
    carrusel.style.transform = `translateX(-${indice * 100}%)`;
    actualizarIndicadores();
  }

  function actualizarIndicadores() {
    const indicadores = document.querySelectorAll('.indicador');
    indicadores.forEach((ind, idx) => {
      ind.classList.toggle('activo', idx === indice);
    });
  }

  // Crear indicadores
  const contenedorIndicadores = document.createElement('div');
  contenedorIndicadores.className = 'indicadores-carrusel';
  for (let i = 0; i < totalSlides; i++) {
    const indicador = document.createElement('span');
    indicador.className = 'indicador';
    if (i === 0) indicador.classList.add('activo');
    indicador.addEventListener('click', () => mostrarSlide(i));
    contenedorIndicadores.appendChild(indicador);
  }
  document.querySelector('.contenedor-carrusel').appendChild(contenedorIndicadores);

  botonAnterior.addEventListener('click', () => {
    clearInterval(autoplayInterval);
    mostrarSlide(indice - 1);
    iniciarAutoplay();
  });
  
  botonSiguiente.addEventListener('click', () => {
    clearInterval(autoplayInterval);
    mostrarSlide(indice + 1);
    iniciarAutoplay();
  });

  function iniciarAutoplay() {
    autoplayInterval = setInterval(() => mostrarSlide(indice + 1), 12000);
  }

  iniciarAutoplay();

  // Pausar autoplay al pasar el ratón
  document.querySelector('.contenedor-carrusel').addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
  });

  document.querySelector('.contenedor-carrusel').addEventListener('mouseleave', () => {
    iniciarAutoplay();
  });
});

//Botones que te llevan a las paginas
onload =()=>{
  iniciar();  
}

function iniciar(){
    asignarPaginas()
  }

function asignarPaginas(){
  let categoria=document.querySelectorAll('.categoria');
  let paginas=[
    "../Camisetas/camisetas.html",
    "../Pantalones/pantalones.html",
    "../Calzado/calzado.html",
    "../Accesorios/accesorios.html",
    "../Sudaderas/sudaderas.html"
  ];
  categoria.forEach((element,i)=>{
    element.style.cursor="pointer";
    element.addEventListener('click',()=> cambiarPagina(i,paginas))
  });

  let categoria2=document.querySelectorAll('.categoria2');
  let paginas2=[
    "../Sudaderas/sudaderas.html",
    "../Abrigos/abrigos.html"
  ];
  categoria2.forEach((element,i)=>{
    element.style.cursor="pointer";
    element.addEventListener('click',()=> cambiarPagina(i,paginas2))
  })

  
}

function cambiarPagina(i,paginas){
  window.location.href=paginas[i];
}
//
 document.getElementById("activar").addEventListener("click", () => {
    const audio = document.getElementById("bg-music");
    audio.muted = false;
    audio.play();
  });