import mongoose from "mongoose";

const ExercisesPosesSchema = mongoose.Schema({
    php_id: {
        type: Number,
        default: 0
    },
    index: {
        type: Number
    },
    php_exercise_id: {
        type: Number,
    },
    exercise_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'exercise'
    },
    php_poses_list_id: {
        type: Number,
    },
    poses_list_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "poseslists"
    }
}, { timestamps: true })

const ExercisesPoses = mongoose.model('exercisesposes', ExercisesPosesSchema)
export default ExercisesPoses