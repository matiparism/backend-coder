import { Router } from 'express';
const router = Router();

import * as prodController from '../controllers/products.controller.js'

router.post('/', prodController.addProduct)
router.get('/', prodController.getProducts)
router.get('/:prodid', prodController.getProductById)
router.put('/:prodid', prodController.updateProduct)
router.delete('/:prodid', prodController.deleteProduct)

export default router;