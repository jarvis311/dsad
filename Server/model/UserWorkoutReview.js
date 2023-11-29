import mongoose from "mongoose";

const UserWorkoutReviewSchema = mongoose.Schema({
    php_id: {
        type: Number,
        default: 0
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user_register"
    },
    php_user_id: {
        type: Number
    },
    plan_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "plan"
    },
    php_plan_id: {
        type: Number
    },
    workout_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "workouts"
    },
    php_workout_id: {
        type: Number
    },
    user_review: {
        type: String
    }
}, { timestamps: true })

const UserWorkoutReview = mongoose.model("userworkoutreview", UserWorkoutReviewSchema)
export default UserWorkoutReview