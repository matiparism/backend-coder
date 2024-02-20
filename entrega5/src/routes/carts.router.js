import { Router } from 'express';
import cartsDao from '../daos/db-manager/carts.dao.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    let carts = await cartsDao.getAllCarts()
    res.json({ status: "success", payload: carts })
  } catch (error) {
    console.log("Get all carts error: "+error)
  }
});

router.get('/carts/:cid',  async (req, res) => {
  try {
    let cart = await cartsDao.getCartById(req.params.cid)
    res.json({ status: "success", payload: cart })
  } catch (error) {
    console.log("Get product by id error: "+error)
  }
});

router.post('/', async (req, res) => {
    try {
      let newCart = req.body;
      if(!newCart.cid){
        return cid = this.carts.length > 0 ? this.carts[this.carts.length - 1].cid + 1 : 1
      }
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
);

router.put('/:cid', updateCart);

export default router;