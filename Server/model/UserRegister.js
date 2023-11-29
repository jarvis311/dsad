import mongoose from "mongoose";

const UserRegisterSchema = mongoose.Schema({
    php_id: {
        type: Number,
        default: 0
    },
    user_name: {
        type: String,
        default: null
    },
    user_email: {
        type: String
    },
    user_password: {
        type: String,
        default: null
    },
    user_platform: {
        type: String
    },
    is_subscribe: {
        type: Number,
        enum: [1, 0],
        default: 0     /* 0 => false, 1 => true */
    },
    subscription_platform: {
        type: String,
        default: null
    },
    sku: {
        type: String,
        default: null
    },
    purchase_time: {
        type: String,
        default: null
    },
    expiry_date: {
        type: Date,
        default: null
    },
    is_free_trial: {
        type: Number,
        enum: [1, 0],
        default: 0   /* 0 => false, 1 => true */
    },
    is_purchased: {
        type: Number,
        enum: [1, 0],
        default: 0   /* 0 => false, 1 => true */
    },
    no_of_days: {
        type: Number,
        default: 0
    },
    gender: {
        type: String,
        default: null
    },
    currentBodyType: {
        type: String,
        default: null
    },
    targetBodyTyp: {
        type: String,
        default: null
    },
    flexibilityLevel: {
        type: String,
        default: null
    },
    sedentoryLifestyle: {
        type: String,
        default: null
    },
    stamina: {
        type: String,
        default: null
    },
    physicalActive: {
        type: String,
        default: null
    },
    WorkOn: {
        type: String,
        default: null
    },
    Goal: {
        type: String,
        default: null
    },
    HeightParamater: {
        type: String,
        default: null
    },
    WeightParamater: {
        type: String,
        default: null
    },
    TargetWeightIn: {
        type: String,
        default: null
    },
    HeightIN: {
        type: String,
        default: null
    },
    HeightCM: {
        type: String,
        default: null
    },
    WeightLB: {
        type: String,
        default: null
    },
    WeightKG: {
        type: String,
        default: null
    },
    TargetWeightLB: {
        type: String,
        default: null
    },
    TargetWeightKG: {
        type: String,
        default: null
    },
    Age: {
        type: String,
        default: null
    },
    device_token: {
        type: String
    },
    device_platform: {
        type: String
    }
}, { timestamps: true })

const UserRegister = mongoose.model('user_register', UserRegisterSchema)
export default UserRegister