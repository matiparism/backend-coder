// Función para ocultar o mostrar el formulario
function toggleFormulario() {
	const formulario = document.getElementById('productForm');
	if (formulario.classList.contains('hidden')) {
		// Si el formulario está oculto, mostrarlo
		formulario.classList.remove('hidden');
	} else {
		// Si el formulario está visible, ocultarlo
		formulario.classList.add('hidden');
	}
}
