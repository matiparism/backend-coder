import ProductsDao from '../db/products.dao.js';

const productsDao = new ProductsDao();

// Definimos una ruta GET para '/products'. Esta ruta devolverá todos los productos.
export const getAllProducts = (req, res) => {
  try {
    const products = productsDao.getAllProducts();
    res.json({ products: products });
  } catch (error) {
    console.log(error);
    res.json({ error, message: "Error" });
  }
};

export const getProductById = (req, res) => {
  try {
    const product = productsDao.getProductById(req.params.pid);
    res.json({
      product,
    });
  } catch (error) {
    console.log(error);
    res.json({
      error,
      message: "Error",
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    console.log(req.body);
    let newProduct = await req.body;
    productsDao.createProduct(newProduct);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.json({ info: "Error creating product", error });
  }
};

export const updateProduct = async (req, res) => {
  try {
    let pid = parseInt(req.params.pid);

    console.log("Route " + req.params.pid)
    console.log("Route " + req.body)

    let prod_by_id = await productsDao.getProductById(pid);
    console.log("Route " + prod_by_id)
    if (!prod_by_id) {
      res.status(404).send('El producto no existe');
      return;
    }
    productsDao.updateProduct(req.body);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.json({ info: "Error creating product", error });
  }
};