const Category = require('../models/categoryModel');

const categoryController = {
    //get all categories
    getAllCategories: async (req, res) => {
        try {
            const categories = await Category.find();
            res.json(categories);
        } catch (err) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    //post a new category
    getCategoryById: async (req, res) => {
        try {
            const category = await Category.findById(req.params.id);
            res.json(category);
        } catch (err) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    createCategory: async (req, res) => {
        const category = new Category({
            categoryName: req.body.categoryName,
            products: req.body.products

        });
        try {
            const newCategory = await category.save();
            res.status(200).json(newCategory);
        } catch (err) {
            res.status(400).json({ message: "Error creating category" });
        }
    },
    //delete a category
    deleteCategory: async (req, res) => {
        try {
            const id = req.params.id;
            const category = await Category.findByIdAndDelete(id);
            res.send("Document deleted");
        } catch (err) {
            res.status(500).json({ message: "internal server error" }, err);
        }
    },
    //update a category
    updateCategory: async (req, res) => {
        try {
            const category = await Category.findById(req.params.id);
            category.categoryName = req.body.categoryName;
            category.products = req.body.products;
            await category.save();
            res.json(category);
        } catch (err) {
            res.status(500).json({ message: "internal server error" });
        }
    }
    //get all products under a category
    //getProductsByCategory: async (req, res) => {
    //    try {
    //        const category = await Category.findById(req.params.id);
    //        const products = category.products;
    //        res.json(products);
    //    } catch (err) {
    //        res.status(500).json({ message: "internal server error" });
    //    }
    //}
}

module.exports = categoryController;