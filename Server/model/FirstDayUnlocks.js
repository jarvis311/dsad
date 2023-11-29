import mongoose from "mongoose";

const FirstDayUnlocksSchema = mongoose.Schema({
    php_id: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        enum: [1, 0],
        default: 0          /* 0 = Deactive, 1 = Active */
    },
    subscription: {
        type: Number,
        enum: [1, 0],
        default: 0          /* 0 = Deactive, 1 = Active */
    },
    subscription_required_ios: {
        type: Number,
        enum: [1, 0],
        default: 0          /* 0 = Deactive, 1 = Active */
    },
    plans_local_free_ios: {
        type: Number,
        enum: [1, 0],
        default: 0          /* 0 = Deactive, 1 = Active */
    },
    plans_local_free_android: {
        type: Number,
        enum: [1, 0],
        default: 0          /* 0 = Deactive, 1 = Active */
    },
    plans_local_showfirst_ios: {
        type: Number,
        enum: [1, 0],
        default: 0          /* 0 = Deactive, 1 = Active */
    },
    plans_local_showfirst_android: {
        type: Number,
        enum: [1, 0],
        default: 0          /* 0 = Deactive, 1 = Active */
    }
}, { timestamps: true })

const FirstDayUnlocks = mongoose.model('firstdayunlocks', FirstDayUnlocksSchema)
export default FirstDayUnlocks