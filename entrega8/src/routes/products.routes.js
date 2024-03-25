import { Router } from 'express';
const router = Router();

import * as prodController from '../controllers/products.controller.js';
import { isAdmin, isAuthenticated } from '../middleware/auth.middleware.js';

router.post('/', isAdmin, prodController.addProduct);
router.get('/', /* isAuthenticated, */ prodController.getProducts);
router.get('/:prodid', isAuthenticated, prodController.getProductById);
router.put('/:prodid', isAdmin, prodController.updateProduct);
router.delete('/:prodid', isAdmin, prodController.deleteProduct);

export default router;
