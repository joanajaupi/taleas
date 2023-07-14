const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

module.exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports.getOneProduct = async(req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(product){
            res.json(product);
        }else{
            res.status(404).json({message: "Product not found"});
        }
    }catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}
module.exports.createProduct = async(req,res) =>{
    try{
        const product = new Product({
            productName: req.body.productName,
            productDescription: req.body.productDescription,
            productPrice: req.body.productPrice,
            productCategory: req.body.productCategory
        });
        const newProduct = await product.save();
        const createdProduct = await Category.findOneAndUpdate(
            {_id: req.body.productCategory},
            {$push: {products: newProduct._id}},
            {new: true}
        )
        res.status(200).json(newProduct);
    }catch(err){
        res.status(400).json(err);
    }
}

module.exports.deleteProduct = async(req, res) => {
    try{
        const productId = req.params.id;
        const categoryId = req.body.productCategory;
        //remove the id of the product from the list of products under this category
        const updatedCategory = await Category.findOneAndUpdate(
            {
                _id: categoryId
            },
            {
                $pull: {products: productId}
            }
        );
    
        const product = await Product.findByIdAndDelete(productId);
        if(!product){
            res.status(404).json({message: "Product not found"});
        }else{
            res.send("Document deleted");
        }
    }catch(err){
        res.status(500).json(err);
    }
}

module.exports.updateProduct = async(req, res) => {
   try{
    const updateProduct = await Product.updateOne(
    {
        _id: req.params.id
    },
    {
    $set: 
    {
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        productPrice: req.body.productPrice,
        productCategory: req.body.productCategory
    }
    });
    res.status(200).json(updateProduct);
    }catch(err){
        res.status(500).json(err);
   }
}