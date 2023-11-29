import mongoose from "mongoose"
import { CatchErrors, ResponseErrorApi, ResponseWithDataApi, ResponseWithDataPagginationApi, ResponseWithTrueApi } from "../ResponseMsg/ResponseMsg.js"
import Workout from "../model/Workouts.js"
import { HttpStatus, SendMail, notificationFunc } from "../helper/helper.js"
import Exercises from "../model/Exercises.js"
import ExercisesPoses from "../model/Exercisesposes.js"
import Categories from "../model/Categories.js"
import UserRegister from "../model/UserRegister.js"
import md5 from "md5"
import UserFcmToken from "../model/UserFcmToken.js"
import config from "../config.js"
import Plan from "../model/Plan.js"
import UserWorkout from "../model/Userworkout.js"
import UserWorkoutReview from "../model/UserWorkoutReview.js"
import dayjs from "dayjs"
import GuestToken from "../model/GuestToken.js"
import FirstDayUnlocks from "../model/FirstDayUnlocks.js"
const { Ok_Status, Not_Found, Forbidden } = HttpStatus

const series_workout_list = async (req, res) => {
    try {
        if (!req.body.plan_id || req.body.plan_id == "") {
            return res.json(await ResponseErrorApi("Plan Id Required"))
        }

        var plan_id = parseInt(req.body.plan_id)
        var Result = await Workout.aggregate([
            {
                $match: { $and: [{ php_plan_id: plan_id }, { status: 1 }] }
            },
            {
                $project: { _id: 0, 'id': '$php_id', 'plan_id': '$php_plan_id', is_free: 1, duration: 1, calories: 1 }
            },
        ])

        Promise.all(
            Result.map(async (val) => {
                var WorkoutCount = await Exercises.find({ workout_id: val._id }).count()
                val.workout_exercise_count = WorkoutCount
            })
        ).then(async () => {
            if (Result.length == 0) {
                return res.json(await ResponseErrorApi("Recode Not Found"))
            }
            else {
                return res.json(await ResponseWithDataApi(Result))
            }
        })
    } catch (error) {
        notificationFunc("Series Workout List Api Is Down",error.message)
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const final_workout_routin = async (req, res) => {
    try {
        if (!req.body.workout_id || req.body.workout_id == "") {
            return res.json(await ResponseErrorApi("Enter Workout Id"))
        }

        var plan_id = parseInt(req.body.plan_id)
        var workout_id = parseInt(req.body.workout_id)

        var Excercise = await Exercises.find({ php_workout_id: workout_id }).distinct('_id')
        var Exercise_Poses = await ExercisesPoses.aggregate([
            {
                $match: { exercise_id: { $in: Excercise } }
            },
            {
                $lookup: {
                    from: "poseslists",
                    localField: "poses_list_id",
                    foreignField: "_id",
                    pipeline: [
                        {
                            $project: { _id: 1, php_id: 1, name: 1, preview: 1, media_type: 1, media_url: 1, activity_time: 1 }
                        },
                        {
                            $lookup: {
                                from: "backgroundaudios",
                                localField: "_id",
                                foreignField: "poses_list_id",
                                pipeline: [
                                    {
                                        $lookup: {
                                            from: "languages",
                                            localField: "language_id",
                                            foreignField: "_id",
                                            pipeline: [{
                                                $project: { _id: 0, 'id': '$php_id', language_code: 1 }
                                            }],
                                            as: "language_name"
                                        }
                                    },
                                    {
                                        $unwind: '$language_name'
                                    },
                                    {
                                        $project: { _id: 1, 'id': '$php_id', 'poses_list_id': '$php_poses_list_id', 'language_id': '$php_language_id', audio: 1, language_name: 1 }
                                    },
                                ],
                                as: "background_audio"
                            }
                        }
                    ],
                    as: "poseslists"
                }
            },
            {
                $unwind: "$poseslists"
            },
            {
                $sort: { index: 1 }
            },
            {
                $project: { "_id": "$poseslists._id", "id": "$poseslists.php_id", "name": "$poseslists.name", "preview": "$poseslists.preview", "media_type": "$poseslists.media_type", "media_url": "$poseslists.media_url", "activity_time": "$poseslists.activity_time", "background_audio": "$poseslists.background_audio" }
            }
        ])

        if (Exercise_Poses.length == 0) {
            return res.json(await ResponseErrorApi("Recode Not Found"))
        }
        else {
            return res.json(await ResponseWithDataApi(Exercise_Poses))
        }
    } catch (error) {
        notificationFunc("Final Workout Routin Api Is Down",error.message)
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const meditationSounds = async (req, res) => {
    try {
        var page = (!req.query.page || req.query.page == "" || req.query.page == 0) ? 1 : parseInt(req.query.page)
        var limit = (!req.query.limit || req.query.limit == "" || req.query.limit == 0) ? 10 : parseInt(req.query.limit)
        var skip = ((limit) * ((page) - 1));
        var CategoryData = await Categories.find({})
        var Total_Page = Math.ceil(CategoryData.length / limit);

        if (Total_Page < page) {
            return res.json(await ResponseErrorApi("Recode Not Found"))
        }
        else {
            var Category = await Categories.aggregate([
                {
                    $sort: { index: 1 }
                },
                {
                    $lookup: {
                        from: "sounds",
                        localField: "_id",
                        foreignField: "category_id",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "planlevels",
                                    localField: "plan_level_id",
                                    foreignField: "_id",
                                    pipeline: [
                                        {
                                            $project: { _id: 0, 'id': '$php_id', plan_level: 1 }
                                        }
                                    ],
                                    as: "level"
                                }
                            },
                            {
                                $unwind: "$level"
                            },
                            {
                                $sort: { index: 1 }
                            },
                            {
                                $project: { _id: 1, 'id': '$php_id', 'category_id': '$php_category_id', 'plan_level_id': '$php_plan_level_id', name: 1, url: 1, time: 1, previewThumb: 1, backgroundGIF: 1, is_free: 1, level: 1 }
                            }
                        ],
                        as: "sounds"
                    }
                },
                {
                    $project: { _id: 1, 'id': '$php_id', category_name: 1, sounds: 1 }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                },
            ])


            Promise.all(
                Category.map((val) => {
                    val.total_sounds_count = val.sounds.length
                })
            ).then(async () => {
                if (Category.length == 0) {
                    return res.json(await ResponseErrorApi("Recode Not Found"))
                }
                else {
                    return res.json(await ResponseWithDataPagginationApi(Category, Total_Page))
                }
            })
        }
    } catch (error) {
        notificationFunc("MeditationSounds Api Is Down",error.message)
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const user_login = async (req, res) => {
    try {
        var version_code
        if (req.body.devicePlatform || req.body.devicePlatform == "iOS") {
            version_code = req.body.vesrion_code
        }

        if (req.body.devicePlatform || req.body.devicePlatform == "Android") {
            version_code = req.body.vesrion_code
        }

        var user_password = req.body.user_password
        if (!req.body.user_email || req.body.user_email == "") {
            return res.json(await ResponseErrorApi("Email Required"))
        }


        if (req.body.vesrion_code && req.body.vesrion_code >= version_code) {
            if (req.body.gender) {
                var user_register = await UserRegister.findOne({ user_email: req.body.user_email })
                if (!user_register) {
                    if (!user_password || user_password == "") {
                        return res.json(await ResponseErrorApi("Password Required"))
                    }
                    else {
                        user_password = md5(req.body.user_password)
                    }
                }
                else {
                    if (user_register.user_password == null) {
                        if (!user_password || user_password == "") {
                            return res.json(await ResponseErrorApi("Password Required"))
                        }
                        else {
                            user_password = md5(req.body.user_password)
                        }
                    }
                    else {
                        return res.json(await ResponseErrorApi("Email Already Exist"))
                    }
                }
            }
            else {
                var user_register = await UserRegister.findOne({ user_email: req.body.user_email })
                if (!user_register) {
                    return res.json(await ResponseErrorApi("User Not Found"))
                }
                else {
                    if (!user_password || user_password == "") {
                        return res.json(await ResponseErrorApi("Password Required"))
                    }
                    else {
                        var checkCredential = await UserRegister.findOne({ $and: [{ user_email: req.body.user_email }, { user_password: md5(req.body.user_password) }] })
                        if (!checkCredential) {
                            return res.json(await ResponseErrorApi("Incorrect Credential"))
                        }
                        else {
                            user_password = checkCredential.user_password
                        }
                    }
                }

                if (req.body.device_token && req.body.device_token != "") {
                    var user_token = await UserFcmToken.findOne({ $and: [{ _id: user_register._id }, { fcm_token: req.body.device_token }] })
                    if (!user_token) {
                        var phpid = await UserFcmToken.findOne({}).sort({ php_id: -1 })
                        const userfcmtoken = {
                            php_id: (phpid) ? phpid.php_id + 1 : 0,
                            php_user_id: user_register.php_id,
                            user_id: user_register._id,
                            fcm_token: req.body.device_token
                        }
                        await UserFcmToken.create(userfcmtoken)
                    }
                }
            }
        }
        else {
            if (!req.body.user_platform || req.body.user_platform == "") {
                return res.json(await ResponseErrorApi("User Platform Required"))
            }
            var user_register = await UserRegister.findOne({ 'user_email': req.body.user_email })
        }

        var user_email = (req.body.user_email) ? req.body.user_email.toLowerCase() : ""
        var user_platform = (req.body.user_platform) ? req.body.user_platform : ""
        var gender = (req.body.gender) ? req.body.gender : (user_register?.gender) ? user_register?.gender : ""
        var currentBodyType = (req.body.currentBodyType) ? req.body.currentBodyType : (user_register?.currentBodyType) ? user_register?.currentBodyType : ""
        var targetBodyTyp = (req.body.targetBodyTyp) ? req.body.targetBodyTyp : (user_register?.targetBodyTyp) ? user_register?.targetBodyTyp : ""
        var flexibilityLevel = (req.body.flexibilityLevel) ? req.body.flexibilityLevel : (user_register?.flexibilityLevel) ? user_register?.flexibilityLevel : ""
        var sedentoryLifestyle = (req.body.sedentoryLifestyle) ? req.body.sedentoryLifestyle : (user_register?.sedentoryLifestyle) ? user_register?.sedentoryLifestyle : ""
        var stamina = (req.body.stamina) ? req.body.stamina : (user_register?.stamina) ? user_register?.stamina : ""
        var physicalActive = (req.body.physicalActive) ? req.body.physicalActive : (user_register?.physicalActive) ? user_register?.physicalActive : ""
        var Goal = (req.body.Goal) ? req.body.Goal : (user_register?.Goal) ? user_register?.Goal : ""
        var WorkOn = (req.body.WorkOn) ? req.body.WorkOn : (user_register?.WorkOn) ? user_register?.WorkOn : ""
        var HeightParamater = (req.body.HeightParamater) ? req.body.HeightParamater : (user_register?.HeightParamater) ? user_register?.HeightParamater : ""
        var WeightParamater = (req.body.WeightParamater) ? req.body.WeightParamater : (user_register?.WeightParamater) ? user_register?.WeightParamater : ""
        var TargetWeightIn = (req.body.TargetWeightIn) ? req.body.TargetWeightIn : (user_register?.TargetWeightIn) ? user_register?.TargetWeightIn : ""
        var HeightIN = (req.body.HeightIN) ? req.body.HeightIN : (user_register?.HeightIN) ? user_register?.HeightIN : ""
        var HeightCM = (req.body.HeightCM) ? req.body.HeightCM : (user_register?.HeightCM) ? user_register?.HeightCM : ""
        var WeightLB = (req.body.WeightLB) ? req.body.WeightLB : (user_register?.WeightLB) ? user_register?.WeightLB : ""
        var WeightKG = (req.body.WeightKG) ? req.body.WeightKG : (user_register?.WeightKG) ? user_register?.WeightKG : ""
        var TargetWeightLB = (req.body.TargetWeightLB) ? req.body.TargetWeightLB : (user_register?.TargetWeightLB) ? user_register?.TargetWeightLB : ""
        var TargetWeightKG = (req.body.TargetWeightKG) ? req.body.TargetWeightKG : (user_register?.TargetWeightKG) ? user_register?.TargetWeightKG : ""
        var Age = (req.body.Age) ? req.body.Age : (user_register?.Age) ? user_register?.Age : ""
        var sku = (user_register?.sku) ? user_register?.sku : null
        var purchase_time = (user_register?.purchase_time) ? user_register?.purchase_time : null
        var expiry_date = (user_register?.expiry_date) ? user_register?.expiry_date : null
        var is_free_trial = (user_register?.is_free_trial) ? user_register?.is_free_trial : 0
        var is_purchased = (user_register?.is_purchased) ? user_register?.is_purchased : 0
        var no_of_days = (user_register?.no_of_days) ? user_register?.no_of_days : 0
        var device_platform = (req.body.devicePlatform) ? req.body.devicePlatform : null

        if (user_register?.device_token && user_register?.device_token != "") {
            var old_token = (user_register?.device_token) ? user_register?.device_token.split(",") : Array()
        }
        else {
            var old_token = Array()
        }

        var new_token = req.body.device_token
        var mergetoken = old_token.concat(new_token);
        var device_token = mergetoken.filter((item, index) => mergetoken.indexOf(item) === index);

        var userphpid = await UserRegister.findOne({}).sort({ php_id: -1 })
        var InputData = {
            user_email: user_email,
            user_platform: user_platform,
            user_password: user_password,
            is_subscribe: (user_register?.is_subscribe) ? user_register?.is_subscribe : 0,
            subscription_platform: (user_register?.subscription_platform) ? user_register?.subscription_platform : null,
            gender: gender,
            currentBodyType: currentBodyType,
            targetBodyTyp: targetBodyTyp,
            flexibilityLevel: flexibilityLevel,
            sedentoryLifestyle: sedentoryLifestyle,
            stamina: stamina,
            physicalActive: physicalActive,
            Goal: Goal,
            WorkOn: WorkOn,
            HeightParamater: HeightParamater,
            WeightParamater: WeightParamater,
            TargetWeightIn: TargetWeightIn,
            HeightIN: HeightIN,
            HeightCM: HeightCM,
            WeightLB: WeightLB,
            WeightKG: WeightKG,
            TargetWeightLB: TargetWeightLB,
            TargetWeightKG: TargetWeightKG,
            Age: Age,
            device_token: device_token.toString(),
            sku: sku,
            purchase_time: purchase_time,
            expiry_date: expiry_date,
            is_free_trial: is_free_trial,
            is_purchased: is_purchased,
            no_of_days: no_of_days,
            device_platform: device_platform
        }


        if (user_register) {
            var Result = await UserRegister.updateOne({ user_email: user_email }, InputData)
            InputData.user_id = user_register.php_id
            delete InputData.user_password
            delete InputData.sku
            delete InputData.purchase_time
            delete InputData.expiry_date
            delete InputData.is_free_trial
            delete InputData.is_purchased
            delete InputData.no_of_days
            delete InputData.subscription_platform
            return res.json(await ResponseWithDataApi(InputData))
        }
        else if (!user_register && req.body.gender) {
            InputData.php_id = (userphpid) ? userphpid.php_id + 1 : 0
            var Result = await UserRegister.create(InputData)
            InputData.user_id = Result.php_id
            delete InputData.user_password
            delete InputData.sku
            delete InputData.purchase_time
            delete InputData.expiry_date
            delete InputData.is_free_trial
            delete InputData.is_purchased
            delete InputData.no_of_days
            delete InputData.subscription_platform
            return res.json(await ResponseWithDataApi(InputData))
        }
        else if (!user_register) {
            return res.json(await ResponseErrorApi("Failed"))
        }
        else {
            return res.json(await ResponseWithDataApi(user_register))
        }
    } catch (error) {
        notificationFunc("User Login Api Is Down",error.message)
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const user_delete_profile = async (req, res) => {
    try {
        if (!req.body.user_id || req.body.user_id == "") {
            return res.json(await ResponseErrorApi("Enter User Id"))
        }
        
        var id = parseInt(req.body.user_id)
        var user_delete = await UserRegister.deleteOne({ php_id: id })
        if (user_delete.deletedCount > 0) {
            var workout = await UserWorkout.deleteMany({ php_user_register_id: id })  
            return res.json(await ResponseWithTrueApi())
        }
        else {
            return res.json(await ResponseErrorApi("User Not Found"))
        }

    } catch (error) {
        notificationFunc("User Delete Profile Api Is Down",error.message)
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const user_change_password = async (req, res) => {
    try {
        if (!req.body.user_id || req.body.user_id == "") {
            return res.json(await ResponseErrorApi("Enter User Id"))
        }

        if (!req.body.user_old_password || req.body.user_old_password == "") {
            return res.json(await ResponseErrorApi("Enter Current Password"))
        }

        var userid = parseInt(req.body.user_id)
        var user_check = await UserRegister.findOne({ php_id: userid })
        if (!user_check) {
            return res.json(await ResponseErrorApi("User Not Exist"))
        }
        else {
            var oldPassword = user_check.user_password
            if (oldPassword == md5(req.body.user_old_password)) {
                var ChangePassword = await UserRegister.updateOne({ php_id: userid }, { user_password: md5(req.body.user_new_password) })
                if (ChangePassword) {
                    return res.json(await ResponseWithDataApi())
                }
            }
            else {
                return res.json(await ResponseErrorApi("incorrect old password"))
            }
        }

    } catch (error) {
        notificationFunc("User Change Password Api Is Down",error.message)
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const change_user_address = async (req, res) => {
    try {
        if (!req.body.user_id || req.body.user_id == "") {
            return res.json(await ResponseErrorApi("Enter User Id"))
        }

        var userid = parseInt(req.body.user_id)
        var user_check = await UserRegister.findOne({ php_id: userid })
        if (user_check?.user_platform == "Apple" || user_check?.user_platform == "Facebook") {
            if (!req.body.user_email || req.body.user_email == "") {
                return res.json(await ResponseErrorApi("Enter Email"))
            }
            else {
                if (!req.body.user_password || req.body.user_password == "") {
                    return res.json(await ResponseErrorApi("Enter Password"))
                }
                var email_check = await UserRegister.exists({ user_email: req.body.user_email })
                if (email_check) {
                    return res.json(await ResponseErrorApi("Email Already Exist"))
                }
                else {
                    var UpdatePassword = await UserRegister.updateOne({ php_id: userid }, { user_email: req.body.user_email, user_password: md5(req.body.user_password), user_platform: "" })
                    if (UpdatePassword.modifiedCount > 0) {
                        var data = {
                            user_email: req.body.user_email,
                            user_platform: ""
                        }
                        return res.json(await ResponseWithDataApi(data))
                    }
                    else {
                        return res.json(await ResponseErrorApi("Failed"))
                    }
                }
            }
        }
        else {
            return res.json(await ResponseErrorApi("User Not Found"))
        }
    } catch (error) {
        notificationFunc("Change User Address Api Is Down",error.message)
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const forgot_pwd = async (req, res) => {
    try {
        if (!req.body.user_email || req.body.user_email == "") {
            return res.json(await ResponseErrorApi("Enter Email"))
        }

        var user_check = await UserRegister.findOne({ user_email: req.body.user_email })
        if (user_check) {
            const user_id = user_check._id
            const public_path = 'https://epostalnews.com/wallpaper/wallpaper/20220812/empty-wood-table-top-on-blurred-background-premium-plank-626x417-preview.webp';
            const link = `${config.APP_URL}change_password/${user_id}`
            const subject = 'Reset Password For Saumya Yoga'
            const html = `<body style="margin: 0 !important;padding: 0 !important;box-sizing: border-box;background-color : #F7F7F7 !important;font-family: "roboto", sans-serif;">
            <div class="container" style="max-width: 750px;margin: 0 auto;">
              <div class="otp-text" style="text-align: center;">
                <h2 style="color: #4D4D4D;font-size: 32px;font-weight: bold;margin-bottom: 0;">Password Reset Request</h2>
                <p style="color: #AAAAAA; font-size: 18px;margin: 15px 0 30px;font-weight: 300;">We have received a password reset request from you.
                   <br>click on below button to reset your password
                </p>
                <button class="btn-otp" style=" background-color: #48ff1d;color: #fff;border-color: transparent;padding: 0.75rem 2.5rem;margin-right: 0;font-weight: bold;font-size: 17px;border-radius: 50px;appearance: none;margin-bottom: 15px;outline: none !important;"><a href=${link}>Click here</a></button>
              </div>
            </div>
            <footer style="max-width: 750px;margin: 0 auto;padding: 20px;background-color: #2E2E31;">
              <div style="text-align: center;">
                <img src=${public_path} class="appicon-img" style="width: 50px;max-width: 100%;height: auto;" alt="">
              </div>
              <div style="text-align: center;margin-top:10px;">
                <p style="margin-top: 5px;margin-bottom: 5px;color: #fff;font-size: 15px;">Somya</p>
              </div>
            </footer>
        </body>`

            const Response = await SendMail(req.body.user_email, subject, html)
            if (Response.Status == true) {
                return res.json(await ResponseWithDataApi())
            }
            else {
                console.log(Response)
            }

        }
        else {
            return res.json(await ResponseErrorApi("Email Not Exist"))
        }
    } catch (error) {
        notificationFunc("Forgot Pwd Api Is Down",error.message)
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const plan_list = async (req, res) => {
    try {
        var page = (!req.body.page || req.body.page == "" || req.body.page == 0) ? 1 : parseInt(req.body.page)
        var limit = (!req.body.limit || req.body.limit == "" || req.body.limit == 0) ? 10 : parseInt(req.body.limit)
        var skip = ((limit) * ((page) - 1));
        var type = (req.body.type) ? parseInt(req.body.type) : 1
        var PlanData = await Plan.find({ $and: [{ status: 1 }, { type: type }] })
        var Total_Page = Math.ceil(PlanData.length / limit);

        var user_id = parseInt(req.body.user_id)

        if (user_id != 0) {
            var user_register = await UserRegister.findOne({ php_id: user_id })
        }
        else {
            var user_register = true
        }

        console.log(user_register)

        if (!user_register) {
            return res.json(await ResponseErrorApi("User Not Found"))
        }
        else {
            var plan = await Plan.aggregate([
                {
                    $match: { $and: [{ status: 1 }, { type: type }] }
                },
                {
                    $sort: { index: 1 }
                },
                {
                    $lookup: {
                        from: "userworkouts",
                        localField: "_id",
                        foreignField: "plan_id",
                        pipeline: [
                            {
                                $match: {
                                    php_user_register_id: user_id
                                }
                            },
                            {
                                $lookup: {
                                    from: "workouts",
                                    localField: "user_completed_workout_id",
                                    foreignField: "_id",
                                    pipeline: [
                                        {
                                            $project: { _id: 0, 'id': '$php_id', workout_name: 1, duration: 1, calories: 1, is_free: 1 }
                                        }
                                    ],
                                    as: "user_next_workout"
                                }
                            },
                            {
                               // $unwind: "$user_next_workout"
                               "$unwind": { "path": "$user_next_workout", "preserveNullAndEmptyArrays": true }
                            },
                            {
                                $project: { 'user_register_id': '$php_user_register_id', _id: 0, 'plan_id': '$php_plan_id', user_join_plan: 1, user_completed_workout: 1, 'user_completed_workout_id': '$php_user_completed_workout_id', user_completed_plan: 1, user_next_workout: 1 }
                            }
                        ],
                        as: "user_data"
                    }
                },
                {
                    "$unwind": { "path": "$user_data", "preserveNullAndEmptyArrays": true }
                },
                {
                    $lookup: {
                        from: "planlevels",
                        localField: "plan_level_id",
                        foreignField: "_id",
                        pipeline: [
                            {
                                $project: { _id: 0, 'id': '$php_id', plan_level: 1 }
                            }
                        ],
                        as: "plan_level"
                    }
                },
                {
                    $unwind: "$plan_level"
                },
                {
                    $lookup: {
                        from: "plan_tags",
                        localField: "_id",
                        foreignField: "plan_id",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "tags",
                                    localField: "tag_id",
                                    foreignField: "_id",
                                    pipeline: [
                                        {
                                            $project: { _id: 0, 'id': '$php_id', name: 1 }
                                        }
                                    ],
                                    as: "plan_tag"
                                }
                            },
                            {
                                $unwind: "$plan_tag"
                            },
                            {
                                $project: { _id: 0, 'id': '$php_id', plan_id: '$php_plan_id', tag_id: '$php_tag_id', plan_tag: 1 }
                            }
                        ],
                        as: "plan_tags"
                    }
                },
                {
                    $lookup: {
                        from: "workouts",
                        localField: "_id",
                        foreignField: "plan_id",
                        pipeline: [{ $match: { status: 1 } }],
                        as: "workout"
                    }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                },
                {
                    $project: {
                        "position": "$index", _id: 0, 'plan_id': '$php_id', 'plan_level_id': '$php_plan_level_id', plan_name: 1, plan_description: 1, plan_preview_image: 1,
                        short_video_url: 1, intro_video_url: 1, gif_url: 1, plan_active_users: 1, plan_total_completions: 1, type: 1, status: 1, user_data: 1, plan_level: 1, plan_tags: 1, plan_tag: 1, workout: 1
                    }
                }
            ])
        }
     
        Promise.all(
            plan.map((val, ind) => {
                if(val.gif_url == null)
                {
                    val.gif_url = ""
                }
                if (!val.user_data) {
                    val.user_data = null
                }
                else if(!val.user_data.user_next_workout)
                {
                    val.user_data.user_next_workout = null
                }
                
                if (val.workout) {
                    val.plan_total_workouts_count = val.workout.length
                }
                delete val.workout
            })

        ).then(async () => {
            if (plan.length == 0) {
                return res.json(await ResponseErrorApi("Recode Not Found"))
            }
            else {
                return res.json(await ResponseWithDataPagginationApi(plan, Total_Page))
            }
        })
    } catch (error) {
        notificationFunc("Plan List Api Is Down",error.message)
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const user_join_plan_workout = async (req, res) => {
    try {
        if (!req.body.user_id || req.body.user_id == "") {
            return res.json(await ResponseErrorApi("Enter User Id"))
        }

        if (!req.body.plan_id || req.body.plan_id == "") {
            return res.json(await ResponseErrorApi("Enter Plan Id"))
        }

        if (req.body.type != "JoinPlan" && req.body.type != "CompleteWorkout" && req.body.type != "CompletePlan") {
            return res.json(await ResponseErrorApi("Enter Valid type"))
        }

        if (!req.body.value || req.body.value == "") {
            return res.json(await ResponseErrorApi("Enter Value"))
        }

        if (req.body.type == "JoinPlan" || req.body.type == "CompletePlan") {
            if (!req.body.value || req.body.value == "" || req.body.value > 1 || req.body.value < 0) {
                return res.json(await ResponseErrorApi("Enter Valid value"))
            }
        }

        var user_id = parseInt(req.body.user_id)
        var plan_id = parseInt(req.body.plan_id)
        var type = req.body.type
        var value = req.body.value
        var workout_id = (parseInt(req.body.workout_id)) ? parseInt(req.body.workout_id) : 0

        if (type == "JoinPlan") {
            var field = "user_join_plan"
        }
        else if (type == "CompleteWorkout") {
            var field = "user_completed_workout"
        }
        else {
            var field = "user_completed_plan"
        }


        var user_check = await UserRegister.findOne({ php_id: user_id })

        if (!user_check) {
            return res.json(await ResponseErrorApi("User Not Exist"))
        }

        var plan_check = await Plan.findOne({ php_id: plan_id })
        if (!plan_check) {
            return res.json(await ResponseErrorApi("Plan Not Exist"))
        }


        if (type == "CompleteWorkout" && plan_check.type != 1) {
            if (workout_id == "" || workout_id <= 0) {
                return res.json(await ResponseErrorApi("Enter Workout Id"))
            }
        }

        var workout = await UserWorkout.findOne({ $and: [{ php_user_register_id: user_id }, { php_plan_id: plan_id }] })

        if (workout) {
            var updateworkout = {}
            if (type.trim().toLowerCase() == "completeworkout" && plan_check.type == 1) {
                var next_workout_id = await Workout.findOne({ $and: [{ php_plan_id: plan_id }, { php_id: { $gt: workout_id } }] })
                if (next_workout_id) {
                    updateworkout.user_completed_workout_id = next_workout_id._id
                }
            }

            if (type.trim().toLowerCase() == "completeplan") {
                if (!workout.user_completed_plan) {
                    await Plan.updateOne({ php_id: plan_id }, { plan_total_completions: plan_check.plan_total_completions + 1 }, { new: true })
                }
            }

            if (field == "user_join_plan") {
                updateworkout.user_join_plan = value
            }
            if (field == "user_completed_workout") {
                updateworkout.user_completed_workout = value
            }
            if (field == "user_completed_plan") {
                updateworkout.user_completed_plan = value
            }
          
            await UserWorkout.updateOne({ $and: [{ php_user_register_id: user_id }, { php_plan_id: plan_id }] }, updateworkout, { new: true })
            return res.json(await ResponseWithDataApi())
        }
        else {
            var workoutid = await Workout.findOne({ php_plan_id: plan_id })

            var phpid = await UserWorkout.findOne({}).sort({ php_id: -1 })
            var create_data = {
                php_id: (phpid) ? phpid.php_id + 1 : 0,
                php_user_register_id: user_id,
                user_register_id: user_check._id,
                php_plan_id: plan_id,
                plan_id: plan_check._id,
            }

            if (workoutid) {
                create_data.user_completed_workout_id = workoutid._id
            }
            else {
                create_data.php_user_completed_workout_id = 0
            }

            if (field == "user_join_plan") {
                create_data.user_join_plan = value
            }
            if (field == "user_completed_workout") {
                create_data.user_completed_workout = value
            }
            if (field == "user_completed_plan") {
                create_data.user_completed_plan = value
            }
            await UserWorkout.create(create_data)

            if (type == "JoinPlan") {
                await Plan.updateOne({ php_id: plan_id }, { plan_active_users: plan_check.plan_active_users + 1 }, { new: true })
            }
            return res.json(await ResponseWithDataApi())
        }

    } catch (error) {
        notificationFunc("User Join Plan Workout Api Is Down",error.message)
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const user_workout_review = async (req, res) => {
    try {
        if (!req.body.user_id || req.body.user_id == "" || req.body.user_id <= 0) {
            return res.json(await ResponseErrorApi("Enter User Id"))
        }

        if (!req.body.plan_id || req.body.plan_id == "" || req.body.plan_id <= 0) {
            return res.json(await ResponseErrorApi("Enter Plan Id"))
        }

        if (!req.body.workout_id || req.body.workout_id == "" || req.body.workout_id <= 0) {
            return res.json(await ResponseErrorApi("Enter Workout Id"))
        }

        if (!req.body.user_review || req.body.user_review == "") {
            return res.json(await ResponseErrorApi("Enter User Review"))
        }

        var user_id = parseInt(req.body.user_id)
        var plan_id = parseInt(req.body.plan_id)
        var workout_id = parseInt(req.body.workout_id)
        var user_review = req.body.user_review

        var user_check = await UserRegister.findOne({ php_id: user_id })
        var plan_check = await Plan.findOne({ php_id: plan_id })
        var workout_check = await Workout.findOne({ php_id: workout_id })

        if (user_check && plan_check && workout_check) {
            var work_id = await UserWorkoutReview.findOne({ $and: [{ php_user_id: user_id }, { php_workout_id: workout_id }] })

            if (work_id) {
                await UserWorkoutReview.updateOne({ $and: [{ php_user_id: user_id }, { php_workout_id: workout_id }] }, { plan_id: plan_check._id, php_plan_id: plan_id, user_review: user_review })
                return res.json(await ResponseWithDataApi())
            }
            else {
                var phpid = await UserWorkoutReview.findOne({}).sort({ php_id: -1 })
                var create_data = {
                    php_id: (phpid) ? phpid.php_id + 1 : 0,
                    php_user_id: user_id,
                    user_id: user_check._id,
                    php_plan_id: plan_id,
                    plan_id: plan_check._id,
                    php_workout_id: workout_id,
                    workout_id: workout_check._id,
                    user_review: user_review
                }
                await UserWorkoutReview.create(create_data)
                return res.json(await ResponseWithDataApi())
            }
        }
        else {
            return res.json(await ResponseErrorApi("Record Not Found"))
        }

    } catch (error) {
        notificationFunc("User Workout Review Api Is Down",error.message)
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const firstDayUnlock = async (req, res) => {
    try {
        var deviceToken = req.body.device_token
        var user_id = req.body.user_id
        var user_check = await UserRegister.findOne({ php_id: user_id })
        if (user_check) {
            if (user_check.expiry_date !== null && dayjs().isAfter(user_check.expiry_date)) {
                var data = {
                    is_subscribe: 0,
                    expiry_date: null
                }
                var subscribe_status = 0
                await UserRegister.updateOne({ php_id: user_id }, data)
            }
            else {
                var subscribe_status = user_check.is_subscribe
            }
        }
        else {
            var subscribe_status = 0
        }

        if (deviceToken && deviceToken !== "") {
            var check_guestToken = await GuestToken.findOne({ device_token: deviceToken })
            if (!check_guestToken) {
                var phpid = await GuestToken.findOne({}).sort({ php_id: -1 })
                var data = {
                    php_id: (phpid) ? phpid.php_id + 1 : 0,
                    device_token: deviceToken
                }
                await GuestToken.create(data)
            }
        }

        var firstdayunlockdata = await FirstDayUnlocks.findOne({})
        var Result = {
            ResponseCode: 1,
            ResponseMessage: "success",
            status: firstdayunlockdata.status == 1 ? "true" : "false",
            subscription: firstdayunlockdata.subscription == 1 ? "true" : "false",
            subscription_required_ios: firstdayunlockdata.subscription_required_ios == 1 ? "true" : "false",
            plans_local_free_ios: firstdayunlockdata.plans_local_free_ios == 1 ? true : false,
            plans_local_free_android: firstdayunlockdata.plans_local_free_android == 1 ? true : false,
            plans_local_showfirst_ios: firstdayunlockdata.plans_local_showfirst_ios == 1 ? true : false,
            plans_local_showfirst_android: firstdayunlockdata.plans_local_showfirst_android == 1 ? true : false,
            is_subscribe: subscribe_status
        }

        return res.json(Result)

    } catch (error) {
        notificationFunc("FirstDayUnlock Api Is Down",error.message)
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const user_subscribe = async (req, res) => {
    try {
        if (!req.body.user_id || req.body.user_id == "") {
            return res.json(await ResponseErrorApi("Enter User Id"))
        }

        if (!req.body.is_subscribe || req.body.is_subscribe == "" || req.body.is_subscribe > 1 || req.body.is_subscribe < 0) {
            return res.json(await ResponseErrorApi("Enter Valid Data"))
        }

        var id = parseInt(req.body.user_id)
        var subscribe = req.body.is_subscribe
        var is_free_trial = req.body.is_free_trial
        var sku = req.body.sku
        var purchase_time = req.body.purchase_time
        var is_purchased = req.body.is_purchased
        var subscription_platform = req.body.subscription_platform

        var user_check = await UserRegister.findOne({ php_id: id }).select({ _id: 1, is_subscribe: 1, subscription_platform: 1, sku: 1, purchase_time: 1, expiry_date: 1, is_free_trial: 1, is_purchased: 1, no_of_days: 1 })
        if (user_check) {
            if (req.body.is_subscribe && req.body.is_subscribe == 1) {
                if (sku != "com.saumya.yoga.lifetime.pro") {
                    if (user_check.expiry_date == null) {
                        if (purchase_time) {
                            var CurrentDate = new Date(parseInt(purchase_time))
                        }
                        else {
                            var CurrentDate = dayjs()
                        }

                        if (req.body.is_free_trial && req.body.is_free_trial == 1) {
                            if (user_check.is_free_trial != 1) {
                                var numOfDay = req.body.no_of_days
                                var expiredate = dayjs(CurrentDate).add(numOfDay, 'day')
                            }
                            else {
                                var CurrentDate = dayjs()
                                if (user_check.expiry_date == null) {
                                    if (user_check.sku != null && user_check.sku.includes('one.year') === true) {
                                        var numOfDay = 365
                                        var expiredate = dayjs(CurrentDate).add(numOfDay, 'day')
                                    }

                                    if (user_check.sku != null && user_check.sku.includes('one.month') === true) {
                                        var numOfDay = 30
                                        var expiredate = dayjs(CurrentDate).add(numOfDay, 'day')
                                    }

                                    if (user_check.sku != null && user_check.sku.includes('three.month') === true) {
                                        var numOfDay = 90
                                        var expiredate = dayjs(CurrentDate).add(numOfDay, 'day')
                                    }

                                    if (user_check.sku != null && user_check.sku.includes('one.week') === true) {
                                        var numOfDay = 7
                                        var expiredate = dayjs(CurrentDate).add(numOfDay, 'day')
                                    }
                                }
                                else {
                                    var numOfDay = user_check.no_of_days
                                    var expiredate = user_check.expiry_date
                                }
                            }
                        }
                        else {
                            if (req.body.sku != undefined && req.body.sku.includes('one.year') === true) {
                                var numOfDay = 365
                                var expiredate = dayjs(CurrentDate).add(numOfDay, 'day')
                            }
                            if (req.body.sku != undefined && req.body.sku.includes('one.month') === true) {
                                var numOfDay = 30
                                var expiredate = dayjs(CurrentDate).add(numOfDay, 'day')
                            }

                            if (req.body.sku != undefined && req.body.sku.includes('three.month') === true) {
                                var numOfDay = 90
                                var expiredate = dayjs(CurrentDate).add(numOfDay, 'day')
                            }

                            if (req.body.sku != undefined && req.body.sku.includes('one.week') === true) {
                                var numOfDay = 7
                                var expiredate = dayjs(CurrentDate).add(numOfDay, 'day')
                            }
                        }
                    }
                    else {
                        var CurrentDate = dayjs()
                        if (dayjs().isAfter(user_check.expiry_date)) {
                            if (user_check.sku != null && user_check.sku.includes('one.year') === true) {
                                var numOfDay = 365
                                var expiredate = dayjs(CurrentDate).add(numOfDay, 'day')
                            }

                            if (user_check.sku != null && user_check.sku.includes('one.month') === true) {
                                var numOfDay = 30
                                var expiredate = dayjs(CurrentDate).add(numOfDay, 'day')
                            }

                            if (user_check.sku != null && user_check.sku.includes('three.month') === true) {
                                var numOfDay = 90
                                var expiredate = dayjs(CurrentDate).add(numOfDay, 'day')
                            }

                            if (user_check.sku != null && user_check.sku.includes('one.week') === true) {
                                var numOfDay = 7
                                var expiredate = dayjs(CurrentDate).add(numOfDay, 'day')
                            }
                        }
                        else {
                            var expiredate = user_check.expiry_date
                            var numOfDay = user_check.no_of_days
                        }
                    }
                }

                var data = {}

                subscribe ? (subscribe == 1) ? data.is_subscribe = 1 : data.is_subscribe = 0 : data.is_subscribe = 0
                is_free_trial ? (is_free_trial == 1) ? data.is_free_trial = 1 : data.is_free_trial = 0 : data.is_free_trial = 0

                if (req.body.sku) {
                    data.sku = sku ? sku : null
                }
                else {
                    var CurrentDate = dayjs()
                    if (user_check.expiry_date == null || dayjs().isAfter(user_check.expiry_date)) {
                        var expire = 1
                    }
                    else {
                        data.sku = user_check.sku
                    }
                }

                if (req.body.purchase_time) {
                    data.purchase_time = (req.body.purchase_time) ? req.body.purchase_time : null
                }
                else {
                    var CurrentDate = dayjs()

                    if (user_check.expiry_date == null || dayjs().isAfter(user_check.expiry_date)) {
                        var expire = 1
                    }
                    else {
                        data.purchase_time = user_check.purchase_time
                    }
                }


                data.expiry_date = expiredate ? (expiredate.$d) ? expiredate.$d : expiredate : null
                data.subscription_platform = subscription_platform ? subscription_platform : null
                data.no_of_days = numOfDay ? numOfDay : 0

                if (expire) {
                    data.is_subscribe = 0
                    data.is_free_trial = 0
                    data.sku = sku ? sku : null
                    data.purchase_time = req.body.purchase_time ? req.body.purchase_time : null
                    data.expiry_date = null
                    data.no_of_days = 0
                    data.subscription_platform = subscription_platform ? subscription_platform : null
                }
            }
            else {
                var data = {}
                if (!user_check.expiry_date) {
                    subscribe ? (subscribe == 1) ? data.is_subscribe = 1 : data.is_subscribe = 0 : data.is_subscribe = 0
                    is_free_trial ? (is_free_trial == 1) ? data.is_free_trial = 1 : data.is_free_trial = 0 : data.is_free_trial = 0
                    data.sku = sku ? sku : null
                    data.purchase_time = purchase_time ? purchase_time : null
                    data.expiry_date = expiredate ? (expiredate.$d) ? expiredate.$d : expiredate : null
                    data.no_of_days = numOfDay ? numOfDay : 0
                    data.subscription_platform = subscription_platform ? subscription_platform : null
                }
                else {

                    var CurrentDate = dayjs()
                    if (dayjs().isAfter(user_check.expiry_date)) {
                        subscribe ? (subscribe == 1) ? data.is_subscribe = 1 : data.is_subscribe = 0 : data.is_subscribe = 0
                        is_free_trial ? (is_free_trial == 1) ? data.is_free_trial = 1 : data.is_free_trial = 0 : data.is_free_trial = 0
                        data.sku = sku ? sku : null
                        data.purchase_time = purchase_time ? purchase_time : null
                        data.expiry_date = expiredate ? (expiredate.$d) ? expiredate.$d : expiredate : null
                        data.no_of_days = numOfDay ? numOfDay : 0
                        data.subscription_platform = subscription_platform ? subscription_platform : null
                    }
                }
            }
            is_purchased ? (is_purchased == 1) ? data.is_purchased = 1 : data.is_purchased = 0 : data.is_purchased = 0

            if (data) {
                await UserRegister.updateOne({ php_id: id }, data)
            }
            return res.json(await ResponseWithDataApi(data))
        }
        else {
            return res.json(await ResponseErrorApi("User Not Exist"))
        }
    } catch (error) {
        console.log(error);
        notificationFunc("User Subscribe Api Is Down",error.message)
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

export {
    series_workout_list, final_workout_routin, meditationSounds, user_login, user_delete_profile, user_change_password,
    change_user_address, forgot_pwd, plan_list, user_join_plan_workout, user_workout_review, firstDayUnlock, user_subscribe
}