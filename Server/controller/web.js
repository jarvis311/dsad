import { Query, HttpStatus, commonquery, UploadImage, DeleteImage, CreateBcryptPassword, CheckBcryptPassword, VerifyJwtToken } from "../helper/helper.js";
import { CatchErrors, ResponseError, ResponseErrormsg, ResponseSuccess, ResponseSuccessmsg } from "../ResponseMsg/ResponseMsg.js"
import Tags from "../model/Tags.js";
import Categories from "../model/Categories.js";
import Languages from "../model/Languages.js";
import PlanLevels from "../model/PlanLevels.js";
import Plan from "../model/Plan.js";
import Workout from "../model/Workouts.js";
import PlanTags from "../model/PlanTags.js";
import mongoose from "mongoose";
import PosesLists from "../model/PosesLists.js";
import BackgroundAudio from "../model/BackgroundAudio.js";
import Sounds from "../model/Sounds.js";
import Exercises from "../model/Exercises.js";
import ExercisesPoses from "../model/Exercisesposes.js";
import RegisterAdminPanel from "../model/Register.js";
import { ResponseWithTokenSuccess } from "../ResponseMsg/ResponseMsg.js";
import FirstDayUnlocks from "../model/FirstDayUnlocks.js";
import GuestToken from "../model/GuestToken.js";
import UserRegister from "../model/UserRegister.js";
import dayjs from "dayjs";
import md5 from "md5";


const { find, findOne, deleteMany, deleteOne, findById, create, findByIdAndDelete, findByIdAndUpdate, updateMany, updateOne, count, insertMany } = Query
const { Ok_Status, Not_Found, Forbidden } = HttpStatus

const TagsCreate = async (req, res) => {
    try {
        const { name, service_name } = req.body
        const phpid = await Tags.findOne({}).sort({ php_id: -1 })
        const Result = await commonquery(Tags, create, { name, service_name, php_id: (phpid) ? phpid.php_id + 1 : 1 })
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const TagsView = async (req, res) => {
    try {
        const { _id } = req.body
        const Result = await commonquery(Tags, findOne, { _id }, {}, { __v: 0, createdAt: 0, updatedAt: 0 })
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const TagsEdit = async (req, res) => {
    try {
        const { _id } = req.body
        const Result = await commonquery(Tags, findOne, { _id }, {}, { __v: 0, createdAt: 0, updatedAt: 0 })
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const TagsDelete = async (req, res) => {
    try {
        const { _id } = req.body
        const Result = await commonquery(Tags, findByIdAndDelete, { _id }, {})
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const TagsUpdate = async (req, res) => {
    try {
        const { _id, name, service_name } = req.body
        const Result = await commonquery(Tags, findByIdAndUpdate, { _id }, { name, service_name })
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const TagsAll = async (req, res) => {
    try {
        const Result = await commonquery(Tags, find, {}, {}, { __v: 0, createdAt: 0, updatedAt: 0 }, { name: 1 })
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const TagsActiveStatusAll = async (req, res) => {
    try {
        const Result = await commonquery(Tags, find, { status: 1 }, {}, { __v: 0, createdAt: 0, updatedAt: 0, service_name: 0, status: 0 }, { _id: -1 })
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const TagsStatusUpdate = async (req, res) => {
    try {
        const { _id, status } = req.body
        const Result = await commonquery(Tags, findByIdAndUpdate, { _id }, { status })
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const TagsSearch = async (req, res) => {
    try {
        const Query = []
        if (req.body.name) {
            Query.push({ name: { $regex: req.body.name, $options: 'i' } })
        }

        if (req.body.status) {
            Query.push({ status: parseInt(req.body.status) })
        }

        const Result = await commonquery(Tags, find, (Query.length !== 0) ? { $and: Query } : {}, {}, { __v: 0 })
        return res.json(Result)

    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const CategoriesIndex = async (req, res) => {
    try {
        const Result = await commonquery(Categories, findOne, {}, {}, { index: 1, _id: 0 }, { index: -1 })
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const CategoriesCreate = async (req, res) => {
    try {
        const { index, category_name } = req.body
        const phpid = await Categories.findOne({}).sort({ php_id: -1 })
        const Result = await commonquery(Categories, create, { index, category_name, php_id: (phpid) ? phpid.php_id + 1 : 1 })
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const CategoriesView = async (req, res) => {
    try {
        const AllCategories = await commonquery(Categories, find, {}, {}, { __v: 0, createdAt: 0, updatedAt: 0 }, { index: 1 })
        Promise.all(
            AllCategories.Data.map(async (val, index) => {
                if (val.index !== index + 1) {
                    await commonquery(Categories, findByIdAndUpdate, { _id: val._id }, { index: index + 1 })
                }
            })
        ).then(async () => {
            const { _id } = req.body
            const Result = await commonquery(Categories, findOne, { _id }, {}, { __v: 0, createdAt: 0, updatedAt: 0 })
            return res.json(Result)
        })
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const CategoriesEdit = async (req, res) => {
    try {
        const { _id } = req.body
        const Result = await commonquery(Categories, findOne, { _id }, {}, { __v: 0, createdAt: 0, updatedAt: 0 })
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const CategoriesDelete = async (req, res) => {
    try {
        const { _id } = req.body
        const Result = await commonquery(Categories, findByIdAndDelete, { _id }, {})
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const CategoriesUpdate = async (req, res) => {
    try {
        const { _id, index, category_name } = req.body
        const Result = await commonquery(Categories, findByIdAndUpdate, { _id }, { index, category_name })
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const CategoriesAll = async (req, res) => {
    try {
        const AllCategories = await commonquery(Categories, find, {}, {}, { __v: 0, createdAt: 0, updatedAt: 0 }, { index: 1 })
        Promise.all(
            AllCategories.Data.map(async (val, index) => {
                if (val.index !== index + 1) {
                    await commonquery(Categories, findByIdAndUpdate, { _id: val._id }, { index: index + 1 })
                }
            })
        ).then(async () => {
            const Result = await commonquery(Categories, find, {}, {}, { __v: 0, createdAt: 0, updatedAt: 0 }, { index: 1 })
            return res.json(Result)
        })
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const CategoriesSearch = async (req, res) => {
    try {
        const { category_name } = req.body
        const Result = await commonquery(Categories, find, { category_name: { $regex: category_name, $options: 'i' } }, {}, { __v: 0, createdAt: 0, updatedAt: 0 })
        return res.json(Result)

    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const CategoriesUpdateIndex = async (req, res) => {
    try {
        req.body.forEach(async (val) => {
            await Categories.updateMany({ _id: val.id }, { index: val.index })
        });
        return res.json(await ResponseSuccessmsg(Ok_Status, "Position Update Successfully"))
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const LanguagesCreate = async (req, res) => {
    try {
        const { language, language_code } = req.body
        const phpid = await Languages.findOne({}).sort({ php_id: -1 })
        const Result = await commonquery(Languages, create, { language, language_code, php_id: (phpid) ? phpid.php_id + 1 : 1 })
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const LanguagesView = async (req, res) => {
    try {
        const { _id } = req.body
        const Result = await commonquery(Languages, findOne, { _id }, {}, { __v: 0, updatedAt: 0, createdAt: 0 })
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const LanguagesEdit = async (req, res) => {
    try {
        const { _id } = req.body
        const Result = await commonquery(Languages, findOne, { _id }, {}, { __v: 0, updatedAt: 0, createdAt: 0 })
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const LanguagesDelete = async (req, res) => {
    try {
        const { _id } = req.body
        const Result = await commonquery(Languages, findByIdAndDelete, { _id }, {})
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const LanguagesUpdate = async (req, res) => {
    try {
        const { _id, language, language_code } = req.body
        const Result = await commonquery(Languages, findByIdAndUpdate, { _id }, { language, language_code })
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const LanguagesAll = async (req, res) => {
    try {
        const Result = await commonquery(Languages, find, {}, {}, { __v: 0, language_code: 0, createdAt: 0, updatedAt: 0 }, { language: 1 })
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const PlanlevelsCreate = async (req, res) => {
    try {
        const { plan_level } = req.body
        const phpid = await PlanLevels.findOne({}).sort({ php_id: -1 })
        const Result = await commonquery(PlanLevels, create, { plan_level, php_id: (phpid) ? phpid.php_id + 1 : 1 })
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const PlanlevelsView = async (req, res) => {
    try {
        const { _id } = req.body
        const Result = await commonquery(PlanLevels, findOne, { _id }, {}, { __v: 0, createdAt: 0, updatedAt: 0 })
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const PlanlevelsEdit = async (req, res) => {
    try {
        const { _id } = req.body
        const Result = await commonquery(PlanLevels, findOne, { _id }, {}, { __v: 0, createdAt: 0, updatedAt: 0 })
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const PlanlevelsDelete = async (req, res) => {
    try {
        const { _id } = req.body
        const Result = await commonquery(PlanLevels, findByIdAndDelete, { _id }, {})
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const PlanlevelsUpdate = async (req, res) => {
    try {
        const { _id, plan_level } = req.body
        const Result = await commonquery(PlanLevels, findByIdAndUpdate, { _id }, { plan_level })
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const PlanlevelsAll = async (req, res) => {
    try {
        const Result = await commonquery(PlanLevels, find, {}, {}, { __v: 0, createdAt: 0, updatedAt: 0 }, { plan_level: 1 })
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const PlanIndex = async (req, res) => {
    try {
        const Result = await commonquery(Plan, findOne, {}, {}, { index: 1, _id: 0 }, { index: -1 })
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const PlanCreate = async (req, res) => {
    try {
        let { index, plan_name, plan_active_users, plan_total_completions, plan_description, plan_level_id, type, status } = req.body
        let plan_preview_image = ""
        let short_video_url = ""
        let intro_video_url = ""
        let gif_url = ""

        if (req.files) {
            if (req.files.plan_preview_image) {
                const Response = await UploadImage(req.files.plan_preview_image, 'Plan', 'planpreviewimage')
                if (Response.status === true) {
                    plan_preview_image = await Response.path
                }
            }

            if (req.files.short_video_url) {
                const Response = await UploadImage(req.files.short_video_url, 'Plan', 'shortvideo')
                if (Response.status === true) {
                    short_video_url = await Response.path
                }
            }

            if (req.files.intro_video_url) {
                const Response = await UploadImage(req.files.intro_video_url, 'Plan', 'introvideo')
                if (Response.status === true) {
                    intro_video_url = await Response.path
                }
            }

            if (req.files.gif_url) {
                const Response = await UploadImage(req.files.gif_url, 'Plan', 'gifimage')
                if (Response.status === true) {
                    gif_url = await Response.path
                }
            }
        }
        const phpid = await Plan.findOne({}).sort({ php_id: -1 })
        const planlevelid = await PlanLevels.findOne({ _id: plan_level_id })
        const Result = await commonquery(Plan, create, { index, plan_name, plan_active_users, plan_total_completions, plan_description, plan_level_id, type, status, plan_preview_image, short_video_url, intro_video_url, gif_url, php_id: (phpid) ? phpid.php_id + 1 : 1, php_plan_level_id: (planlevelid) ? planlevelid.php_id : 1 })

        if (Result.Status === true) {
            if (req.body.workout_name && Array.isArray(req.body.workout_name) === true) {
                const phpid = await Workout.findOne({}).sort({ php_id: -1 })
                var count = 0
                req.body.workout_name.map(async (val, index) => {
                    count++
                    const data = {
                        php_id: (phpid) ? phpid.php_id + count : 1,
                        workout_name: val,
                        duration: req.body.duration[index],
                        calories: req.body.calories[index],
                        is_free: req.body.is_free[index],
                        plan_id: Result.Data._id,
                        php_plan_id: Result.Data.php_id
                    }
                    const WorkoutResult = await commonquery(Workout, create, data)
                    if (WorkoutResult.Status === false) {
                        console.log(WorkoutResult.Response_Message)
                    }
                })
            }
            else {
                if (req.body.workout_name) {
                    const phpid = await Workout.findOne({}).sort({ php_id: -1 })
                    const data = {
                        php_id: (phpid) ? phpid.php_id + 1 : 1,
                        workout_name: req.body.workout_name,
                        duration: req.body.duration,
                        calories: req.body.calories,
                        is_free: req.body.is_free,
                        plan_id: Result.Data._id,
                        php_plan_id: Result.Data.php_id
                    }
                    const WorkoutResult = await commonquery(Workout, create, data)
                    if (WorkoutResult.Status === false) {
                        console.log(WorkoutResult.Response_Message)
                    }
                }
            }
        }
        else {
            console.log(Result.Response_Message)
        }

        if (Result.Status === true) {
            if (req.body.tag_id && Array.isArray(req.body.tag_id) === true) {
                const phpid = await PlanTags.findOne({}).sort({ php_id: -1 })
                var count = 0
                req.body.tag_id.map(async (val, index) => {
                    const phptagid = await Tags.findOne({ _id: val })
                    count++
                    var data = {
                        php_id: (phpid) ? phpid.php_id + count : 1,
                        plan_id: Result.Data._id,
                        php_plan_id: Result.Data.php_id,
                        tag_id: val,
                        php_tag_id: phptagid.php_id
                    }
                    const PlanTagsResult = await commonquery(PlanTags, create, data)
                    if (PlanTagsResult.Status === false) {
                        console.log(PlanTagsResult.Response_Message)
                    }
                })
            }
            else {
                if (req.body.tag_id) {
                    const phpid = await PlanTags.findOne({}).sort({ php_id: -1 })
                    const phptagid = await Tags.findOne({ _id: req.body.tag_id })

                    var data = {
                        php_id: (phpid) ? phpid.php_id + 1 : 1,
                        plan_id: Result.Data._id,
                        php_plan_id: Result.Data.php_id,
                        tag_id: req.body.tag_id,
                        php_tag_id: phptagid.php_id
                    }

                    const PlanTagsResult = await commonquery(PlanTags, create, data)
                    if (PlanTagsResult.Status === false) {
                        console.log(PlanTagsResult.Response_Message)
                    }
                }
            }
        }
        else {
            console.log(Result.Response_Message)
        }

        return res.json(Result)

    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const PlanView = async (req, res) => {
    try {
        var msg
        const { _id } = req.body

        const AllCategories = await commonquery(Plan, find, {}, {}, { __v: 0, createdAt: 0, updatedAt: 0 }, { index: 1 })
        Promise.all(
            AllCategories.Data.map(async (val, index) => {
                if (val.index !== index + 1) {
                    await commonquery(Plan, findByIdAndUpdate, { _id: val._id }, { index: index + 1 })
                }
            })
        ).then(async () => {

            const Result = await Plan.aggregate([
                {
                    $match: { _id: new mongoose.Types.ObjectId(_id) }
                },
                {
                    $lookup: {
                        from: 'workouts',
                        localField: "_id",
                        foreignField: 'plan_id',
                        pipeline: [{ $project: { __v: 0, _id: 0, plan_id: 0 } }],
                        as: "workouts"
                    }
                },
                {
                    $lookup: {
                        from: 'planlevels',
                        localField: "plan_level_id",
                        foreignField: '_id',
                        pipeline: [{ $project: { __v: 0, _id: 0 } }],
                        as: "planlevel"
                    }
                },
                {
                    $lookup: {
                        from: 'plan_tags',
                        localField: "_id",
                        foreignField: 'plan_id',
                        pipeline: [
                            {
                                $lookup: {
                                    from: 'tags',
                                    localField: "tag_id",
                                    foreignField: '_id',
                                    pipeline: [{ $project: { __v: 0, _id: 0 } }],
                                    as: "tag"
                                }
                            }, { $unwind: '$tag' },
                            { $project: { _id: '$tag._id', name: '$tag.name', service_name: '$tag.service_name', status: '$tag.status' } }
                        ],
                        as: "plan_tag"
                    }
                },
                {
                    $project: { plan_name: 1, plan_active_users: 1, plan_total_completions: 1, plan_description: 1, plan_preview_image: 1, short_video_url: 1, intro_video_url: 1, gif_url: 1, plan_level_id: 1, type: 1, status: 1, workouts: 1, planlevel: 1, plan_tag: 1 }
                }
            ]
            )

            if (Result.length > 0) {
                msg = "Data Found Successfully.."
                return res.json(await ResponseSuccess(Ok_Status, msg, Result[0]))
            }
            else {
                msg = "Data Not Found"
                return res.json(await ResponseError(Not_Found, msg))
            }
        })
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const PlanEdit = async (req, res) => {
    try {
        var msg
        const { _id } = req.body
        const Result = await Plan.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(_id) }
            },
            {
                $lookup: {
                    from: 'workouts',
                    localField: "_id",
                    foreignField: 'plan_id',
                    pipeline: [{ $project: { __v: 0, plan_id: 0, status: 0 } }],
                    as: "workouts"
                }
            },
            {
                $lookup: {
                    from: 'planlevels',
                    localField: "plan_level_id",
                    foreignField: '_id',
                    pipeline: [{ $project: { __v: 0 } }],
                    as: "planlevel"
                }
            },
            {
                $lookup: {
                    from: 'plan_tags',
                    localField: "_id",
                    foreignField: 'plan_id',
                    pipeline: [
                        {
                            $lookup: {
                                from: 'tags',
                                localField: "tag_id",
                                foreignField: '_id',
                                pipeline: [{ $project: { __v: 0, service_name: 0, status: 0 } }],
                                as: "tag"
                            }
                        }, { $unwind: '$tag' },
                        { $project: { _id: '$tag._id', name: '$tag.name', service_name: '$tag.service_name', status: '$tag.status' } }
                    ],
                    as: "plan_tag"
                }
            },
            {
                $project: { index: 1, plan_name: 1, plan_active_users: 1, plan_total_completions: 1, plan_description: 1, plan_preview_image: 1, short_video_url: 1, intro_video_url: 1, gif_url: 1, plan_level_id: 1, type: 1, status: 1, workouts: 1, planlevel: 1, plan_tag: 1 }
            }
        ]
        )

        if (Result.length > 0) {
            msg = "Data Found Successfully.."
            return res.json(await ResponseSuccess(Ok_Status, msg, Result[0]))
        }
        else {
            msg = "Data Not Found"
            return res.json(await ResponseError(Not_Found, msg))
        }

    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const PlanDelete = async (req, res) => {
    try {
        const { _id } = req.body
        const Planfind = await commonquery(Plan, findOne, { _id })
        if (Planfind.Status === true) {
            await DeleteImage(Planfind.Data.plan_preview_image, "Plan")
            await DeleteImage(Planfind.Data.short_video_url, "Plan")
            await DeleteImage(Planfind.Data.intro_video_url, "Plan")
            await DeleteImage(Planfind.Data.gif_url, "Plan")
            await commonquery(Workout, deleteMany, { plan_id: Planfind.Data._id })
            await commonquery(PlanTags, deleteMany, { plan_id: Planfind.Data._id })
            const Result = await commonquery(Plan, findByIdAndDelete, { _id: _id }, {})
            return res.json(Result)
        }
        else {
            return res.json(Planfind)
        }

    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const PlanWorkoutDelete = async (req, res) => {
    try {
        const { _id } = req.body
        const Result = await commonquery(Workout, findByIdAndDelete, { _id })
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const PlanUpdate = async (req, res) => {
    try {
        let { _id, index, plan_name, plan_active_users, plan_total_completions, plan_description, plan_level_id, type, status } = req.body
        const Planfind = await commonquery(Plan, findOne, { _id })
        if (Planfind.Status === false) {
            return res.json(Planfind)
        }
        let plan_preview_image = Planfind.Data.plan_preview_image
        let short_video_url = Planfind.Data.short_video_url
        let intro_video_url = Planfind.Data.intro_video_url
        let gif_url = Planfind.Data.gif_url

        if (req.files) {
            if (req.files.plan_preview_image) {
                if (Planfind.Data.plan_preview_image !== "") {
                    const Delete = await DeleteImage(Planfind.Data.plan_preview_image, "Plan")
                    console.log(Delete)
                }

                const Response = await UploadImage(req.files.plan_preview_image, 'Plan', 'planpreviewimage')
                if (Response.status === true) {
                    plan_preview_image = await Response.path
                }
                else {
                    console.log(Response)
                }
            }

            if (req.files.short_video_url) {
                if (Planfind.Data.short_video_url !== "") {
                    const Delete = await DeleteImage(Planfind.Data.short_video_url, "Plan")
                    console.log(Delete)
                }
                const Response = await UploadImage(req.files.short_video_url, 'Plan', 'shortvideo')
                if (Response.status === true) {
                    short_video_url = await Response.path
                }
                else {
                    console.log(Response)
                }

            }

            if (req.files.intro_video_url) {
                if (Planfind.Data.intro_video_url !== "") {
                    const Delete = await DeleteImage(Planfind.Data.intro_video_url, "Plan")
                    console.log(Delete)
                }
                const Response = await UploadImage(req.files.intro_video_url, 'Plan', 'introvideo')
                if (Response.status === true) {
                    intro_video_url = await Response.path
                }
                else {
                    console.log(Response)
                }
            }

            if (req.files.gif_url) {
                if (Planfind.Data.gif_url !== "") {
                    const Delete = await DeleteImage(Planfind.Data.gif_url, "Plan")
                    console.log(Delete)
                }
                const Response = await UploadImage(req.files.gif_url, 'Plan', 'gifimage')
                if (Response.status === true) {
                    gif_url = await Response.path
                }
                else {
                    console.log(Response)
                }
            }
        }

        const planlevelid = await PlanLevels.findOne({ _id: plan_level_id })
        const Result = await commonquery(Plan, findByIdAndUpdate, { _id }, { index, plan_name, plan_active_users, plan_total_completions, plan_description, plan_level_id, type, status, plan_preview_image, short_video_url, intro_video_url, gif_url, php_plan_level_id: (planlevelid) ? planlevelid.php_id : 1 })

        if (Result.Status === true) {
            if (req.body.workout_id && Array.isArray(req.body.workout_id) === true) {
                var count = 0
                req.body.workout_id.map(async (val, index) => {
                    if (val !== 'null') {
                        const data = {
                            workout_name: req.body.workout_name[index],
                            duration: req.body.duration[index],
                            calories: req.body.calories[index],
                            is_free: req.body.is_free[index],
                        }
                        const WorkoutResult = await commonquery(Workout, findByIdAndUpdate, { _id: val }, data)
                        if (WorkoutResult.Status === false) {
                            console.log(WorkoutResult.Response_Message)
                        }
                    }
                    else {
                        const phpid = await Workout.findOne({}).sort({ php_id: -1 })
                        count++
                        const data = {
                            php_id: (phpid) ? phpid.php_id + count : 1,
                            workout_name: req.body.workout_name[index],
                            duration: req.body.duration[index],
                            calories: req.body.calories[index],
                            is_free: req.body.is_free[index],
                            plan_id: Result.Data._id,
                            php_plan_id: Result.Data.php_id
                        }
                        const WorkoutAddResult = await commonquery(Workout, create, data)
                        if (WorkoutAddResult.Status === false) {
                            console.log(WorkoutAddResult.Response_Message)
                        }
                    }

                })
            }
            else {
                if (req.body.workout_id !== undefined) {
                    if (req.body.workout_id !== 'null') {
                        const data = {
                            workout_name: req.body.workout_name,
                            duration: req.body.duration,
                            calories: req.body.calories,
                            is_free: req.body.is_free,
                        }
                        const WorkoutResult = await commonquery(Workout, findByIdAndUpdate, { _id: req.body.workout_id }, data)
                        if (WorkoutResult.Status === false) {
                            console.log(WorkoutResult.Response_Message)
                        }
                    }
                    else {
                        const phpid = await Workout.findOne({}).sort({ php_id: -1 })
                        const data = {
                            php_id: (phpid) ? phpid.php_id + 1 : 1,
                            workout_name: req.body.workout_name,
                            duration: req.body.duration,
                            calories: req.body.calories,
                            is_free: req.body.vis_free,
                            plan_id: Result.Data._id,
                            php_plan_id: Result.Data.php_id
                        }
                        const WorkoutAddResult = await commonquery(Workout, create, data)
                        if (WorkoutAddResult.Status === false) {
                            console.log(WorkoutAddResult.Response_Message)
                        }
                    }
                }
            }

        }

        if (Result.Status === true) {
            await commonquery(PlanTags, deleteMany, { plan_id: Planfind.Data._id })
            var count = 0
            if (req.body.tag_id && Array.isArray(req.body.tag_id) === true) {
                const phpid = await PlanTags.findOne({}).sort({ php_id: -1 })
                count++
                req.body.tag_id.map(async (val, index) => {
                    const phptagid = await Tags.findOne({ _id: val })
                    var data = {
                        php_id: (phpid) ? phpid.php_id + count : 1,
                        plan_id: Planfind.Data._id,
                        php_plan_id: Planfind.Data.php_id,
                        tag_id: val,
                        php_tag_id: phptagid.php_id
                    }
                    const PlanTagsResult = await commonquery(PlanTags, create, data)
                    if (PlanTagsResult.Status === false) {
                        console.log(PlanTagsResult.Response_Message)
                    }
                })
            }
            else {
                if (req.body.tag_id !== undefined) {
                    const phpid = await PlanTags.findOne({}).sort({ php_id: -1 })
                    const phptagid = await Tags.findOne({ _id: req.body.tag_id })
                    var data = {
                        php_id: (phpid) ? phpid.php_id + 1 : 1,
                        plan_id: Planfind.Data._id,
                        php_plan_id: Planfind.Data.php_id,
                        tag_id: req.body.tag_id,
                        php_tag_id: phptagid.php_id
                    }
                    const PlanTagsResult = await commonquery(PlanTags, create, data)
                    if (PlanTagsResult.Status === false) {
                        console.log(PlanTagsResult.Response_Message)
                    }
                }
            }
        }

        return res.json(Result)

    } catch (error) {
        console.log(error)
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}


const PlanAll = async (req, res) => {
    try {
        const AllCategories = await commonquery(Plan, find, {}, {}, { __v: 0, createdAt: 0, updatedAt: 0 }, { index: 1 })
        Promise.all(
            AllCategories.Data.map(async (val, index) => {
                if (val.index !== index + 1) {
                    await commonquery(Plan, findByIdAndUpdate, { _id: val._id }, { index: index + 1 })
                }
            })
        ).then(async () => {
            const Result = await commonquery(Plan, find, {}, {}, { __v: 0, createdAt: 0, updatedAt: 0, short_video_url: 0, intro_video_url: 0, gif_url: 0, plan_level_id: 0 }, { index: -1 })
            return res.json(Result)
        })

    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const PlanSearch = async (req, res) => {
    try {
        const Query = []
        if (req.body.planname) {
            Query.push({ plan_name: { $regex: req.body.planname, $options: 'i' } })
        }

        if (req.body.status) {
            Query.push({ status: parseInt(req.body.status) })
        }

        if (req.body.type) {
            Query.push({ type: parseInt(req.body.type) })
        }

        const Result = await commonquery(Plan, find, (Query.length !== 0) ? { $and: Query } : {}, {}, { __v: 0 }, { _id: -1 })
        return res.json(Result)

    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const PlanStatusUpdate = async (req, res) => {
    try {
        const { status, _id } = req.body
        const Result = await commonquery(Plan, findByIdAndUpdate, { _id }, { status })
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const PlanTypeUpdate = async (req, res) => {
    try {
        const { type, _id } = req.body
        const Result = await commonquery(Plan, findByIdAndUpdate, { _id }, { type })
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const PlanFindWorkout = async (req, res) => {
    try {
        const { _id } = req.body
        const Result = await commonquery(Workout, find, { $and: [{ plan_id: _id }, { status: 1 }] }, {}, { __v: 0, duration: 0, calories: 0, is_free: 0, plan_id: 0, status: 0 })
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const PlanUpdateIndex = async (req, res) => {
    try {
        req.body.forEach(async (val) => {
            await Plan.updateMany({ _id: val.id }, { index: val.index })
        });
        return res.json(await ResponseSuccessmsg(Ok_Status, "Position Update Successfully"))
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const PosesListsCreate = async (req, res) => {
    try {
        const { pose_no, name, media_type, activity_time, backgroundlanguages } = req.body
        let preview = ""
        let media_url = ""

        if (req.files) {
            if (req.files.preview) {
                const Response = await UploadImage(req.files.preview, 'Model/Preview', 'posespreviewimage')
                if (Response.status === true) {
                    preview = await Response.path
                }
            }

            if (req.files.media_url) {
                const Response = await UploadImage(req.files.media_url, 'Model/Video', 'posesmediaurl')
                if (Response.status === true) {
                    media_url = await Response.path
                }
            }
        }

        const phpid = await PosesLists.findOne({}).sort({ php_id: -1 })
        const Result = await commonquery(PosesLists, create, { php_id: (phpid) ? phpid.php_id + 1 : 1, pose_no, name, media_type, activity_time, preview, media_url })

        if (Result.Status === true) {
            if (backgroundlanguages && Array.isArray(backgroundlanguages) === true) {
                var count = 0
                const phpid = await BackgroundAudio.findOne({}).sort({ php_id: -1 })
                backgroundlanguages.map(async (val, index) => {
                    const audio = await UploadImage(req.files.backgroundaudio[index], 'Model/Voice-en', 'audio')
                    if (audio.status === true) {
                        const phplanguageid = await Languages.findOne({ _id: val })
                        count++
                        const data = {
                            php_id: (phpid) ? phpid.php_id + count : 1,
                            php_poses_list_id: Result.Data.php_id,
                            poses_list_id: Result.Data._id,
                            php_language_id: phplanguageid.php_id,
                            language_id: val,
                            audio: audio.path
                        }
                        console.log(data)
                        const BackgroundAudioResult = await commonquery(BackgroundAudio, create, data)
                        if (BackgroundAudioResult.Status === false) {
                            console.log(BackgroundAudioResult.Response_Message)
                        }
                    }
                    else {
                        console.log(audio)
                    }
                })
            }
            else {
                const audio = await UploadImage(req.files.backgroundaudio, 'Model/Voice-en', 'audio')
                if (audio.status === true) {
                    const phpid = await BackgroundAudio.findOne({}).sort({ php_id: -1 })
                    const phplanguageid = await Languages.findOne({ _id: req.body.backgroundlanguages })

                    const data = {
                        php_id: (phpid) ? phpid.php_id + 1 : 1,
                        php_poses_list_id: Result.Data.php_id,
                        poses_list_id: Result.Data._id,
                        php_language_id: phplanguageid.php_id,
                        language_id: req.body.backgroundlanguages,
                        audio: audio.path
                    }
                    const BackgroundAudioResult = await commonquery(BackgroundAudio, create, data)
                    if (BackgroundAudioResult.Status === false) {
                        console.log(BackgroundAudioResult.Response_Message)
                    }
                }
                else {
                    console.log(audio)
                }
            }
        }
        else {
            console.log(Result.Response_Message)
        }

        return res.json(Result)

    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const PosesListsView = async (req, res) => {
    try {
        var msg
        const { _id } = req.body
        const Result = await PosesLists.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(_id)
                }
            },
            {
                $lookup: {
                    from: "backgroundaudios",
                    localField: "_id",
                    foreignField: "poses_list_id",
                    pipeline: [
                        {
                            $lookup: {
                                from: 'languages',
                                localField: 'language_id',
                                foreignField: '_id',
                                pipeline: [{ $project: { _id: 0, __v: 0, language_code: 0, createdAt: 0, updatedAt: 0 } }],
                                as: 'languages'
                            }
                        },
                        {
                            $project: { __v: 0, poses_list_id: 0, _id: 0, language_id: 0, createdAt: 0, updatedAt: 0 }
                        }
                    ],
                    as: "backgroundaudios"
                }
            },
            {
                $project: { __v: 0, createdAt: 0, updatedAt: 0 }
            }
        ])


        if (Result.length > 0) {
            msg = "Data Found Successfully.."
            return res.json(await ResponseSuccess(Ok_Status, msg, Result[0]))
        }
        else {
            msg = "Data Not Found"
            return res.json(await ResponseError(Not_Found, msg))
        }
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const PosesListsEdit = async (req, res) => {
    try {
        var msg
        const { _id } = req.body
        const Result = await PosesLists.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(_id)
                }
            },
            {
                $lookup: {
                    from: "backgroundaudios",
                    localField: "_id",
                    foreignField: "poses_list_id",
                    pipeline: [{ $project: { __v: 0, createdAt: 0, updatedAt: 0 } }],
                    as: "backgroundaudios"
                }
            },
            {
                $project: { __v: 0 }
            }
        ])

        if (Result.length > 0) {
            msg = "Data Found Successfully.."
            return res.json(await ResponseSuccess(Ok_Status, msg, Result[0]))
        }
        else {
            msg = "Data Not Found"
            return res.json(await ResponseError(Not_Found, msg))
        }
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const PosesListsDelete = async (req, res) => {
    try {
        const { _id } = req.body
        const PosesListsfind = await commonquery(PosesLists, findOne, { _id })
        if (PosesListsfind.Status === true) {
            await DeleteImage(PosesListsfind.Data.preview, 'Model/Preview',)
            await DeleteImage(PosesListsfind.Data.media_url, 'Model/Video',)
            const BackgroundAudioResult = await commonquery(BackgroundAudio, find, { poses_list_id: PosesListsfind.Data._id })
            if (BackgroundAudioResult.Status === true) {
                BackgroundAudioResult.Data.map(async (val, index) => {
                    await DeleteImage(val.audio, 'Model/Voice-en')
                })
            }
            await commonquery(BackgroundAudio, deleteMany, { poses_list_id: PosesListsfind.Data._id })
            const Result = await commonquery(PosesLists, findByIdAndDelete, { _id: _id }, {})
            return res.json(Result)
        }
        else {
            return res.json(Planfind)
        }

    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const PosesListsbackgroundaudioDelete = async (req, res) => {
    try {
        const { _id } = req.body
        const findbackgroundaudio = await commonquery(BackgroundAudio, findOne, { _id })
        if (findbackgroundaudio.Data.length !== 0) {
            await DeleteImage(findbackgroundaudio.Data.audio, 'Model/Voice-en')
            const Result = await commonquery(BackgroundAudio, findByIdAndDelete, { _id })
            return res.json(Result)
        }
        else {
            return res.json(findbackgroundaudio)
        }

    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const PosesListsUpdate = async (req, res) => {
    try {
        const { _id, pose_no, name, media_type, activity_time } = req.body
        const PosesListsfind = await commonquery(PosesLists, findOne, { _id })
        if (PosesListsfind.Status === false) {
            return res.json(PosesListsfind)
        }
        let preview = PosesListsfind.Data.preview
        let media_url = PosesListsfind.Data.media_url

        if (req.files) {
            if (req.files.preview) {
                const Delete = await DeleteImage(PosesListsfind.Data.preview, "Model/Preview")
                if (Delete.status == true) {
                    const Response = await UploadImage(req.files.preview, 'Model/Preview', 'posespreviewimage')
                    if (Response.status === true) {
                        preview = await Response.path
                    }
                    else {
                        console.log(Response)
                    }
                }
                else {
                    console.log(Delete)
                }
            }

            if (req.files.media_url) {
                const Delete = await DeleteImage(PosesListsfind.Data.media_url, "Model/Video")
                if (Delete.status == true) {
                    const Response = await UploadImage(req.files.media_url, 'Model/Video', 'posesmediaurl')
                    if (Response.status === true) {
                        media_url = await Response.path
                    }
                    else {
                        console.log(Response)
                    }
                }
                else {
                    console.log(Delete)
                }
            }
        }

        const Result = await commonquery(PosesLists, findByIdAndUpdate, { _id }, { media_url, preview, activity_time, media_type, name, pose_no })
        var count = 0
        var phpidcount = 0

        if (Result.Status == true) {
            const phpid = await BackgroundAudio.findOne({}).sort({ php_id: -1 })
            if (req.body.backgroundid && Array.isArray(req.body.backgroundid) === true) {
                Promise.all(
                    req.body.backgroundid.map(async (val, index) => {
                        if (val !== 'null') {
                            const findbackgroundaudio = await commonquery(BackgroundAudio, findOne, { _id: val })
                            if (parseInt(req.body.updateimage[index]) === 0) {
                                const phplanguageid = await Languages.findOne({ _id: req.body.languageid[index] })
                                var data = {
                                    php_poses_list_id: Result.Data.php_id,
                                    poses_list_id: req.body.poseslistid[index],
                                    language_id: req.body.languageid[index],
                                    php_language_id: phplanguageid.php_id
                                }
                                const BackgroundAudioResult = await commonquery(BackgroundAudio, findByIdAndUpdate, { _id: val }, data)
                                if (BackgroundAudioResult.Status === false) {
                                    console.log(BackgroundAudioResult.Response_Message)
                                }
                            }
                            else {
                                const Delete = await DeleteImage(findbackgroundaudio.Data.audio, "Model/Voice-en")
                                if (req.files.audio && Array.isArray(req.files.audio) === true) {
                                    if (Delete.status === true) {
                                        count++
                                        const UploadAudio = await UploadImage(req.files.audio[count - 1], 'Model/Voice-en', 'audio')
                                        if (UploadAudio.status === true) {
                                            var data = {
                                                audio: UploadAudio.path
                                            }
                                            const BackgroundAudioResult = await commonquery(BackgroundAudio, findByIdAndUpdate, { _id: val }, data)
                                            if (BackgroundAudioResult.Status === false) {
                                                console.log(BackgroundAudioResult.Response_Message)
                                            }
                                        }
                                        else {
                                            console.log(UploadAudio)
                                        }
                                    }
                                    else {
                                        console.log(Delete)
                                    }
                                }
                                else {
                                    if (Delete.status === true) {
                                        console.log(index)
                                        const UploadAudio = await UploadImage(req.files.audio, 'Model/Voice-en', 'audio')
                                        if (UploadAudio.status === true) {
                                            var data = {
                                                audio: UploadAudio.path
                                            }
                                            const BackgroundAudioResult = await commonquery(BackgroundAudio, findByIdAndUpdate, { _id: val }, data)
                                            if (BackgroundAudioResult.Status === false) {
                                                console.log(BackgroundAudioResult.Response_Message)
                                            }
                                        }
                                        else {
                                            console.log(UploadAudio)
                                        }
                                    }
                                    else {
                                        console.log(Delete)
                                    }
                                }
                            }
                        }
                        else {
                            if (req.files.audio && Array.isArray(req.files.audio) === true) {
                                count++
                                const UploadAudio = await UploadImage(req.files.audio[count - 1], 'Model/Voice-en', 'audio')
                                if (UploadAudio.status === true) {
                                    const phplanguageid = await Languages.findOne({ _id: req.body.languageid[index] })
                                    phpidcount++
                                    var data = {
                                        php_id: (phpid) ? phpid.php_id + phpidcount : 1,
                                        php_poses_list_id: Result.Data.php_id,
                                        poses_list_id: req.body.poseslistid[index],
                                        language_id: req.body.languageid[index],
                                        php_language_id: phplanguageid.php_id,
                                        audio: UploadAudio.path
                                    }
                                    const BackgroundAudioResult = await commonquery(BackgroundAudio, create, data)
                                    if (BackgroundAudioResult.Status === false) {
                                        console.log(BackgroundAudioResult.Response_Message)
                                    }
                                }
                                else {
                                    console.log(UploadAudio)
                                }

                            }
                            else {
                                const UploadAudio = await UploadImage(req.files.audio, 'Model/Voice-en', 'audio')
                                if (UploadAudio.status === true) {
                                    const phplanguageid = await Languages.findOne({ _id: req.body.languageid[index] })
                                    phpidcount++
                                    var data = {
                                        php_id: (phpid) ? phpid.php_id + phpidcount : 1,
                                        php_poses_list_id: Result.Data.php_id,
                                        poses_list_id: req.body.poseslistid[index],
                                        language_id: req.body.languageid[index],
                                        php_language_id: phplanguageid.php_id,
                                        audio: UploadAudio.path
                                    }
                                    const BackgroundAudioResult = await commonquery(BackgroundAudio, create, data)
                                    if (BackgroundAudioResult.Status === false) {
                                        console.log(BackgroundAudioResult.Response_Message)
                                    }
                                }
                                else {
                                    console.log(UploadAudio)
                                }
                            }
                        }
                    })
                ).then(async () => {
                    return res.json(Result)
                })
            }
            else {
                if (req.body.backgroundid !== 'null') {
                    const findbackgroundaudio = await commonquery(BackgroundAudio, findOne, { _id: req.body.backgroundid })
                    if (parseInt(req.body.updateimage) === 0) {
                        const phplanguageid = await Languages.findOne({ _id: req.body.languageid })
                        var data = {
                            php_poses_list_id: Result.Data.php_id,
                            poses_list_id: req.body.poseslistid,
                            language_id: req.body.languageid,
                            php_language_id: phplanguageid.php_id
                        }
                        const BackgroundAudioResult = await commonquery(BackgroundAudio, findByIdAndUpdate, { _id: req.body.backgroundid }, data)
                        if (BackgroundAudioResult.Status === false) {
                            console.log(BackgroundAudioResult.Response_Message)
                        }
                    }
                    else {
                        const Delete = await DeleteImage(findbackgroundaudio.Data.audio, "Model/Voice-en")
                        if (Delete.status === true) {
                            const UploadAudio = await UploadImage(req.files.audio, 'Model/Voice-en', 'audio')
                            if (UploadAudio.status === true) {
                                var data = {
                                    audio: UploadAudio.path
                                }
                                const BackgroundAudioResult = await commonquery(BackgroundAudio, findByIdAndUpdate, { _id: req.body.backgroundid }, data)
                                if (BackgroundAudioResult.Status === false) {
                                    console.log(BackgroundAudioResult.Response_Message)
                                }
                            }
                            else {
                                console.log(UploadAudio)
                            }
                        }
                        else {
                            console.log(Delete)
                        }
                    }
                }
                else {
                    const UploadAudio = await UploadImage(req.files.audio, 'Model/Voice-en', 'audio')
                    if (UploadAudio.status === true) {
                        const phplanguageid = await Languages.findOne({ _id: req.body.languageid })

                        var data = {
                            php_id: (phpid) ? phpid.php_id + 1 : 1,
                            php_poses_list_id: Result.Data.php_id,
                            poses_list_id: req.body.poseslistid,
                            language_id: req.body.languageid,
                            php_language_id: phplanguageid.php_id,
                            audio: UploadAudio.path
                        }
                        const BackgroundAudioResult = await commonquery(BackgroundAudio, create, data)
                        if (BackgroundAudioResult.Status === false) {
                            console.log(BackgroundAudioResult.Response_Message)
                        }
                    }
                    else {
                        console.log(UploadAudio)
                    }
                }
                return res.json(Result)
            }
        }


    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const PosesListsAll = async (req, res) => {
    try {
        var msg
        const Result = await PosesLists.aggregate([
            {
                $lookup: {
                    from: "backgroundaudios",
                    localField: "_id",
                    foreignField: "poses_list_id",
                    pipeline: [{ $project: { __v: 0, _id: 0, language_id: 0, poses_list_id: 0, createdAt: 0, updatedAt: 0 } }],
                    as: "backgroundaudio"
                }
            },
            {
                $project: { __v: 0, createdAt: 0, updatedAt: 0 }
            },
            {
                $sort: { _id: -1 }
            }
        ])

        if (Result.length > 0) {
            msg = "Data Found Successfully.."
            return res.json(await ResponseSuccess(Ok_Status, msg, Result))
        }
        else {
            msg = "Data Not Found"
            return res.json(await ResponseError(Not_Found, msg))
        }
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const PosesListsNameAll = async (req, res) => {
    try {
        const Result = await commonquery(PosesLists, find, {}, {}, { pose_no: 1 }, { name: 1 })
        res.send(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const PosesListsSearch = async (req, res) => {
    try {
        var msg
        const { name } = req.body
        const Result = await PosesLists.aggregate([
            {
                $match: { name: { $regex: name, $options: 'i' } }
            },
            {
                $lookup: {
                    from: "backgroundaudios",
                    localField: "_id",
                    foreignField: "poses_list_id",
                    pipeline: [{ $project: { __v: 0, _id: 0, language_id: 0, poses_list_id: 0, createdAt: 0, updatedAt: 0 } }],
                    as: "backgroundaudio"
                }
            },
            {
                $project: { __v: 0, createdAt: 0, updatedAt: 0 }
            },
            {
                $sort: { _id: -1 }
            }
        ])

        if (Result.length > 0) {
            msg = "Data Found Successfully.."
            return res.json(await ResponseSuccess(Ok_Status, msg, Result))
        }
        else {
            msg = "Data Not Found"
            return res.json(await ResponseError(Not_Found, msg))
        }
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const SoundsIndex = async (req, res) => {
    try {
        const Result = await commonquery(Sounds, findOne, {}, {}, { index: 1, _id: 0 }, { index: -1 })
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const SoundsCreate = async (req, res) => {
    try {
        const { index, category_id, name, time, plan_level_id, is_free } = req.body
        let url = ""
        let previewThumb = ""
        let backgroundGIF = ""

        if (req.files) {
            if (req.files.url) {
                const Response = await UploadImage(req.files.url, 'Meditation/Sounds', 'soundsurl')
                if (Response.status === true) {
                    url = await Response.path
                }
            }

            if (req.files.previewThumb) {
                const Response = await UploadImage(req.files.previewThumb, 'Meditation/Thumbs', 'soundspreviewthumb')
                if (Response.status === true) {
                    previewThumb = await Response.path
                }
            }

            if (req.files.backgroundGIF) {
                const Response = await UploadImage(req.files.backgroundGIF, 'Meditation/GIFs', 'soundsbackgroundgif')
                if (Response.status === true) {
                    backgroundGIF = await Response.path
                }
            }
        }
        const phpid = await Sounds.findOne({}).sort({ php_id: -1 })
        const phpcategoryid = await Categories.findOne({ _id: category_id })
        const phpplanlevelid = await PlanLevels.findOne({ _id: plan_level_id })

        const Result = await commonquery(Sounds, create, { php_id: (phpid) ? phpid.php_id + 1 : 1, index, php_category_id: phpcategoryid.php_id, category_id, name, url, time, php_plan_level_id: phpplanlevelid.php_id, plan_level_id, is_free, previewThumb, backgroundGIF })
        return res.json(Result)

    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const SoundsView = async (req, res) => {
    try {
        var msg
        const { _id } = req.body
        const AllCategories = await commonquery(Sounds, find, {}, {}, { __v: 0, createdAt: 0, updatedAt: 0 }, { index: 1 })
        Promise.all(
            AllCategories.Data.map(async (val, index) => {
                if (val.index !== index + 1) {
                    await commonquery(Sounds, findByIdAndUpdate, { _id: val._id }, { index: index + 1 })
                }
            })
        ).then(async () => {
            const Result = await Sounds.findOne({ _id }).populate('category_id', { index: 0, __v: 0, createdAt: 0, updatedAt: 0 }).populate('plan_level_id', { __v: 0, createdAt: 0, updatedAt: 0 })
            if (Result) {
                msg = "Data Found Successfully.."
                return res.json(await ResponseSuccess(Ok_Status, msg, Result))
            }
            else {
                msg = "Data Not Found"
                return res.json(await ResponseError(Not_Found, msg))
            }
        })

    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const SoundsEdit = async (req, res) => {
    try {
        const { _id } = req.body
        const Result = await commonquery(Sounds, findOne, { _id }, {}, { __v: 0 })
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const SoundsDelete = async (req, res) => {
    try {
        const { _id } = req.body
        const Soundsfind = await commonquery(Sounds, findOne, { _id })
        if (Soundsfind.Status === true) {
            await DeleteImage(Soundsfind.Data.url, 'Meditation/Sounds/')
            await DeleteImage(Soundsfind.Data.previewThumb, 'Meditation/Thumbs')
            await DeleteImage(Soundsfind.Data.backgroundGIF, 'Meditation/GIFs')
            const Result = await commonquery(Sounds, findByIdAndDelete, { _id: _id }, {})
            return res.json(Result)
        }
        else {
            return res.json(Soundsfind)
        }

    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const SoundsUpdate = async (req, res) => {
    try {
        const { _id, index, category_id, name, time, plan_level_id, is_free } = req.body
        const soundsfind = await commonquery(Sounds, findOne, { _id })
        if (soundsfind.Status === false) {
            return res.json(soundsfind)
        }

        let url = soundsfind.Data.url
        let previewThumb = soundsfind.Data.previewThumb
        let backgroundGIF = soundsfind.Data.backgroundGIF

        if (req.files) {
            if (req.files.url) {
                const Delete = await DeleteImage(soundsfind.Data.url, "Meditation/Sounds")
                if (Delete.status == true) {
                    const Response = await UploadImage(req.files.url, 'Meditation/Sounds', 'soundsurl')
                    if (Response.status === true) {
                        url = await Response.path
                    }
                    else {
                        console.log(Response)
                    }
                }
                else {
                    console.log(Delete)
                }
            }

            if (req.files.previewThumb) {
                const Delete = await DeleteImage(soundsfind.Data.previewThumb, "Meditation/Thumbs")
                if (Delete.status == true) {
                    const Response = await UploadImage(req.files.previewThumb, 'Meditation/Thumbs', 'soundspreviewthumb')
                    if (Response.status === true) {
                        previewThumb = await Response.path
                    }
                    else {
                        console.log(Response)
                    }
                }
                else {
                    console.log(Delete)
                }
            }

            if (req.files.backgroundGIF) {
                const Delete = await DeleteImage(soundsfind.Data.backgroundGIF, "Meditation/GIFs")
                if (Delete.status == true) {
                    const Response = await UploadImage(req.files.backgroundGIF, 'Meditation/GIFs', 'soundsbackgroundgif')
                    if (Response.status === true) {
                        backgroundGIF = await Response.path
                    }
                    else {
                        console.log(Response)
                    }
                }
                else {
                    console.log(Delete)
                }
            }
        }

        const phpcategoryid = await Categories.findOne({ _id: category_id })
        const phpplanlevelid = await PlanLevels.findOne({ _id: plan_level_id })

        const Result = await commonquery(Sounds, findByIdAndUpdate, { _id }, { index, php_category_id: phpcategoryid.php_id, category_id, name, time, php_plan_level_id: phpplanlevelid.php_id, plan_level_id, is_free, url, previewThumb, backgroundGIF })
        return res.json(Result)

    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const SoundsAll = async (req, res) => {
    try {
        var msg
        const AllCategories = await commonquery(Sounds, find, {}, {}, { __v: 0, createdAt: 0, updatedAt: 0 }, { index: 1 })
        Promise.all(
            AllCategories.Data.map(async (val, index) => {
                if (val.index !== index + 1) {
                    await commonquery(Sounds, findByIdAndUpdate, { _id: val._id }, { index: index + 1 })
                }
            })
        ).then(async () => {
            const Result = await Sounds.find({}).populate('category_id', { index: 0, __v: 0, createdAt: 0, updatedAt: 0 }).populate('plan_level_id', { __v: 0, createdAt: 0, updatedAt: 0 }).sort({ index: -1 })
            if (Result.length > 0) {
                msg = "Data Found Successfully.."
                return res.json(await ResponseSuccess(Ok_Status, msg, Result))
            }
            else {
                msg = "Data Not Found"
                return res.json(await ResponseError(Not_Found, msg))
            }
        })
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const SoundsName = async (req, res) => {
    try {
        const Result = await commonquery(Sounds, find, {}, {}, { _id: 1, name: 1 }, { index: -1 })
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const SoundsSearch = async (req, res) => {
    try {
        const { name } = req.body
        var msg
        const Result = await Sounds.find((name === "") ? {} : { name: { $regex: name, $options: 'i' } }).populate('category_id', { index: 0, __v: 0, createdAt: 0, updatedAt: 0 }).populate('plan_level_id', { __v: 0, createdAt: 0, updatedAt: 0 }).sort({ index: 1 })
        if (Result.length > 0) {
            msg = "Data Found Successfully.."
            return res.json(await ResponseSuccess(Ok_Status, msg, Result))
        }
        else {
            msg = "Data Not Found"
            return res.json(await ResponseError(Not_Found, msg))
        }
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const SoundUpdateIndex = async (req, res) => {
    try {
        req.body.forEach(async (val) => {
            await Sounds.updateMany({ _id: val.id }, { index: val.index })
        });
        return res.json(await ResponseSuccessmsg(Ok_Status, "Position Update Successfully"))
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const ExercisesIndex = async (req, res) => {
    try {
        const Result = await commonquery(ExercisesPoses, findOne, {}, {}, { index: 1, _id: 0 }, { index: -1 })
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const ExercisesCreate = async (req, res) => {
    try {
        const { series_id, workout_id, status } = req.body

        const phpid = await Exercises.findOne({}).sort({ php_id: -1 })
        const phpseriesid = await Plan.findOne({ _id: series_id })
        const phpworkoutid = await Workout.findOne({ _id: workout_id })

        const Response = await commonquery(Exercises, create, { php_id: (phpid) ? phpid.php_id + 1 : 1, php_series_id: phpseriesid.php_id, series_id, php_workout_id: phpworkoutid.php_id, workout_id, status })
        if (Response.Status === true) {
            var index = 1
            if (req.body.Exercisesposesid && Array.isArray(req.body.Exercisesposesid) === true) {
                const ExercisesPosesCount = await commonquery(ExercisesPoses, find, {}, {}, {}, { index: -1 })
                if (ExercisesPosesCount.Status === true) {
                    var index = ExercisesPosesCount.Data[ExercisesPosesCount.Data.length - (ExercisesPosesCount.Data.length)].index + 1
                }
                var count = 0
                req.body.Exercisesposesid.map(async (val, ind) => {
                    const phpid = await ExercisesPoses.findOne({}).sort({ php_id: -1 })
                    const phpposelistid = await PosesLists.findOne({ _id: val })
                    count++
                    const data = {
                        php_id: (phpid) ? phpid.php_id + count : 1,
                        index: index + ind,
                        exercise_id: Response.Data._id,
                        php_exercise_id: Response.Data.php_id,
                        poses_list_id: val,
                        php_poses_list_id: phpposelistid.php_id
                    }
                    const Result = await commonquery(ExercisesPoses, create, data)
                    if (Result.Status === false) {
                        console.log(Result.Response_Message)
                    }
                })
            }
            else {
                if (req.body.Exercisesposesid !== undefined) {
                    const ExercisesPosesCount = await commonquery(ExercisesPoses, find, {}, {}, {}, { index: -1 })
                    if (ExercisesPosesCount.Status === true) {
                        var index = ExercisesPosesCount.Data[ExercisesPosesCount.Data.length - (ExercisesPosesCount.Data.length)].index + 1
                    }
                    const phpid = await ExercisesPoses.findOne({}).sort({ php_id: -1 })
                    const phpposelistid = await PosesLists.findOne({ _id: req.body.Exercisesposesid })

                    const data = {
                        php_id: (phpid) ? phpid.php_id + 1 : 1,
                        index: index,
                        exercise_id: Response.Data._id,
                        php_exercise_id: Response.Data.php_id,
                        poses_list_id: req.body.Exercisesposesid,
                        php_poses_list_id: phpposelistid.php_id
                    }
                    const Result = await commonquery(ExercisesPoses, create, data)
                    if (Result.Status === false) {
                        console.log(Result.Response_Message)
                    }
                }
            }
        }

        return res.json(Response)

    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const ExercisesView = async (req, res) => {
    try {
        var msg
        const { _id } = req.body
        const Result = await Exercises.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(_id)
                }
            },
            {
                $lookup: {
                    from: 'exercisesposes',
                    localField: '_id',
                    foreignField: 'exercise_id',
                    pipeline: [
                        {
                            $sort: { index: 1 }
                        },
                        {
                            $lookup: {
                                from: 'poseslists',
                                localField: 'poses_list_id',
                                foreignField: '_id',
                                pipeline: [{ $project: { _id: 0, pose_no: 0, preview: 0, media_type: 0, media_url: 0, activity_time: 0, __v: 0 } }],
                                as: 'poseslists'
                            }
                        },
                        {
                            $unwind: '$poseslists'
                        },
                        {
                            $project: { _id: 1, index: 1, 'name': '$poseslists.name' }
                        },
                    ],
                    as: 'exercisesposelist'
                }
            },
            {
                $project: { __v: 0 }
            }
        ])

        if (Result.length > 0) {
            msg = "Data Found Successfully.."
            return res.json(await ResponseSuccess(Ok_Status, msg, Result[0]))
        }
        else {
            msg = "Data Not Found"
            return res.json(await ResponseError(Not_Found, msg))
        }

    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const ExercisesEdit = async (req, res) => {
    try {
        var msg
        const { _id } = req.body
        const Result = await Exercises.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(_id)
                }
            },
            {
                $lookup: {
                    from: 'exercisesposes',
                    localField: '_id',
                    foreignField: 'exercise_id',
                    pipeline: [
                        {
                            $sort: { index: 1 }
                        },
                        {
                            $project: { _id: 1, index: 1, exercise_id: 1, poses_list_id: 1 }
                        }
                    ],
                    as: 'exerciselist'
                }
            },
            {
                $project: { __v: 0, }
            }
        ])


        Result.map((val, ind) => {
            if (val.exerciselist.length === 1) {
                val.index = val.exerciselist[val.exerciselist.length - (val.exerciselist.length)].index
            }
            else {
                val.index = val.exerciselist[val.exerciselist.length - (val.exerciselist.length - 1)].index
            }
        })


        if (Result.length > 0) {
            msg = "Data Found Successfully.."
            return res.json(await ResponseSuccess(Ok_Status, msg, Result[0]))
        }
        else {
            msg = "Data Not Found"
            return res.json(await ResponseError(Not_Found, msg))
        }

    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const ExercisesDelete = async (req, res) => {
    try {
        const { _id } = req.body
        const findexercises = await commonquery(Exercises, findOne, { _id })
        if (findexercises.Status === true) {
            const deleteexercisesposes = await commonquery(ExercisesPoses, deleteMany, { exercise_id: findexercises.Data._id })
            if (deleteexercisesposes.Status === true) {
                const deleteexercises = await commonquery(Exercises, findByIdAndDelete, { _id })
                if (deleteexercises.Status === true) {
                    return res.json(deleteexercises)
                }
                else {
                    return res.json(deleteexercises)
                }
            }
            else {
                return res.json(deleteexercisesposes)
            }
        }

        return res.json(findexercises)

    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const ExercisesPosesDelete = async (req, res) => {
    try {
        const { _id } = req.body
        const Result = await commonquery(ExercisesPoses, findByIdAndDelete, { _id })
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const ExercisesUpdate = async (req, res) => {
    try {

        const { _id, series_id, workout_id, status } = req.body

        const findexercises = await commonquery(Exercises, findOne, { _id })
        if (findexercises.Status === false) {
            return res.json(findexercises)
        }

        const phpseriesid = await Plan.findOne({ _id: series_id })
        const phpworkoutid = await Workout.findOne({ _id: workout_id })

        const update = await commonquery(Exercises, findByIdAndUpdate, { _id }, { php_series_id: phpseriesid.php_id, php_workout_id: phpworkoutid.php_id, series_id, workout_id, status })
        if (update.Status == false) {
            return res.json(update)
        }

        if (req.body.Exercisesposesid && Array.isArray(req.body.Exercisesposesid) === true) {
            var count = 0
            req.body.Exercisesposesid.map(async (val, ind) => {
                if (val !== 'null') {
                    const findexercisesposes = await commonquery(ExercisesPoses, findOne, { _id: val })
                    const phpposelistid = await PosesLists.findOne({ _id: req.body.Exercisesposeslistid[ind] })
                    const data = {
                        index: req.body.Exercisesposesindex[ind],
                        poses_list_id: req.body.Exercisesposeslistid[ind],
                        php_poses_list_id: phpposelistid.php_id
                    }
                    const UpdatEexercisesPoses = await commonquery(ExercisesPoses, findByIdAndUpdate, { _id: findexercisesposes.Data._id }, data)
                    if (UpdatEexercisesPoses.Status === false) {
                        return res.json(UpdatEexercisesPoses)
                    }
                }
                else {
                    const phpid = await ExercisesPoses.findOne({}).sort({ php_id: -1 })
                    const phpposelistid = await PosesLists.findOne({ _id: req.body.Exercisesposeslistid[ind] })
                    count++
                    const data = {
                        php_id: (phpid) ? phpid.php_id + count : 1,
                        index: req.body.Exercisesposesindex[ind],
                        exercise_id: update.Data._id,
                        php_exercise_id: update.Data.php_id,
                        poses_list_id: req.body.Exercisesposeslistid[ind],
                        php_poses_list_id: phpposelistid.php_id
                    }
                    const Result = await commonquery(ExercisesPoses, create, data)
                    if (Result.Status === false) {
                        console.log(Result.Response_Message)
                    }
                }
            })
        }
        else {
            if (req.body.Exercisesposesid !== undefined) {
                const phpid = await ExercisesPoses.findOne({}).sort({ php_id: -1 })
                const phpposelistid = await PosesLists.findOne({ _id: req.body.Exercisesposeslistid })

                const data = {
                    php_id: (phpid) ? phpid.php_id + 1 : 1,
                    index: req.body.Exercisesposesindex,
                    exercise_id: update.Data._id,
                    php_exercise_id: update.Data.php_id,
                    poses_list_id: req.body.Exercisesposeslistid,
                    php_poses_list_id: phpposelistid.php_id
                }
                const Result = await commonquery(ExercisesPoses, create, data)
                if (Result.Status === false) {
                    console.log(Result.Response_Message)
                }
            }
        }

        return res.json(update)

    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const ExercisesStatusUpdate = async (req, res) => {
    try {
        const { _id, status } = req.body
        const Result = await commonquery(Exercises, findByIdAndUpdate, { _id }, { status })
        res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const ExercisesAll = async (req, res) => {
    try {
        var msg
        const Result = await Exercises.aggregate([
            {
                $lookup: {
                    from: 'plans',
                    localField: 'series_id',
                    foreignField: '_id',
                    pipeline: [
                        {
                            $project: { _id: 0, plan_name: 1 }
                        },
                        {
                            $sort: { plan_name: 1 }
                        }
                    ],
                    as: 'plan'
                }
            },
            {
                $unwind: '$plan'
            },
            {
                $lookup: {
                    from: 'workouts',
                    localField: 'workout_id',
                    foreignField: '_id',
                    pipeline: [
                        {
                            $project: { workout_name: 1, _id: 0 }
                        }
                    ],
                    as: 'workout'
                }
            },
            {
                $unwind: '$workout'
            },
            {
                $project: { status: 1, _id: 1, plan: '$plan.plan_name', workout_name: '$workout.workout_name' }
            },
        ])

        if (Result.length > 0) {
            msg = "Data Found Successfully.."
            return res.json(await ResponseSuccess(Ok_Status, msg, Result))
        }
        else {
            msg = "Data Not Found"
            return res.json(await ResponseError(Not_Found, msg))
        }

    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const ExercisesSearch = async (req, res) => {
    try {
        const { name, status } = req.body
        var msg

        let src = {}
        if (status != "") {
            src.status = parseInt(status)
        }
        const Result = await Exercises.aggregate([
            {
                $match: src
            },
            {
                $lookup: {
                    from: 'plans',
                    localField: 'series_id',
                    foreignField: '_id',
                    pipeline: [
                        {
                            $project: { _id: 0, plan_name: 1 }
                        },
                        {
                            $match: { plan_name: { $regex: name, $options: 'i' } }
                        }
                    ],
                    as: 'plan'
                }
            },
            {
                $unwind: '$plan'
            },
            {
                $lookup: {
                    from: 'workouts',
                    localField: 'workout_id',
                    foreignField: '_id',
                    pipeline: [
                        {
                            $project: { workout_name: 1, _id: 0 }
                        }
                    ],
                    as: 'workout'
                }
            },
            {
                $unwind: '$workout'
            },
            {
                $project: { status: 1, _id: 1, plan: '$plan.plan_name', workout_name: '$workout.workout_name' }
            },
            {
                $sort: { _id: -1 }
            }
        ])

        if (Result.length > 0) {
            msg = "Data Found Successfully.."
            return res.json(await ResponseSuccess(Ok_Status, msg, Result))
        }
        else {
            msg = "Data Not Found"
            return res.json(await ResponseError(Not_Found, msg))
        }
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const ExercisesUpdateIndex = async (req, res) => {
    try {
        req.body.forEach(async (val) => {
            await ExercisesPoses.updateMany({ _id: val.id }, { index: val.index })
        });
        return res.json(await ResponseSuccessmsg(Ok_Status, "Position Update Successfully"))
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const ConfigurationCreate = async (req, res) => {
    try {
        const { status, subscription, subscription_required_ios, plans_local_free_ios, plans_local_free_android, plans_local_showfirst_ios, plans_local_showfirst_android } = req.body
        const Result = await commonquery(FirstDayUnlocks, create, { status, subscription, subscription_required_ios, plans_local_free_ios, plans_local_free_android, plans_local_showfirst_ios, plans_local_showfirst_android })
        if (Result.Status === false) {
            console.log(Result)
        }
        res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const ConfigurationStatusUpdate = async (req, res) => {
    try {
        const { status, subscription, subscription_required_ios, plans_local_free_ios, plans_local_free_android, plans_local_showfirst_ios, plans_local_showfirst_android } = req.body
        const CountData = await commonquery(FirstDayUnlocks, count)
        if (CountData.Data === 0) {
            const Response = await commonquery(FirstDayUnlocks, create, { status: 0, subscription: 0 })
            if (Response.Status === false) {
                console.log(Response)
            }
        }
        else {
            const Finddata = await commonquery(FirstDayUnlocks, findOne)
            var Data = {
                status: status,
                subscription: subscription,
                subscription_required_ios: subscription_required_ios,
                plans_local_free_ios: plans_local_free_ios,
                plans_local_free_android: plans_local_free_android,
                plans_local_showfirst_ios: plans_local_showfirst_ios,
                plans_local_showfirst_android: plans_local_showfirst_android
            }
            const UpdateStatus = await commonquery(FirstDayUnlocks, findByIdAndUpdate, { _id: Finddata.Data._id }, Data, { new: true })
            if (UpdateStatus.Status === true) {
                res.json(await ResponseSuccessmsg(Ok_Status, "Firstday Unlock status change Successfully ..!"))
            }
            else {
                res.json(await ResponseErrormsg(Ok_Status, "Something Went Wrong, Status Not Changed ..!"))
            }
        }


    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const ConfigurationAll = async (req, res) => {
    try {
        const Result = await commonquery(FirstDayUnlocks, findOne, {}, {}, { __v: 0 })
        res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const ConfigurationDelete = async (req, res) => {
    try {
        const { _id } = req.body
        const Result = await commonquery(FirstDayUnlocks, findByIdAndDelete, { _id }, {})
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const GuestTokenAll = async (req, res) => {
    try {
        const Result = await commonquery(GuestToken, find, {}, {}, { __v: 0 }, { _id: -1 })
        res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}


const Register = async (req, res) => {
    try {
        var { email, password } = req.body
        password = await CreateBcryptPassword(password)
        const Result = await commonquery(RegisterAdminPanel, create, { email, password })
        res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const RegisterUpdate = async (req, res) => {
    try {
        var { _id, email, password } = req.body
        password = await CreateBcryptPassword(password)
        const Result = await commonquery(RegisterAdminPanel, findByIdAndUpdate, { _id }, { email, password })
        res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        const Result = await commonquery(RegisterAdminPanel, findOne, { email }, {}, { __v: 0 })
        if (Result.Status === true) {
            const CheckPassword = await CheckBcryptPassword(password, Result.Data.password)
            if (CheckPassword === true) {
                const token = await Result.Data.gettoken()
                const Response = {
                    _id: Result.Data._id,
                    email: Result.Data.email,
                    password: Result.Data.password
                }
                return res.json(await ResponseWithTokenSuccess(Ok_Status, "User Login Successfully", Response, token))
            }
            else {
                return res.json(await ResponseError(Not_Found, "Please Enter Valid Password"))
            }
        }
        else {
            return res.json(await ResponseError(Not_Found, "Your Email Id Does Not Exist"))
        }

    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const Authenticat = async function (req, res, next) {
    try {
        const authorization = req.headers.authorization
        if (authorization) {
            const token = authorization.split(' ')[1]
            const verif = await VerifyJwtToken(token)
            if (verif?.Status !== false) {
                req.verifytoken = token
                var Result = await commonquery(RegisterAdminPanel, findOne, { _id: verif._id }, {}, { __v: 0 })
                const CheckToken = Result.Data.tokens.filter((curr) => {
                    return curr.token === token
                })
                if (CheckToken.length === 0) {
                    return res.json(await ResponseErrormsg(Not_Found, "Enter Your Invalid Token"))
                }
                else {
                    req.register = Result.Data
                    req.token = token
                    next()
                }
            }
            else {
                return res.json(verif)
            }
        }
        else {
            return res.json(await ResponseErrormsg(Not_Found, "Please Enter Your Token"))
        }
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const Logout = async function (req, res) {
    try {
        req.register.tokens = req.register.tokens.filter((curr) => {
            return curr.token !== req.token
        })
        await req.register.save()
        return res.json(await ResponseSuccessmsg(Ok_Status, "User Logout Successfully"))

    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const DashboardCount = async function (req, res) {
    try {
        const PlanCount = await commonquery(Plan, count)
        const ExercisesCount = await commonquery(Exercises, count)
        const SoundsCount = await commonquery(Sounds, count)
        const PosesListsCount = await commonquery(PosesLists, count)
        const CategoriesCount = await Sounds.aggregate([
            {
                $group: { _id: '$category_id', count: { $sum: 1 } }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "_id",
                    foreignField: "_id",
                    as: "Category"
                }
            },
            {
                $unwind: '$Category'
            }
            ,
            {
                $project: { _id: 1, count: 1, category_name: "$Category.category_name" }
            }
        ])

        const PlanLevels = await Plan.aggregate([
            {
                $group: { _id: "$plan_level_id", count: { $sum: 1 } }
            },
            {
                $lookup: {
                    from: "planlevels",
                    localField: "_id",
                    foreignField: "_id",
                    as: "planlevels"
                }
            },
            {
                $unwind: '$planlevels'
            },
            {
                $project: { _id: 1, count: 1, plan_level: "$planlevels.plan_level" }
            }
        ])
        const Result = {
            PlanCount: PlanCount.Data,
            ExercisesCount: ExercisesCount.Data,
            SoundsCount: SoundsCount.Data,
            PosesListsCount: PosesListsCount.Data,
            CategoriesCount: CategoriesCount,
            PlanLevels: PlanLevels
        }

        return res.json(await ResponseSuccess(Ok_Status, "Dashboard Count Successfully...", Result))

    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const UserAll = async (req, res) => {
    try {
        const Result = await commonquery(UserRegister, find, {}, {}, { __v: 0 }, { user_email: 1 })
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const UserView = async (req, res) => {
    try {
        const { _id } = req.body
        const Result = await commonquery(UserRegister, findOne, { _id }, {}, { __v: 0 })
        return res.json(Result)
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const UserSearch = async (req, res) => {
    try {
        var Query = []

        if (req.body.email) {
            Query.push({ user_email: { $regex: req.body.email, $options: 'i' } })
        }

        if (req.body.device_platform) {
            Query.push({ device_platform: { $regex: req.body.device_platform, $options: 'i' } })
        }

        if (req.body.subscribe) {
            Query.push({ is_subscribe: req.body.subscribe })
        }

        if (req.body.date) {
            const DateArray = req.body.date.split("-")
            var Startdate = new Date(DateArray[0])
            var Enddate = new Date(DateArray[1])
            Startdate.setDate(Startdate.getDate() + 1)
            Enddate.setDate(Enddate.getDate() + 1)
            Startdate.setMinutes(Startdate.getMinutes() - (19 * 60) + 30)
            Query.push({ createdAt: { $gte: Startdate, $lte: Enddate } })
        }

        const Result = await commonquery(UserRegister, find, (Query.length != 0) ? { $and: Query } : {}, {}, { __v: 0 })
        return res.json(Result)

    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

const UserChangePassword = async (req, res) => {
    try {
        var user_id = req.body.user_id
        var user_register = await UserRegister.findOne({ _id: user_id })
        if (user_register) {
            const Result = await UserRegister.findByIdAndUpdate({ _id: user_id }, { user_password: md5(req.body.password) }, {new:true})
            if (Result) {
                return res.json(await ResponseSuccessmsg(Ok_Status, "Password reset successfully"))
            }
            else {
                return res.json(await ResponseErrormsg(Not_Found, "Password not reset successfully"))
            }
        }
    } catch (error) {
        return res.json(await CatchErrors(Not_Found, error.message))
    }
}

export {
    TagsCreate, TagsView, TagsEdit, TagsDelete, TagsUpdate, TagsAll, TagsActiveStatusAll, TagsStatusUpdate, TagsSearch,
    CategoriesIndex, CategoriesCreate, CategoriesView, CategoriesEdit, CategoriesDelete, CategoriesUpdate, CategoriesAll, CategoriesSearch, CategoriesUpdateIndex,
    LanguagesCreate, LanguagesView, LanguagesEdit, LanguagesDelete, LanguagesUpdate, LanguagesAll,
    PlanlevelsCreate, PlanlevelsView, PlanlevelsEdit, PlanlevelsDelete, PlanlevelsUpdate, PlanlevelsAll,
    PlanIndex, PlanCreate, PlanView, PlanEdit, PlanDelete, PlanWorkoutDelete, PlanUpdate, PlanAll, PlanSearch, PlanStatusUpdate, PlanTypeUpdate, PlanFindWorkout, PlanUpdateIndex,
    PosesListsCreate, PosesListsView, PosesListsEdit, PosesListsDelete, PosesListsbackgroundaudioDelete, PosesListsUpdate, PosesListsAll, PosesListsNameAll, PosesListsSearch,
    SoundsIndex, SoundsCreate, SoundsView, SoundsEdit, SoundsDelete, SoundsUpdate, SoundsAll, SoundsName, SoundsSearch, SoundUpdateIndex,
    ExercisesIndex, ExercisesCreate, ExercisesView, ExercisesEdit, ExercisesDelete, ExercisesPosesDelete, ExercisesUpdate, ExercisesStatusUpdate, ExercisesAll, ExercisesSearch, ExercisesUpdateIndex,
    ConfigurationCreate, ConfigurationStatusUpdate, ConfigurationDelete, ConfigurationAll, GuestTokenAll,
    Register, RegisterUpdate, Login, Authenticat, Logout,
    DashboardCount, UserAll, UserView, UserSearch, UserChangePassword
}