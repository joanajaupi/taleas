const mongoose = require("mongoose");
let ProductSchema = new mongoose.Schema(
    {
        productName: {type: String, reuqired: true},
        productPrice: {type: Number, required: true},
        categoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true} //points to a single document in the Category collection
    }
)
module.exports = mongoose.model("Product", ProductSchema);