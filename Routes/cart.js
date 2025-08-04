import express from "express";
import { addToCart, clearCart, decreaseCartItemQty, removeCartItem, userCart } from "../Controllers/cart.js";
const router=express.Router();
import {Athenticated} from '../Middlewares/auth.js'
router.post('/add',Athenticated,addToCart)
router.get('/user',Athenticated,userCart)
router.delete('/remove/:productId',Athenticated,removeCartItem)
router.delete("/clear",Athenticated, clearCart);
router.put("/decrease-qty",Athenticated, decreaseCartItemQty);
export default router;