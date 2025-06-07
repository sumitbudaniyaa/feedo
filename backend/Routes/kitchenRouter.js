const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');

const { kitchenGetOrders } = require('../Controllers/kitchenGetOrders');
const { orderReady } = require('../Controllers/orderReady');


router.get('/kitchenGetOrders', verifyToken, kitchenGetOrders);
router.post('/orderReady' , orderReady);


module.exports = router;