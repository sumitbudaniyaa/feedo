const express = require('express');
const router = express.Router();

const { registerRestaurant } = require('../Controllers/restaurantControllerRegister');
const { loginRestaurant } = require('../Controllers/restaurantLoginController');
const { editRestaurantDetail } = require('../Controllers/editRestaurantDetail');
const { deleteAccount } = require('../Controllers/deleteAccount');


router.post('/register', registerRestaurant);
router.post('/login', loginRestaurant)
router.post('/editRestaurantDetail', editRestaurantDetail);
router.post('/deleteAccount', deleteAccount);

module.exports = router;