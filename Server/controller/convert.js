import mysql from 'mysql'
import { CatchErrors, ResponseSuccessConvert } from '../ResponseMsg/ResponseMsg.js';
import { HttpStatus } from '../helper/helper.js';
import Categories from '../model/Categories.js';
import Tags from '../model/Tags.js';
import PlanLevels from '../model/PlanLevels.js';
import Languages from '../model/Languages.js';
import FirstDayUnlocks from '../model/FirstDayUnlocks.js';
import Sounds from '../model/Sounds.js';
import PosesLists from '../model/PosesLists.js';
import BackgroundAudio from '../model/BackgroundAudio.js';
import Plan from '../model/Plan.js';
import PlanTags from '../model/PlanTags.js';
import Workout from '../model/Workouts.js';
import Exercises from '../model/Exercises.js';
import ExercisesPoses from '../model/Exercisesposes.js';
import UserRegister from '../model/UserRegister.js';
import UserFcmToken from '../model/UserFcmToken.js';
import UserWorkoutReview from '../model/UserWorkoutReview.js';
import UserWorkout from '../model/Userworkout.js';
import GuestToken from '../model/GuestToken.js';
const { Ok_Status, Not_Found, Forbidden } = HttpStatus


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "saumya_yoga"
});

const ConvertCategories = async function (req, res) {
    try {
        con.connect(function (error) {
            if (error) throw error
            con.query("SELECT * FROM `categories` WHERE `deleted_at` IS NULL", function (err, result) {
                if (err) throw err
                Promise.all(
                    result.map(async (val, index) => {
                        var data = {
                            php_id: val.id,
                            index: val.index,
                            category_name: val.category_name,
                            createdAt: val.created_at,
                            updatedAt: val.updated_at
                        }
                        await Categories.create(data)
                    })
                ).then(async () => {
                    return res.json(await ResponseSuccessConvert(" Categories Data Convert SuccessFully"))
                })
            })
        })
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const ConvertTag = async function (req, res) {
    try {
        con.connect(function (error) {
            if (error) throw error
            con.query("SELECT * FROM `tags` WHERE 1", function (err, result) {
                if (err) throw err
                Promise.all(
                    result.map(async (val, index) => {
                        var data = {
                            php_id: val.id,
                            name: val.name,
                            service_name: val.service_name,
                            status: val.status,
                            createdAt: val.created_at,
                            updatedAt: val.updated_at
                        }
                        await Tags.create(data)
                    })
                ).then(async () => {
                    return res.json(await ResponseSuccessConvert("Tags Data Convert SuccessFully"))
                })
            })
        })
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const ConvertPlanLevel = async function (req, res) {
    try {
        con.connect(function (error) {
            if (error) throw error
            con.query("SELECT * FROM `plan_levels` WHERE `deleted_at` IS NULL", function (err, result) {
                if (err) throw err
                Promise.all(
                    result.map(async (val, index) => {
                        var data = {
                            php_id: val.id,
                            plan_level: val.plan_level,
                            createdAt: val.created_at,
                            updatedAt: val.updated_at
                        }
                        await PlanLevels.create(data)
                    })
                ).then(async () => {
                    return res.json(await ResponseSuccessConvert("Plan Level Data Convert SuccessFully"))
                })
            })
        })
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const ConvertLanguages = async function (req, res) {
    try {
        con.connect(function (error) {
            if (error) throw error
            con.query("SELECT * FROM `languages` WHERE `deleted_at` IS NULL", function (err, result) {
                if (err) throw err
                Promise.all(
                    result.map(async (val, index) => {
                        var data = {
                            php_id: val.id,
                            language: val.language,
                            language_code: val.language_code,
                            createdAt: val.created_at,
                            updatedAt: val.updated_at
                        }
                        await Languages.create(data)
                    })
                ).then(async () => {
                    return res.json(await ResponseSuccessConvert("Languages Data Convert SuccessFully"))
                })
            })
        })
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const Convertfirstdayunlocks = async function (req, res) {
    try {
        con.connect(function (error) {
            if (error) throw error
            con.query("SELECT * FROM `first_day_unlocks` WHERE `deleted_at` IS NULL", function (err, result) {
                if (err) throw err
                Promise.all(
                    result.map(async (val, index) => {
                        var data = {
                            php_id: val.id,
                            status: val.status,
                            subscription: val.subscription,
                            subscription_required_ios: val.subscription_required_ios,
                            plans_local_free_ios: val.plans_local_free_ios,
                            plans_local_free_android: val.plans_local_free_android,
                            plans_local_showfirst_ios: val.plans_local_showfirst_ios,
                            plans_local_showfirst_android: val.plans_local_showfirst_android,
                            createdAt: val.created_at,
                            updatedAt: val.updated_at
                        }
                        await FirstDayUnlocks.create(data)
                    })
                ).then(async () => {
                    return res.json(await ResponseSuccessConvert("First Day Unlocks Data Convert SuccessFully"))
                })
            })
        })
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const ConvertSounds = async function (req, res) {
    try {
        con.connect(function (error) {
            if (error) throw error
            con.query("SELECT * FROM `sounds` WHERE `deleted_at` IS NULL", function (err, result) {
                if (err) throw err
                Promise.all(
                    result.map(async (val, index) => {
                        var categoryid = await Categories.findOne({ php_id: val.category_id })
                        var planlevelid = await PlanLevels.findOne({ php_id: val.plan_level_id })

                        var data = {
                            php_id: val.id,
                            index: val.index,
                            category_id: categoryid._id,
                            plan_level_id: planlevelid._id,
                            php_category_id: val.category_id,
                            php_plan_level_id: val.plan_level_id,
                            name: val.name,
                            url: val.url,
                            time: val.time,
                            previewThumb: val.previewThumb,
                            backgroundGIF: val.backgroundGIF,
                            is_free: val.is_free,
                            createdAt: val.created_at,
                            updatedAt: val.updated_at
                        }
                        await Sounds.create(data)
                    })
                ).then(async () => {
                    return res.json(await ResponseSuccessConvert("Sounds Data Convert SuccessFully"))
                })
            })
        })
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const ConvertPosesLists = async function (req, res) {
    try {
        con.connect(function (error) {
            if (error) throw error
            con.query("SELECT * FROM `poses_lists` WHERE `deleted_at` IS NULL", function (err, result) {
                if (err) throw err
                Promise.all(
                    result.map(async (val, index) => {
                        var data = {
                            php_id: val.id,
                            pose_no: val.pose_no,
                            name: val.name,
                            preview: val.preview,
                            media_type: val.media_type,
                            media_url: val.media_url,
                            activity_time: val.activity_time,
                            createdAt: val.created_at,
                            updatedAt: val.updated_at
                        }
                        await PosesLists.create(data)
                    })
                ).then(async () => {
                    return res.json(await ResponseSuccessConvert("Poses Lists Data Convert SuccessFully"))
                })
            })
        })
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const ConvertBackgroundAudio = async function (req, res) {
    try {
        con.connect(function (error) {
            if (error) throw error
            con.query("SELECT * FROM `background_audio` WHERE `deleted_at` IS NULL", function (err, result) {
                if (err) throw err
                Promise.all(
                    result.map(async (val, index) => {
                        var poseslistid = await PosesLists.findOne({ php_id: val.poses_list_id })
                        var languageid = await Languages.findOne({ php_id: val.language_id })

                        var data = {
                            php_id: val.id,
                            php_poses_list_id: val.poses_list_id,
                            poses_list_id: poseslistid._id,
                            php_language_id: val.language_id,
                            language_id: languageid._id,
                            audio: val.audio,
                            createdAt: val.created_at,
                            updatedAt: val.updated_at
                        }
                        await BackgroundAudio.create(data)
                    })
                ).then(async () => {
                    return res.json(await ResponseSuccessConvert("Background Audio Data Convert SuccessFully"))
                })
            })
        })
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const ConvertPlan = async function (req, res) {
    try {
        con.connect(function (error) {
            if (error) throw error
            con.query("SELECT * FROM `plan` WHERE `deleted_at` IS NULL", function (err, result) {
                if (err) throw err
                Promise.all(
                    result.map(async (val, index) => {
                        var planlevelid = await PlanLevels.findOne({ php_id: val.plan_level_id })
                        var data = {
                            php_id: val.plan_id,
                            index: val.position,
                            plan_name: val.plan_name,
                            plan_active_users: val.plan_active_users,
                            plan_total_completions: val.plan_total_completions,
                            plan_description: val.plan_description,
                            plan_preview_image: val.plan_preview_image,
                            short_video_url: val.short_video_url,
                            intro_video_url: val.intro_video_url,
                            gif_url: val.gif_url,
                            plan_level_id: planlevelid._id,
                            php_plan_level_id: val.plan_level_id,
                            type: val.type,
                            status: val.status,
                            createdAt: val.created_at,
                            updatedAt: val.updated_at
                        }
                        await Plan.create(data)
                    })
                ).then(async () => {
                    return res.json(await ResponseSuccessConvert("Plan Data Convert SuccessFully"))
                })
            })
        })
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const ConvertPlanTag = async function (req, res) {
    try {
        con.connect(function (error) {
            if (error) throw error
            con.query("SELECT * FROM `plan_tags`", function (err, result) {
                if (err) throw err
                Promise.all(
                    result.map(async (val, index) => {
                        var planid = await Plan.findOne({ php_id: val.plan_id })
                        var tag_id = await Tags.findOne({ php_id: val.tag_id })

                        var data = {
                            php_id: val.id,
                            php_plan_id: val.plan_id,
                            plan_id: planid._id,
                            php_tag_id: val.tag_id,
                            tag_id: tag_id._id,
                            createdAt: val.created_at,
                            updatedAt: val.updated_at
                        }
                        await PlanTags.create(data)
                    })
                ).then(async () => {
                    return res.json(await ResponseSuccessConvert("Plan Tag Data Convert SuccessFully"))
                })
            })
        })
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const ConvertWorkout = async function (req, res) {
    try {
        con.connect(function (error) {
            if (error) throw error
            con.query("SELECT * FROM `workouts` WHERE `deleted_at` IS NULL", function (err, result) {
                if (err) throw err
                Promise.all(
                    result.map(async (val, index) => {
                        var planid = await Plan.findOne({ php_id: val.plan_id })
                        var data = {
                            php_id: val.id,
                            php_plan_id: val.plan_id,
                            plan_id: planid._id,
                            workout_name: val.workout_name,
                            duration: val.duration,
                            calories: val.calories,
                            status: val.status,
                            is_free: val.is_free,
                            createdAt: val.created_at,
                            updatedAt: val.updated_at
                        }
                        await Workout.create(data)
                    })
                ).then(async () => {
                    return res.json(await ResponseSuccessConvert("Workout Data Convert SuccessFully"))
                })
            })
        })
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const ConvertExercises = async function (req, res) {
    try {
        con.connect(function (error) {
            if (error) throw error
            con.query("SELECT * FROM `exercises` WHERE `deleted_at` IS NULL", function (err, result) {
                if (err) throw err
                Promise.all(
                    result.map(async (val, index) => {
                        var Seriesid = await Plan.findOne({ php_id: val.series_id })
                        var Workoutid = await Workout.findOne({ php_id: val.workout_id })
                        var data = {
                            php_id: val.id,
                            series_id: Seriesid._id,
                            php_series_id: val.series_id,
                            workout_id: Workoutid._id,
                            php_workout_id: val.workout_id,
                            status: val.status,
                            createdAt: val.created_at,
                            updatedAt: val.updated_at
                        }
                        await Exercises.create(data)
                    })
                ).then(async () => {
                    return res.json(await ResponseSuccessConvert("Exercises Data Convert SuccessFully"))
                })
            })
        })
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const ConvertExercisesPoses = async function (req, res) {
    try {
        con.connect(function (error) {
            if (error) throw error
            con.query("SELECT * FROM `exercise_poses` WHERE `deleted_at` IS NULL", function (err, result) {
                if (err) throw err
                Promise.all(
                    result.map(async (val, index) => {
                        var exerciseid = await Exercises.findOne({ php_id: val.exercise_id })
                        var poseslistid = await PosesLists.findOne({ php_id: val.poses_list_id })
                        if (exerciseid && poseslistid) {
                            var data = {
                                php_id: val.id,
                                index: val.index,
                                php_exercise_id: val.exercise_id,
                                exercise_id: exerciseid._id,
                                php_poses_list_id: val.poses_list_id,
                                poses_list_id: poseslistid._id,
                                createdAt: val.created_at,
                                updatedAt: val.updated_at
                            }
                            await ExercisesPoses.create(data)
                        }
                    })
                ).then(async () => {
                    return res.json(await ResponseSuccessConvert("Exercises Poses Data Convert SuccessFully"))
                })
            })
        })
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const ConvertUserRegister = async function (req, res) {
    try {
        con.connect(function (error) {
            if (error) throw error
            con.query("SELECT * FROM `user_register` WHERE `deleted_at` IS NULL", function (err, result) {
                if (err) throw err
                Promise.all(


                    result.map(async (val, index) => {
                        if (val.expiry_date) {
                            var dateArray = val.expiry_date.split(" ")
                            var date = dateArray[0].split("-")
                            var expiredate = new Date(date[2] + "-" + date[1] + "-" + date[0] + " " + dateArray[1])
                        }

                        var data = {
                            php_id: val.user_id,
                            user_name: val.user_name,
                            user_email: val.user_email,
                            user_password: val.user_password,
                            user_platform: val.user_platform,
                            is_subscribe: val.is_subscribe,
                            subscription_platform: val.subscription_platform,
                            sku: val.sku,
                            purchase_time: val.purchase_time,
                            expiry_date: (expiredate) ? expiredate : null,
                            is_free_trial: val.is_free_trial,
                            is_purchased: val.is_purchased,
                            no_of_days: val.no_of_days,
                            gender: val.gender,
                            currentBodyType: val.currentBodyType,
                            targetBodyTyp: val.targetBodyTyp,
                            flexibilityLevel: val.flexibilityLevel,
                            sedentoryLifestyle: val.sedentoryLifestyle,
                            stamina: val.stamina,
                            physicalActive: val.physicalActive,
                            WorkOn: val.WorkOn,
                            Goal: val.Goal,
                            HeightParamater: val.HeightParamater,
                            WeightParamater: val.WeightParamater,
                            TargetWeightIn: val.TargetWeightIn,
                            HeightIN: val.HeightIN,
                            HeightCM: val.HeightCM,
                            WeightLB: val.WeightLB,
                            WeightKG: val.WeightKG,
                            TargetWeightLB: val.TargetWeightLB,
                            TargetWeightKG: val.TargetWeightKG,
                            Age: val.Age,
                            device_token: val.device_token,
                            device_platform: val.device_platform,
                            createdAt: val.created_at,
                            updatedAt: val.updated_at
                        }
                        await UserRegister.create(data)
                    })
                ).then(async () => {
                    return res.json(await ResponseSuccessConvert("UserRegister Data Convert SuccessFully"))
                })
            })
        })
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const ConvertUserFcmToken = async function (req, res) {
    try {
        con.connect(function (error) {
            if (error) throw error
            con.query("SELECT * FROM `user_fcm_token` WHERE `deleted_at` IS NULL", function (err, result) {
                if (err) throw err
                Promise.all(
                    result.map(async (val, index) => {
                        var userid = await UserRegister.findOne({ php_id: val.user_id })
                        if (userid) {
                            var data = {
                                php_id: val.id,
                                php_user_id: val.user_id,
                                user_id: userid._id,
                                fcm_token: val.fcm_token,
                                createdAt: val.created_at,
                                updatedAt: val.updated_at
                            }
                            await UserFcmToken.create(data)
                        }
                    })
                ).then(async () => {
                    return res.json(await ResponseSuccessConvert("User Fcm Token  Data Convert SuccessFully"))
                })
            })
        })
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const ConvertUserWorkoutReview = async function (req, res) {
    try {
        con.connect(function (error) {
            if (error) throw error
            con.query("SELECT * FROM `user_workout_review` WHERE `deleted_at` IS NULL", function (err, result) {
                if (err) throw err
                Promise.all(
                    result.map(async (val, index) => {
                        var userid = await UserRegister.findOne({ php_id: val.user_id })
                        var planid = await Plan.findOne({ php_id: val.plan_id })
                        var workoutid = await Workout.findOne({ php_id: val.workout_id })

                        if (userid && planid && workoutid) {
                            var data = {
                                php_id: val.id,
                                user_id: userid._id,
                                php_user_id: val.user_id,
                                plan_id: planid._id,
                                php_plan_id: val.plan_id,
                                workout_id: workoutid._id,
                                php_workout_id: val.workout_id,
                                user_review: val.user_review,
                                createdAt: val.created_at,
                                updatedAt: val.updated_at
                            }
                            await UserWorkoutReview.create(data)
                        }
                    })
                ).then(async () => {
                    return res.json(await ResponseSuccessConvert("User Workout Review Data Convert SuccessFully"))
                })
            })
        })
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const ConvertUserWorkouts = async function (req, res) {
    try {
        con.connect(function (error) {
            if (error) throw error
            con.query("SELECT * FROM `user_workout` WHERE `deleted_at` IS NULL", function (err, result) {
                if (err) throw err
                Promise.all(
                    result.map(async (val, index) => {
                        var userid = await UserRegister.findOne({ php_id: val.user_register_id })
                        var planid = await Plan.findOne({ php_id: val.plan_id })
                        var workoutid = await Workout.findOne({ php_id: val.user_completed_workout_id })
                        var data = {
                            php_id: val.id,
                            php_user_register_id: val.user_register_id,
                            php_plan_id: val.plan_id,
                            user_join_plan: val.user_join_plan,
                            user_completed_workout: val.user_completed_workout,
                            php_user_completed_workout_id: val.user_completed_workout_id,
                            user_completed_plan: val.user_completed_plan,
                            createdAt:val.created_at,
                            updatedAt:val.updated_at
                        }

                        if (userid) {
                            data.user_register_id = userid._id
                        }

                        if (planid) {
                            data.plan_id = planid._id
                        }

                        if (workoutid) {
                            data.user_completed_workout_id = workoutid._id
                        }

                        await UserWorkout.create(data)
                    })
                ).then(async () => {
                    return res.json(await ResponseSuccessConvert("User Workout Data Convert SuccessFully"))
                })
            })
        })
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const ConvertGuestTokens = async function (req, res) {
    try {
        con.connect(function (error) {
            if (error) throw error
            con.query("SELECT * FROM `guest_token` WHERE `deleted_at` IS NULL", function (err, result) {
                if (err) throw err
                Promise.all(
                    result.map(async (val, index) => {
                        var data = {
                            php_id: val.id,
                            device_token: val.device_token,
                            createdAt:val.created_at,
                            updatedAt:val.updated_at
                        }
                        await GuestToken.create(data)
                    })
                ).then(async () => {
                    return res.json(await ResponseSuccessConvert("Guest Token Data Convert SuccessFully"))
                })
            })
        })
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}



export {
    ConvertCategories, ConvertTag, ConvertPlanLevel, ConvertLanguages, Convertfirstdayunlocks, ConvertSounds, ConvertPosesLists,
    ConvertBackgroundAudio, ConvertPlan, ConvertPlanTag, ConvertWorkout, ConvertExercises, ConvertExercisesPoses, ConvertUserRegister,
    ConvertUserFcmToken, ConvertUserWorkoutReview, ConvertUserWorkouts, ConvertGuestTokens
}