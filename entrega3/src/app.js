// Importar el módulo 'path' para trabajar con rutas de archivos y directorios
const path = require('path');
// Importar el módulo 'express' para crear la aplicación web
const express = require('express');
// Crear una instancia de la aplicación Express
const app = express();
// Importar la clase 'ProductManager' desde el archivo './script/productManager'
const ProductManager = require('./script/productManager');
// Middleware para parsear los datos en las solicitudes POST con formato 'application/x-www-form-urlencoded'
app.subscribe(express.urlencoded({ extended: true }));
// Crear una instancia de 'ProductManager' con la ruta al archivo de productos
const productManager = new ProductManager(
	path.join(__dirname, './db/products.json')
);
// Ruta '/products' para obtener la lista de productos
app.get('/products', async (req, res) => {
	console.log('Test de obtencion de la lista de producto');
	// Obtener todos los productos
	let all_products = await productManager.getProducts();
	// Obtener el valor del parámetro de consulta 'limit'
	let limit = parseInt(req.query.limit);
	console.log(all_products);
	// Verificar si se proporciona un límite y responder con la lista de productos limitada
	if (!limit) {
		res.json(all_products);
	} else {
		res.json(all_products.slice(0, limit));
	}
});
// Ruta '/products/:pid' para obtener un producto por su ID
app.get('/products/:pid', async (req, res) => {
	console.log('Test de obtencion de la lista de producto por id');
	// Obtener el parámetro de la URL que representa el ID del producto
	let product_id = parseInt(req.params.pid);
	console.log(product_id);
	// Obtener el producto por su ID
	let product_by_id = await productManager.getProductbyId(product_id);
	res.json(product_by_id);
});
// Middleware para manejar solicitudes no encontradas
app.use((req, res) => {
	res.status(404).send('Error - pagina no encontrada');
});
// Puerto en el que el servidor escuchará las solicitudes
const PORT = 8080;
// Iniciar el servidor y escuchar en el puerto especificado
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
