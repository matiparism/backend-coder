const socket = io();

const form = document.querySelector('form');
// Manejador para la presentación del formulario (Agregar Producto)
form.addEventListener('submit', (e) => {
	e.preventDefault();

	const formData = new FormData(form);

	// Obtener los valores del formulario
	const title = formData.get('title');
	const description = formData.get('description');
	const code = formData.get('code');
	const price = formData.get('price');
	const stock = formData.get('stock');
	const category = formData.get('category');
	const thumbnail = formData.get('thumbnail');

	// Emitir un evento de Socket.IO para agregar un nuevo producto
	socket.emit('addProduct', {
		title,
		description,
		code,
		price,
		stock,
		category,
		thumbnail,
	});
	form.reset();
});

// Escuchar el evento "productList" desde el servidor
socket.on('products-list', (products) => {
	console.log(products);
	// Obtener la lista de productos del DOM
	const productsList = document.querySelector('#products-list');

	// Limpiar la lista antes de actualizarla con nuevos productos
	productsList.innerHTML = '';

	// Iterar sobre la lista de productos recibidos del servidor
	products.forEach((product) => {
		// Crear un elemento de lista y establecer su contenido
		const listItem = document.createElement('li');
		listItem.textContent = `${product.title} - Price: ${product.price}`;

		// Agregar el elemento de lista a la lista en el DOM
		productsList.appendChild(listItem);
	});
});
