const express = require('express');
const router = express.Router();


const { fetchMenu } = require('../Controllers/appfetchMenu');
const { cartItems } = require('../Controllers/cartItems');
const { fetchCart } = require('../Controllers/fetchcart');
const { createOrder } = require('../Controllers/createOrder');
const { fetchOrder } = require('../Controllers/fetchOrder');

 
router.post('/setCart', cartItems);
router.post('/fetchMenu', fetchMenu);
router.post('/fetchCart' ,fetchCart);
router.post('/createOrder', createOrder);
router.post('/fetchOrder', fetchOrder);

module.exports = router;