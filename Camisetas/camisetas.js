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
    indicadores.forEach((ind, i) => {
      ind.classList.toggle('activo', i === indice);
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