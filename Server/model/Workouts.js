import mongoose from "mongoose";

const WorkoutSchema = mongoose.Schema({
    php_id: {
        type: Number,
        default: 0
    },
    php_plan_id:{
        type:Number
    },
    plan_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "plan"
    },
    workout_name: {
        type: String,
        default: null
    },
    duration: {
        type: Number,
        default: 0
    },
    calories: {
        type: String,
        default: null
    },
    status: {
        type: Number,
        enum: [1, 0],
        default: 1     /* 1 -> Active, 0 -> DeActive */
    },
    is_free: {
        type: Number,
        enum: [1, 0],
        default: 0     /* 0 -> Yes, 1 -> No */
    }
}, { timestamps: true })

const Workout = mongoose.model('workouts', WorkoutSchema)
export default Workout