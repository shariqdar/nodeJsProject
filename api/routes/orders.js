const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/authCheck');
const orderController = require('../../controllers/orders');

router.get('/',checkAuth, orderController.get_orders);

router.post('/',checkAuth, orderController.add_order);

router.get('/:orderID',checkAuth, orderController.get_order);

router.delete('/:orderID',checkAuth, orderController.delete_order);

module.exports = router;