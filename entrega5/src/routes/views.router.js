import { Router, application } from "express";
import cookieParser from "cookie-parser";
import productsDao from '../daos/db/products.dao.js';
import cartsDao from "../daos/db/carts.dao.js";
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

router.use(cookieParser(process.env.COOKIEPASS))

router.get("/", async (req, res) => {
  const products = await productsDao.getAllProducts();
  try {
    res.render("index", { products: products });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await productsDao.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/carts", async (req, res) => {
  try {
    const carts = await cartsDao.getAllCarts();
    res.json(carts);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/carts/:cid", async (req, res) => {
  try {
    const cart = await cartsDao.getCartById(cid);
    res.json(cart);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await productsDao.getAllProducts();
  res.render("realTimeProducts", { products })
})

router.get("/realtimecarts", async (req, res) => {
  const carts = await cartsDao.getAllCarts();
  res.render("realTimeCarts", { carts })
})

router.get('/session', (req, res) => {
  if(req.session.counter){
    req.session.counter++;
    res.send(`Sesion número ${req.session.counter}`)
  } else {
    req.session.counter = 1;
    res.send('Bienvenido')
  }
})

router.get('/setcookie', (req, res) => {
  res.cookie('SessionCookie', 'Cookie firmada!!', { maxAge: 30000, signed: true}).send('Cookie asignada con exito')
})

router.get('/getcookie', (req, res) => {
  res.send(req.signedCookies)
})

router.get('/deletecookie', (req, res) => {
  res.clearCookie('SessionCookie').send('Cookie borrada!!')
})

router.get('/logout', (req, res) => {
  req.session.destroy( error => {
    if(!error) res.send('Logout ok!')
    else res.send({status: 'Logout ERROR', body: error})
  })
})

export default router;