import express from 'express';
import { addProduct, deleteProductsById, getProducts, getProductsById, updateProductsById } from '../Controllers/product.js';
const router=express.Router();

router.post('/add',addProduct)
router.get('/getProducts',getProducts)
router.get('/:id',getProductsById)
router.put('/:id',updateProductsById)
router.delete('/:id',deleteProductsById)
export default router;