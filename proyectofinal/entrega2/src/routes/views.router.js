import { Router } from "express";
import productsDao from '../daos/db/products.dao.js';
import cartsDao from "../daos/db/carts.dao.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res) => {
  const products = await productsDao.getAllProducts();
  try {
    res.render("index", { products: products });
  } catch (err) {
    res.status(500).send(err);
  }
});

viewsRouter.get("/products", async (req, res) => {
  try {
    const products = await productsDao.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).send(err);
  }
});

viewsRouter.get("/carts", async (req, res) => {
  try {
    const carts = await cartsDao.getAllCarts();
    res.json(carts);
  } catch (err) {
    res.status(500).send(err);
  }
});

viewsRouter.get("/carts/:cid", async (req, res) => {
  try {
    const cart = await cartsDao.getCartById(cid);
    res.json(cart);
  } catch (err) {
    res.status(500).send(err);
  }
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
  const products = await productsDao.getAllProducts();
  res.render("realTimeProducts", { products })
})

viewsRouter.get("/realtimecarts", async (req, res) => {
  const carts = await cartsDao.getAllCarts();
  res.render("realTimeCarts", { carts })
})

export default viewsRouter;