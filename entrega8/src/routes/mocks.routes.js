import { Router} from 'express';
import generateMockProducts from '../mocks/mocking.module'

const router = Router();

router.get('/mockingproducts', (req, res) => {
    const mockProducts = generateMockProducts();
    res.json(mockProducts);
  });
  

module.exports = router;