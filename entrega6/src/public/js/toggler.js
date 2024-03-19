// Función para ocultar o mostrar un elemento
const toggleView = (id) => {
  const element = document.querySelector(id);
  console.log(element)
  if (element.classList.contains('hidden')) {
    // Si el element está oculto, mostrarlo
    element.classList.remove('hidden');
  } else {
    // Si el element está visible, ocultarlo
    element.classList.add('hidden');
  }
}

// Agregar la función toggleView al objeto global window
window.toggleView = toggleView;
