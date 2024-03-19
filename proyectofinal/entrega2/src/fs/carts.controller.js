// Importamos la clase 'CartsManager' desde el archivo '../controllers/productManager'.
import CartsManager from './cartsManager.js';

// Creamos una nueva instancia de 'cartsManager' con la ruta al archivo de carritos.
const cartsManager = new CartsManager(join(__dirname, '../db/carts.json'));

// Definimos una ruta GET para '/carts'. Esta ruta devolverá todos los carritos.
router.get("/", async (req, res) => {
  console.log("Test de obtencion de la lista de carritos")
  // Obtenemos todos los carritos.
  let all_carts = await cartsManager.getCarts();

  // Obtenemos el valor del parámetro de consulta 'limit'.
  let limit = parseInt(req.query.limit);
  console.log(all_carts)

  // Verificar si se proporciona un límite y responder con la lista de carritos limitada
  if (!limit) {
    res.json(all_carts);
  } else {
    res.json(all_carts.slice(0, limit));
  }
});

// Definimos una ruta GET para '/carts/:pid'. Esta ruta devolverá un carrito específico por su ID.
router.get("/:cid", async (req, res) => {
  console.log("Test de obtencion de la lista de carrito por id")
  // Obtenemos el ID del carrito de los parámetros de la ruta.
  let cart_id = parseInt(req.params.cid);
  console.log(cart_id)
  // Obtenemos el carrito por su ID.
  let cart_by_id = await cartsManager.getCartbyId(cart_id);

  // Devolvemos el carrito.
  res.json(cart_by_id);
});

router.put("/:cid/product/:pid", async (req, res) => {
  // Obtener los IDs del carrito y del producto de los parámetros de la ruta
  let cid = parseInt(req.params.cid);
  let pid = parseInt(req.params.pid);

  console.log("Route "+req.params.cid)
  console.log("Route "+req.params.pid)
  console.log("Route "+req.body)
  // Obtener la cantidad del cuerpo de la solicitud
  let quantity = req.body.quantity;

  // Obtener el carrito actual
  let cart_by_id = await cartsManager.getCartbyId(cid);
  console.log("Route "+cart_by_id)
  if (!cart_by_id) {
    res.status(404).send('El carrito no existe');
    return;
  }

  // Verificar si el producto ya está en el carrito
  const productInCart = cart_by_id.products.find(product => product.id == pid);
  if (productInCart) {
    // Si el producto ya está en el carrito, incrementar la cantidad
    productInCart.quantity += quantity;
  } else {
    // Si el producto no está en el carrito, agregarlo
    cart_by_id.products.push({id: pid, quantity: quantity});
  }

  // Actualizar el carrito
  await cartsManager.updateCart(cid, cart_by_id.products);

  res.send('El producto ha sido agregado al carrito');
});

// Nueva ruta PUT para '/carts' que actualizará todos los carritos
router.put("/", async (req, res) => {
  await cartsManager.updateAllCarts();
  res.send('Todos los carritos han sido actualizados con status=true');
});
