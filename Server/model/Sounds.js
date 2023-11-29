import mongoose from "mongoose";

const SoundsSchema = mongoose.Schema({
    php_id: {
        type: Number,
        default: 0
    },
    index: {
        type: Number
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    },
    php_category_id: {
        type: Number
    },
    plan_level_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'planlevel'
    },
    php_plan_level_id:{
        type: Number
    },
    name: {
        type: String,
    },
    url: {
        type: String
    },
    time: {
        type: Number,
        default: null
    },
    previewThumb: {
        type: String
    },
    backgroundGIF: {
        type: String,
        default: null
    },
    is_free: {
        type: Number,
        enum: [1, 0],
        default: 0                 /* 0 = Yes, 1 = No */
    }
}, { timestamps: true })

const Sounds = mongoose.model("sounds", SoundsSchema)
export default Sounds