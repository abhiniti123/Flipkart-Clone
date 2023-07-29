import express  from 'express';
import { userSignup,userLoginIn } from '../controller/userController.js';
import {getProductById, getProducts} from '../controller/productController.js'
import { addPaymentGateway, paymentResponse } from '../controller/paymentController.js';

const router=express.Router();

router.post('/signup', userSignup);
router.post('/login',userLoginIn);

router.get('/products',getProducts);
router.get('/product/:id',getProductById);

router.post('/payment',addPaymentGateway);
router.post('/callback',paymentResponse);

export default router;