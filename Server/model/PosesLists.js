import mongoose from "mongoose";

const PosesListsScheme = mongoose.Schema({
    php_id: {
        type: Number,
        default: 0
    },
    pose_no: {
        type: String
    },
    name: {
        type: String
    },
    preview: {
        type: String
    },
    media_type: {
        type: String
    },
    media_url: {
        type: String
    },
    activity_time: {
        type: Number
    }
}, { timestamps: true })

const PosesLists = mongoose.model("poseslists", PosesListsScheme)
export default PosesLists