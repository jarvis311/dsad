import mongoose from "mongoose";

const GuestTokenSchema = mongoose.Schema({
    php_id: {
        type: Number,
        default: 0
    },
    device_token: {
        type: String
    }
}, { timestamps: true })

const GuestToken = mongoose.model('guesttoken', GuestTokenSchema)
export default GuestToken