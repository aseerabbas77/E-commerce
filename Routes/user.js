import express from 'express';
import { login, register, users } from '../Controllers/user.js';
const router=express.Router();

//register user
router.post('/register',register)
router.post('/login',login)
router.get('/users',users)
export default router;
