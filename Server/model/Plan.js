import mongoose from "mongoose";

const PlanSchema = mongoose.Schema({
    php_id: {
        type: Number,
        default: 0
    },
    index: {
        type: Number,
        default: 0
    },
    plan_name: {
        type: String,
    },
    plan_active_users: {
        type: Number,
        default: 0
    },
    plan_total_completions: {
        type: Number,
        default: 0
    },
    plan_description: {
        type: String,
        default: null
    },
    plan_preview_image: {
        type: String,
        default: null
    },
    short_video_url: {
        type: String,
        default: null
    },
    intro_video_url: {
        type: String,
        default: null
    },
    gif_url: {
        type: String,
        default: null
    },
    plan_level_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'planlevel'
    },
    php_plan_level_id: {
        type:Number
    },
    type: {
        type: Number,
        enum: [1, 0]    /* 0 = Offline, 1 = Online */
    },
    status: {
        type: Number,
        enum: [1, 0]   /* 0 = Deactive, 1 = Active */
    }
}, { timestamps: true })

const Plan = mongoose.model('plan', PlanSchema)
export default Plan