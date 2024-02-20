import CartsDao from '../db/carts.dao.js';

const cartsDao = new CartsDao();

// Definimos una ruta GET para '/carts'. Esta ruta devolverá todos los carritos.
export const getAllCarts = (req, res) => {
  try {
    const carts = cartsDao.getAllCarts();
    res.json({ carts: carts });
  } catch (error) {
    console.log(error);
    res.json({ error, message: "Error" });
  }
};

export const getCartById = (req, res) => {
  try {
    const cart = cartsDao.getCartById(req.params.cid);
    res.json({
      cart,
    });
  } catch (error) {
    console.log(error);
    res.json({
      error,
      message: "Error",
    });
  }
};

export const createCart = async (cart) => {
  // Verificamos que todos los campos estén presentes.
  if (!products) {
    console.error("UNO O MAS CAMPOS ESTAN VACIOS \n TODOS LOS DATOS SON OBLIGATORIOS")
    return
  }
  else {
    try {
      // Generamos un nuevo ID para el carrito.
      const cid = this.carts.length > 0 ? this.carts[this.carts.length - 1].cid + 1 : 1
      // Creamos el nuevo carrito.
      const new_cart = {
        cid,
        products
      }
      console.log(new_cart);
      // Agregamos el nuevo carrito a la lista de carritos.
      const cart = await cartsDao.createCart(req.body)
      res.json({ cart, message: "Cart created", });

    } catch (error) {
      console.log(error);
      res.json({ error, message: "Error" });
    }
  }
};

export const updateCart = async (req, res) => {
  try {
    // Obtener los IDs del carrito y del producto de los parámetros de la ruta
    let cid = parseInt(req.params.cid);
    let pid = parseInt(req.params.pid);

    console.log("Route " + req.params.cid)
    console.log("Route " + req.params.pid)
    console.log("Route " + req.body)
    // Obtener la cantidad del cuerpo de la solicitud
    let quantity = req.body.quantity;

    // Obtener el carrito actual
    let cart_by_id = await cartsDao.getCartById(cid);
    console.log("Route " + cart_by_id)
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
      cart_by_id.products.push({ id: pid, quantity: quantity });
    }

    // Actualizar el carrito
    await cartsDao.updateCart(cid, cart_by_id.products);
    res.send('El producto ha sido agregado al carrito');
  } catch (error) {
    console.log(error);
    res.json({
      error,
      message: "Error",
    });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const cid = req.params.cid;
    const post = await cartsDao.deleteCart(cid);

    res.json({
      cart,
      message: "Cart deleted",
    });
  } catch (error) {
    console.log(error);
    res.json({
      error,
      message: "Error",
    });
  }
}
