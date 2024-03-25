import { CartModel } from "../models/carts.model.js"
import { ProductModel } from "../models/products.model.js"

export const getCarts = async (req, res) => {
  const carts = await CartModel.find();
  res.json(carts);
}

export const getCartById = async (req, res) => {
  const cart = await CartModel.findById(req.query.cartid);
  res.status(200).json(cart);
}

export const getProductDetailsInCart = async (req, res) => {
  try {
    // Obtiene el carrito por su ID
    const cart = await CartModel.findById(req.query.cartid);

    // Verifica si el carrito existe
    if (!cart) {
      // Si no se encuentra el carrito, devuelve respuesta 404
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Obtiene los IDs de los productos en el carrito
    const productIds = cart.products.map(productInCart => productInCart.id);

    // Obtiene los detalles de los productos mediante una única consulta
    const products = await ProductModel.find({ _id: { $in: productIds } });

    // Mapea los detalles de los productos para la respuesta
    const productDetails = products.map(product => ({
      title: product.title,
      thumbnails: product.thumbnails,
    }));

    // Envia respuesta exitosa con los detalles de los productos
    res.status(200).json(productDetails);
  } catch (error) {
    // Si ocurre un error, registrar en la consola y enviar respuesta 500
    console.error('Error retrieving product details from cart:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const removeProductFromCart = async (req, res) => {
  try {
    // Obtiene el carrito por su ID
    const cart = await CartModel.findById(req.params.cartid);

    // Verifica si el carrito existe
    if (!cart) {
      // Si no se encuentra el carrito, devolver respuesta 404
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Obtiene el ID del producto a eliminar
    const productIdToRemove = req.params.productid;

    // Filtra los productos en el carrito para excluir el producto a eliminar
    cart.products = cart.products.filter(productInCart => productInCart.id !== productIdToRemove);

    // Guarda el carrito actualizado en la base de datos
    await cart.save();

    // Envia respuesta exitosa
    res.status(200).json({ message: 'Product removed successfully', cart });
  } catch (error) {
    // Si ocurre un error, registra en la consola y envia respuesta 500
    console.error('Error removing product from cart:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    // Obtiene el carrito por su ID
    console.log(req.query.cartid)
    let cart = await CartModel.findById(req.query.cartid);
    console.log(cart)
    // Verifica si el carrito existe
    if (!cart) {
      // Si no se encuentra el carrito, crea uno nuevo
      cart = new CartModel({ _id: req.query.cartid, products: [] });
    }

    // Obtiene el ID del producto y la cantidad a agregar desde el cuerpo de la solicitud
    const productIdToAdd = req.body.pid;
    
    const quantityToAdd = req.body.quantity || 1; // Si no se proporciona la cantidad, se asume 1 por defecto

    // Verifica si el producto ya está en el carrito
    const existingProductIndex = cart.products.findIndex(productInCart => productInCart.id === productIdToAdd);

    if (existingProductIndex !== -1) {
      // Si el producto ya está en el carrito, agregar la cantidad al valor existente
      cart.products[existingProductIndex].quantity += quantityToAdd;
    } else {
      // Si el producto no está en el carrito, agregarlo con la cantidad especificada
      cart.products.push({ id: productIdToAdd, quantity: quantityToAdd });
    }

    // Guarda el carrito actualizado en la base de datos
    await cart.save();

    // Envia respuesta exitosa con el carrito actualizado
    res.status(200).json({ message: 'Product added to cart successfully', cart });
  } catch (error) {
    // Si ocurre un error, registrar en la consola y enviar respuesta 500
    console.error('Error adding product to cart:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



/* export const getProductByIdInCart = async (req, res) => {
  const cart = await CartModel.findById(req.query.cartid);
  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  const productInCart = cart.products.find(product => product.id === req.query.prodid);
  if (!productInCart) {
    return res.status(404).json({ message: 'Product not found in cart' });
  }

  const product = await ProductModel.findById(productInCart.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found in products collection' });
  }

  res.status(200).json(product);
} */
