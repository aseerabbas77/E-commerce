import express from "express";
import { addToCart, userCart } from "../Controllers/cart.js";
const router=express.Router();

router.post('/add',addToCart)
router.get('/user',userCart)
export default router;