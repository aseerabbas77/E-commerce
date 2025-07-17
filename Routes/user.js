import express from 'expresss';
import { register } from '../Controllers/user';
const router=express.Router();

//register user
router.post('/register',register)

export default router;
