const express = require('express');
const app = express();
const categoryController = require('../controllers/categoryController');
const productController = require('../controllers/productController');

app.use(express.json());
//get all categories
app.get('/categories', categoryController.getAllCategories);
//create a new category1
app.post('/categories', categoryController.createCategory);
//get a category by id
app.get('/categories/:id', categoryController.getCategoryById);
//delete a category
app.delete('/categories/:id', categoryController.deleteCategory);
//update a category
app.put('/categories/:id', categoryController.updateCategory);
//get all products under a category
app.get('/products', productController.getAllProducts);
//create a new product
app.post('/products', productController.createProduct);
//get a product by id
app.get('/products/:id', productController.getProductById);
//delete a product
app.delete('/products/:id', productController.deleteProduct);
//update a product
app.put('/products/:id', productController.updateProduct);
module.exports = app;
