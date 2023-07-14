const Category = (mongoose) => {
    const categoryModel = mongoose.model(

        "category",
        mongose.Schema(
            {
                categoryName: String,

            }
        )
    )
    return categoryModel
}
module.exports = Category