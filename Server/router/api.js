import express from "express";
import { change_user_address, final_workout_routin, firstDayUnlock, forgot_pwd, meditationSounds, plan_list, series_workout_list, user_change_password, user_delete_profile, user_join_plan_workout, user_login, user_subscribe, user_workout_review } from "../controller/api.js";
const router = express.Router()

router.post("/seriesWorkoutList", series_workout_list)
router.post("/FinalWorkoutRoutin", final_workout_routin)
router.post("/meditationSounds", meditationSounds)
router.post("/userLogin", user_login)
router.post("/userDeleteProfile", user_delete_profile)
router.post("/userChangePassword", user_change_password)
router.post("/changeUserAddress", change_user_address)
router.post("/userResetPassword", forgot_pwd)
router.post("/planList", plan_list)
router.post("/userJoinPlanWorkout", user_join_plan_workout)
router.post("/userWorkoutReview", user_workout_review)
router.post("/firstDayUnlock", firstDayUnlock)
router.post("/userSubscribe", user_subscribe)

export default router