const Product = require('../models/productModel');

const productController = {
    //get all products
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (err) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    //create a new product
    createProduct: async (req, res) => {
        const product = new Product({
            productName: req.body.productName,
            productDescription: req.body.productDescription,
            productPrice: req.body.productPrice,
            productCategory: req.body.productCategory
        });
        try {
            const newProduct = await product.save();
            res.status(201).json(newProduct);
        } catch (err) {
            res.status(400).json({ message: "Error creating product" });
        }
    },
    //get a product by id
    getProductById: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            res.json(product);
        } catch (err) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    ,
    //delete a product
    deleteProduct: async (req, res) => {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            res.json({ message: "Product deleted" });
        } catch (err) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    ,
    //update a product
    updateProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            product.productName = req.body.productName;
            product.productDescription = req.body.productDescription;
            product.productPrice = req.body.productPrice;
            product.productCategory = req.body.productCategory;
            await product.save();
            res.json(product);
        } catch (err) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = productController;
