const express = require('express')
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');

const { getMenuDashboard } = require('../Controllers/menuGetDashboard');
const { addItem } = require('../Controllers/addItem');
const { deleteItem } = require('../Controllers/deleteItem');
const { editItem } = require('../Controllers/editItem');

router.get('/menu', verifyToken,getMenuDashboard);
router.put('/addItem', addItem);
router.delete('/deleteItem' , deleteItem);
router.put('/editItem', editItem);

module.exports = router;