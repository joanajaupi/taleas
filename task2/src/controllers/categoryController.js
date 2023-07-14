const Category = require('../models/categoryModel');

module.exports.getAllCategories = async(req, res) =>{

    try{
        const categories = await Category.find().populate('products').exec();
        res.json(categories);
    }catch(err){
        res.status(500).json({message:"internal server error"});
    }

}

module.exports.getCategoryById = async(req, res) =>{
    try{
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId).populate('products').exec();
        if(category){
            res.json(category);
        }else{
            res.status(404).json({message:"Category not found"});
        }
    }catch(err){
        res.status(500).json({message: "internal server error"});
    }
}

module.exports.createCategory = async(req, res) =>{
    try{
        const category = new Category({
            categoryName: req.body.categoryName
        });
        await category.save();
        res.status(201).json(category);
        }catch(err){
        res.status(500).json({message:"Internal server error"});
        }
}

module.exports.updateCategory = async(req,res) =>{
    try{
        const updatedCategory = await Category.updateOne(
            {
                _id:req.params.id
            },
            {
                $set:{
                    categoryName: req.body.categoryName
                }
            }
        );
        res.status(200).json(updatedCategory);
    }catch(err){
        res.status(500).json({message:"Internal server error"});
    }
}

module.exports.deleteCategory = async(req,res) =>{
    try{
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if(!deletedCategory){
            res.status(404).json({message:"Category not found"});
        }else{
            res.send("Document deleted");
        }

    }catch(err){

    }
}