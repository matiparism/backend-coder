// Importamos el módulo 'express' y creamos un nuevo router.
import { Router } from 'express';
import { __dirname } from '../dirname.js';
const router = Router();

// Importamos la clase 'ProductsManager' desde el archivo '../controllers/productsManager'.
import ProductsManager from '../controllers/productsManager.js';

// Creamos una nueva instancia de 'ProductsManager' con la ruta al archivo de productos.
const productsManager = new ProductsManager('./src/db/products.json');

// Definimos una ruta GET para '/products'. Esta ruta devolverá todos los productos.
router.get('/', (req, res) => {
	console.log('Test de obtencion de la lista de producto');
	// Obtenemos todos los productos.
	let all_products = productsManager.getProducts();

	// Obtenemos el valor del parámetro de consulta 'limit'.
	let limit = parseInt(req.query.limit);
	console.log(all_products);

	// Verificar si se proporciona un límite y responder con la lista de productos limitada
	if (!limit) {
		res.json(all_products);
	} else {
		res.json(all_products.slice(0, limit));
	}
});

// Definimos una ruta GET para '/products/:pid'. Esta ruta devolverá un producto específico por su ID.
router.get('/:pid', async (req, res) => {
	console.log('Test de obtencion de la lista de producto por id');
	// Obtenemos el ID del producto de los parámetros de la ruta.
	let product_id = parseInt(req.params.pid);
	console.log(product_id);
	// Obtenemos el producto por su ID.
	let product_by_id = await productsManager.getProductbyId(product_id);

	// Devolvemos el producto.
	res.json(product_by_id);
});

// Nueva ruta POST para '/products' que agregara el los productos
router.post('/', async (req, res) => {
	// Obtener los datos del cuerpo de la solicitud
	console.log(req.body);
	const title = req.body.title;
	const description = req.body.description;
	const code = req.body.code;
	const price = req.body.price;
	const stock = req.body.stock;
	const category = req.body.category;
	const thumbnail = req.body.thumbnail;
	// Llamar al método addProduct de ProductsManager con los datos del producto
	await productsManager.addProduct(
		title,
		description,
		code,
		price,
		stock,
		category,
		thumbnail
	);
	/* res.send('El producto a sido agregado con status=true'); */
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params;

	if (!id) {
		return (
			re,
			json({
				error: 'Id is required',
			})
		);
	}

	try {
		await productsManager.deleteProduct(Number(id));
		res.json({
			message: 'Post deleted',
		});
	} catch (e) {
		res.json({
			error: e,
		});
	}
});

// Nueva ruta PUT para '/products' que actualizará todos los productos
router.put('/', async (req, res) => {
	await productsManager.updateAllProducts();
	res.send('Todos los productos han sido actualizados con status=true');
});

// Exportamos el router para que pueda ser utilizado en otros archivos.
export default router;
