const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/',Candidate.getIndex);

// router.get('/products', shopController.getProducts);

// router.get('/products/:productid',shopController.getproductdetails);

// router.get('/cart', shopController.getCart);

// router.post('/cart',shopController.postcart);

// router.post('/create-order',shopController.postorder);

// router.get('/orders', shopController.getOrders);

// // router.get('/checkout', shopController.getCheckout);

// router.post('/cart-delete-item',shopController.postdeletecartproduct);

// module.exports = router;
