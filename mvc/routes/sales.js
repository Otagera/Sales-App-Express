var express = require('express');
var router = express.Router();
const ctrlSales = require('../controllers/sales');
const ctrlProducts = require('../controllers/product');
const ctrlOrders = require('../controllers/order');
const ctrlDeliveries = require('../controllers/delivery');

/* GET home page. */
router.get('/', ctrlSales.getIndexpage);
router.get('/home', ctrlSales.getHomepage);
router.get('/products', ctrlSales.getProductsPage);
router.get('/orders', ctrlSales.getOrdersPage);
router.get('/inventory', ctrlSales.getInventoryPage);
router.get('/delivery', ctrlSales.getDeliveryPage);
router.get('/reset', ctrlSales.reset);

//to get the create product form
router.get('/create-product', ctrlProducts.getCreateForm);
//to submit the create form
router.post('/create-product', ctrlProducts.createProduct);
//to get the update form
router.get('/update-product/:productid', ctrlProducts.getUpdateForm);
//to submit the update form
router.post('/update-product/:productid', ctrlProducts.updateProduct);
//to delete a particuler product
router.post('/delete-product/:productid', ctrlProducts.deleteProduct);

//to get the create order form
router.get('/create-order', ctrlOrders.getCreateForm);
//to submit the create form
router.post('/create-order', ctrlOrders.createOrder);
//to get the update form
router.get('/update-order/:orderid', ctrlOrders.getUpdateForm);
//to submit the update form
router.post('/update-order/:orderid', ctrlOrders.updateOrder);
//to delete a particuler order
router.post('/delete-order/:orderid', ctrlOrders.deleteOrder);

//to get the create delivery form
router.get('/create-delivery', ctrlDeliveries.getCreateForm);
//to submit the create form
router.post('/create-delivery', ctrlDeliveries.createDelivery);
//to get the update form
router.get('/update-delivery/:deliveryid', ctrlDeliveries.getUpdateForm);
//to submit the update form
router.post('/update-delivery/:deliveryid', ctrlDeliveries.updateDelivery);
//to delete a particuler delivery
router.post('/delete-delivery/:deliveryid', ctrlDeliveries.deleteDelivery);

module.exports = router;