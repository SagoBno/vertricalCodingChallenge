import { Router } from 'express';
import productController from '../controllers/productController';

const router = Router();

router.get('/:title', productController.findProducts);
router.get('/', productController.getAllProducts);
router.post('/create', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;