const express = require('express');
const app = express();
const categoryController = require('../controllers/categoryController');
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');
const customerController = require('../controllers/customerController');
const expressValidator = require('express-validator');
app.use(express.json());

app.get('/categories', categoryController.getAllCategories);
app.post('/categories', categoryController.createCategory);
app.get('/categories/:id', categoryController.getCategoryById);
app.delete('/categories/:id', categoryController.deleteCategory);
app.put('/categories/:id', categoryController.updateCategory);
app.get('/products', productController.getAllProducts);
app.post('/products', productController.createProduct);
app.delete('/products/:id', productController.deleteProduct);
app.put('/products/:id', productController.updateProduct);
app.get('/products/:id', productController.getOneProduct);

app.get('/orders', orderController.getAllOrders);
app.post('/orders', orderController.createOrder);
app.get('/orders/:id', orderController.getOrderById);
app.delete('/orders/:id', orderController.deleteOrder);
app.put('/orders/:id', orderController.updateOrder);
app.put('/orders/:id/addProduct', orderController.addProductToOrder);
app.put('/orders/:id/removeProduct', orderController.removeProductFromOrder);

app.get('/customers', customerController.getAllCustomers);
app.post('/customers', customerController.validate('createCustomer'), customerController.createCustomer);
app.get('/customers/:id', customerController.getCustomerById);
app.delete('/customers/:id', customerController.softDeleteCustomer);
app.put('/customers/:id', customerController.validate('updateCustomer'),customerController.updateCustomer);

module.exports = app;
