import mongoose from "mongoose";

const BackgroundAudioSchema = mongoose.Schema({
    php_id: {
        type: Number,
        default: 0
    },
    php_poses_list_id: {
        type: Number,
    },
    poses_list_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "poseslists"
    },
    php_language_id: {
        type: Number,
    },
    language_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "languages"
    },
    audio: {
        type: String,
    }
}, { timestamps: true })


const BackgroundAudio = mongoose.model('backgroundaudio', BackgroundAudioSchema)
export default BackgroundAudio