import mongoose from "mongoose";

const LanguagesSchema = mongoose.Schema({
    php_id: {
        type: Number,
        default: 0
    },
    language: {
        type: String,
        require: true
    },
    language_code: {
        type: String,
        require: true
    }
}, { timestamps: true })

const Languages = mongoose.model('languages', LanguagesSchema)
export default Languages