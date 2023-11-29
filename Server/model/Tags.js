import mongoose from "mongoose";

const TagsSchema = mongoose.Schema({
    php_id: {
        type: Number,
        default: 0
    },
    name: {
        type: String,
        require: true
    },
    service_name: {
        type: String,
        require: true
    },
    status: {
        type: Number,
        enum: [1, 0],
        default: 0      /* 1 -> Active, 2 -> DeActive */
    }
}, { timestamps: true })


const Tags = mongoose.model('tags', TagsSchema)
export default Tags 