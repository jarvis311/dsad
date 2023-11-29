import mongoose from "mongoose";

const ExercisesSchema = mongoose.Schema({
    php_id: {
        type: Number,
        default: 0
    },
    series_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'plan'
    },
    php_series_id: {
        type: Number,
    },
    workout_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'workouts'
    },
    php_workout_id: {
        type: Number,
    },
    status: {
        type: Number,
        enum: [1, 0],
        default: 1    /* 1 -> Active, 0 -> DeActive */
    }
}, { timestamps: true })

const Exercises = mongoose.model('exercise', ExercisesSchema)
export default Exercises