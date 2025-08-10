import express from 'express'
import { addAddrees, getAddrees } from '../Controllers/addrees.js';
import { Athenticated } from '../Middlewares/auth.js';
const router =express.Router();


router.post('/add',Athenticated,addAddrees)
router.get('/get',Athenticated,getAddrees)
export default router;