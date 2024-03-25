import { Router } from 'express';
const router = Router();

import * as cartController from '../controllers/carts.controller.js'

router.get('/', cartController.getCarts)
router.get('/cart', cartController.getCartById)
router.get('/productsincart', cartController.getProductDetailsInCart)
router.put('/add', cartController.addProductToCart);

/*router.post('/', cartController.addCart)
 router.put('/:cartid', cartController.updateCart)
router.delete('/:cartid', cartController.deleteCart) */

export default router;