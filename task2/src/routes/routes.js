const express = require('express');
const app = express();
const productModel = require('../models/productModel');
const categoryModel = require('../models/categoryModel');

app.use(express.json());
//get all categories
app.get('/categories', async (req, res) => {
    try {
      const categories = await categoryModel.find().populate('products').exec();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
//post a new category
app.post('/categories', async(req,res)=>{
    const category = new categoryModel({
        categoryName: req.body.categoryName,
        products: req.body.products
        
    });
    try{
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    }catch(err){
        res.status(400).json({message: "Error creating category", err});
    }
}
);
//get a category by id
app.get('/categories/:id', async(req, res) => {
    try{
        const category = await categoryModel.findById(req.params.id).populate('products').exec();
        res.json(category);
    }catch(err){
        res.status(500).json({message: "internal server error"});
    }
});
app.delete('/categories/:id', async(req, res) => {
    try{
        const category = await categoryModel.findById(req.params.id);
        await category.remove();
        res.json({message: "Category deleted"});
    }catch(err){
        res.status(500).json({message: "internal server error"});
    }
});
//update a category
app.put('/categories/:id', async(req, res) => {
    try{
        const category = await categoryModel.findById(req.params.id);
        category.categoryName = req.body.categoryName;
        category.products = req.body.products;
        await category.save();
        res.json(category);
    }catch(err){
        res.status(500).json({message: "internal server error"});
    }
});

//get all products
app.get('/products', async(req, res) => {
    try{
        const products = await productModel.find();
        res.json(products);
    }catch(err){
        res.status(500).json({message: "internal server error"});
    }
});
//create a new product
app.post('/products', async(req,res)=>{
    const product = new productModel({
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        productPrice: req.body.productPrice,
        productCategory: req.body.productCategory
    });
    try{
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    }catch(err){
        res.status(400).json({message: "Error creating product", err});
    }
})
//get a product by id
app.get('/products/:id', async(req, res) => {
    try{
        const product = await productModel.findById(req.params.id);
        res.json(product);
    }catch(err){
        res.status(500).json({message: "internal server error"});
    }
});
//delete a product
app.delete('/products/:id', async(req, res) => {
    try{
        const product = await productModel.findById(req.params.id);
        await product.remove();
        res.json({message: "Product deleted"});
    }catch(err){
        res.status(500).json({message: "internal server error"});
    }
});
//update a product
app.put('/products/:id', async(req, res) => {
    try{
        const product = await productModel.findById(req.params.id);
        product.productName = req.body.productName;
        product.productDescription = req.body.productDescription;
        product.productPrice = req.body.productPrice;
        product.productCategory = req.body.productCategory;
        await product.save();
        res.json(product);
    }catch(err){
        res.status(500).json({message: "internal server error"});
    }
});

module.exports = app;
