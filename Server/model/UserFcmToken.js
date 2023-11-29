import mongoose from "mongoose";

const UserFcmTokenSchema = mongoose.Schema({
    php_id: {
        type: Number,
        default: 0
    },
    php_user_id: {
        type: Number
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user_register"
    },
    fcm_token: {
        type: String
    }
}, { timestamps: true })

const UserFcmToken = mongoose.model('userfcmtoken', UserFcmTokenSchema)
export default UserFcmToken