const express = require('express');
const app = express();
const categoryController = require('../controllers/categoryController');
const productController = require('../controllers/productController');

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
module.exports = app;
