import mongoose from "mongoose";
const PlanLevelsSchema = mongoose.Schema({
    php_id: {
        type: Number,
        default: 0
    },
    plan_level: {
        type: String,
        require: true
    }
}, { timestamps: true })

const PlanLevels = mongoose.model('planlevel', PlanLevelsSchema)
export default PlanLevels