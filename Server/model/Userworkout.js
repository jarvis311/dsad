import mongoose from "mongoose";

const UserWorkoutSchema = mongoose.Schema({
    php_id: {
        type: Number,
        default: 0
    },
    php_user_register_id: {
        type: Number
    },
    user_register_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user_register"
    },
    php_plan_id: {
        type: Number
    },
    plan_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "plan"
    },
    user_join_plan: {
        type: Number,
        enum: [1, 0],
        default: 0   /* 0 => false, 1 => true */
    },
    user_completed_workout: {
        type: Number,
        default: 0
    },
    user_completed_workout_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "workouts"
    },
    php_user_completed_workout_id: {
        type: Number
    },
    user_completed_plan: {
        type: Number,
        enum: [1, 0],
        default: 0   /* 0 => false, 1 => true */
    }
}, { timestamps: true })

const UserWorkout = mongoose.model("userworkout", UserWorkoutSchema)
export default UserWorkout