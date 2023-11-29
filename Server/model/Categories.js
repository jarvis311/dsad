import mongoose from "mongoose";

const CategoriesSchema = mongoose.Schema({
    php_id: {
        type: Number,
        default: 0
    },
    index: {
        type: Number,
        default: 0
    },
    category_name: {
        type: String,
        require: true
    }
}, { timestamps: true })

const Categories = mongoose.model('categories', CategoriesSchema)
export default Categories