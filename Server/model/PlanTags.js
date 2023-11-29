import mongoose from "mongoose";

const PlanTagsSchema = mongoose.Schema({
    php_id: {
        type: Number,
        default: 0
    },
    php_plan_id: {
        type: Number
    },
    plan_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'plan'
    },
    php_tag_id: {
        type: Number
    },
    tag_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tags'
    }
}, { timestamps: true })

const PlanTags = mongoose.model('plan_tags', PlanTagsSchema)
export default PlanTags