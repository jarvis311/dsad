import axios from "axios";


const CatchError = (error) => {
    return ({ Status: false, Response_Code: 404, Response_Message: error.message })
}

export const DashboardData = async () => {
    try {
        const Result = await axios.post("/dashboardcount")
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const UserLogin = async (Data) => {
    try {
        const Form = new FormData()
        Form.append('email', Data.Email)
        Form.append('password', Data.Password)
        const Result = await axios.post('/login', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const LogoutApi = async () => {
    try {
        const Response = await axios.post('/logout')
        return Response
    } catch (error) {
        return CatchError(error)
    }
}

export const TagAdd = async (Data) => {
    try {
        const Form = new FormData()
        Form.append('name', Data.name)
        Form.append('service_name', Data.service_name)
        const Result = await axios.post('/tags', Form)
        return Result

    } catch (error) {
        return CatchError(error)
    }
}

export const TagsAll = async () => {
    try {
        const Result = await axios.post('/tags/all')
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const TagsActiveStatusAll = async () => {
    try {
        const Result = await axios.post('/tags/activestatus/all')
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const TagView = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/tags/view', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const TagEdit = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/tags/edit', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const TagUpdate = async (Data) => {
    try {
        const Form = new FormData()
        Form.append('name', Data.name)
        Form.append('service_name', Data.service_name)
        Form.append('_id', Data._id)
        const Result = await axios.post('/tags/update', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const TagsStatusUpdate = async (Status, id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        Form.append('status', Status)
        const Result = await axios.post('/tags/status', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const TagSearch = async (Name, Status) => {
    try {
        const Form = new FormData()
        Form.append('name', Name)
        Form.append('status', Status)
        const Result = await axios.post('/tags/search', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const TagDelete = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/tags/delete', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const PlanLevelAdd = async (Data) => {
    try {
        const Form = new FormData()
        Form.append('plan_level', Data.planlevel)
        const Result = await axios.post('/planlevels', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const PlanLevelAll = async () => {
    try {
        const Result = await axios.post('/planlevels/all')
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const PlanLevelView = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/planlevels/view', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const PlanLevelEdit = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/planlevels/edit', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const PlanLevelUpdate = async (Data) => {
    try {
        const Form = new FormData()
        Form.append('plan_level', Data.planlevel)
        Form.append('_id', Data._id)
        const Result = await axios.post('/planlevels/update', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const PlanLevelDelete = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/planlevels/delete', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const LanguageAdd = async (Data) => {
    try {
        const Form = new FormData()
        Form.append('language', Data.language)
        Form.append('language_code', Data.languagecode)
        const Result = await axios.post('/languages', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const LanguageAll = async () => {
    try {
        const Result = await axios.post('/languages/all')
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const LanguageView = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/languages/view', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const LanguageEdit = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/languages/edit', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const LanguageUpdate = async (Data) => {
    try {
        const Form = new FormData()
        Form.append('language', Data.language)
        Form.append('language_code', Data.languagecode)
        Form.append('_id', Data._id)
        const Result = await axios.post('/languages/update', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const LanguageDelete = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/languages/delete', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const CategorieIndex = async () => {
    try {
        const Result = await axios.post('/categories/index')
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const CategorieAdd = async (Data) => {
    try {
        const Form = new FormData()
        Form.append('index', Data.index)
        Form.append('category_name', Data.category_name)
        const Result = await axios.post('/categories', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const CategorieAll = async () => {
    try {
        const Result = await axios.post('/categories/all')
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const CategorieView = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/categories/view', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const CategorieEdit = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/categories/edit', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const CategorieUpdate = async (Data) => {
    try {
        const Form = new FormData()
        Form.append('_id', Data._id)
        Form.append('index', Data.index)
        Form.append('category_name', Data.category_name)
        const Result = await axios.post('/categories/update', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const CategorieSearch = async (categoryname) => {
    try {
        const Form = new FormData()
        Form.append('category_name', categoryname)
        const Result = await axios.post('/categories/search', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const CategorieDelete = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/categories/delete', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const CategorieDragAndDrop = async (Data) => {
    try {
        const Result = await axios.post('/categories/Updateindex', Data)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const SoundIndex = async () => {
    try {
        const Result = await axios.post('/sounds/index')
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const SoundAdd = async (Data) => {
    try {
        const Form = new FormData()
        Form.append('index', Data.index)
        Form.append('category_id', Data.category_id)
        Form.append('name', Data.name)
        Form.append('time', Data.time)
        Form.append('plan_level_id', Data.plan_level_id)
        Form.append('is_free', Data.is_free)
        Form.append('url', Data.url)
        Form.append('previewThumb', Data.previewThumb)
        Form.append('backgroundGIF', Data.backgroundGIF)
        const Result = await axios.post('/sounds', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const SoundView = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/sounds/view', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const SoundEdit = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/sounds/edit', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const SoundUpdate = async (Data) => {
    try {
        const Form = new FormData()
        Form.append('_id', Data._id)
        Form.append('index', Data.index)
        Form.append('category_id', Data.category_id)
        Form.append('name', Data.name)
        Form.append('time', Data.time)
        Form.append('plan_level_id', Data.plan_level_id)
        Form.append('is_free', Data.is_free)
        Form.append('url', Data.url)
        Form.append('previewThumb', Data.previewThumb)
        Form.append('backgroundGIF', Data.backgroundGIF)
        const Result = await axios.post('/sounds/update', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const SoundAll = async () => {
    try {
        const Result = await axios.post('/sounds/all')
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const SoundName = async () => {
    try {
        const Result = await axios.post('/sounds/name')
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const SoundSearch = async (soundname) => {
    try {
        const Form = new FormData()
        Form.append('name', soundname)
        const Result = await axios.post('/sounds/search', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const SoundDelete = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/sounds/delete', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const SoundDragAndDrop = async (Data) => {
    try {
        const Result = await axios.post('/sounds/Updateindex', Data)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const PoseListsAdd = async (Data, backgroundid) => {
    try {
        const Form = new FormData()
        Form.append('pose_no', Data.pose_no)
        Form.append('name', Data.name)
        Form.append('media_type', Data.media_type)
        Form.append('activity_time', Data.activity_time)
        Form.append('preview', Data.preview)
        Form.append('media_url', Data.media_url)
        backgroundid.map(async (val) => {
            Form.append('backgroundaudio', val.background_audio)
            Form.append('backgroundlanguages', val.language_id)
        })
        const Result = await axios.post('/poseslists', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const PoseListsAll = async () => {
    try {
        const Result = await axios.post('/poseslists/all')
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const PoseListsDelete = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/poseslists/delete', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const PoseListsSearch = async (poselistsname) => {
    try {
        const Form = new FormData()
        Form.append('name', poselistsname)
        const Result = await axios.post('/poseslists/search', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const PoseListsView = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/poseslists/view', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const PoseListsEdit = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/poseslists/edit', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const PoseListsAudioDelete = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/poseslists/backgroundaudio/delete', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const PoseListsUpdate = async (Data, backgroundid) => {
    try {
        const Form = new FormData()
        Form.append('_id', Data._id)
        Form.append('pose_no', Data.pose_no)
        Form.append('name', Data.name)
        Form.append('media_type', Data.media_type)
        Form.append('activity_time', Data.activity_time)
        Form.append('preview', Data.preview)
        Form.append('media_url', Data.media_url)
        backgroundid.map(async (val) => {
            Form.append('backgroundid', val._id)
            Form.append('audio', val.audio)
            Form.append('languageid', val.language_id)
            Form.append('updateimage', val.updateimage)
            Form.append('poseslistid', val.poses_list_id)
        })
        const Result = await axios.post('/poseslists/update', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const PlanIndex = async () => {
    try {
        const Result = await axios.post('/plan/index')
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const PlanAddd = async (Data, workout, selecttags) => {
    try {
        const Form = new FormData()
        Form.append('index', Data.index)
        Form.append('plan_name', Data.plan_name)
        Form.append('plan_active_users', Data.plan_active_users)
        Form.append('plan_total_completions', Data.plan_total_completions)
        Form.append('plan_description', Data.plan_description)
        Form.append('plan_level_id', Data.plan_level_id)
        Form.append('type', Data.type)
        Form.append('status', Data.status)
        Form.append('plan_preview_image', Data.plan_preview_image)
        Form.append('short_video_url', Data.short_video_url)
        Form.append('intro_video_url', Data.intro_video_url)
        Form.append('gif_url', Data.gif_url)

        if (selecttags && selecttags.length !== 0) {
            selecttags.map(async (val) => {
                Form.append('tag_id', val)
            })
        }

        if (workout && workout.length !== 0) {
            workout.map(async (val) => {
                Form.append('workout_name', val.workout_name)
                Form.append('duration', val.duration)
                Form.append('calories', val.calories)
                Form.append('is_free', val.is_free)
            })
        }

        const Result = await axios.post('/plan', Form)
        return Result

    } catch (error) {
        return CatchError(error)
    }
}

export const PlanAll = async () => {
    try {
        const Result = await axios.post('/plan/all')
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const PlanDelete = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/plan/delete', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const PlanChangeStatus = async (Status, id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        Form.append('status', Status)
        const Result = await axios.post('/plan/status/update', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const PlanChangeType = async (Type, id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        Form.append('type', Type)
        const Result = await axios.post('/plan/type/update', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const PlanSearch = async (planname, status, type) => {
    try {
        const Form = new FormData()
        Form.append('planname', planname)
        Form.append('status', status)
        Form.append('type', type)
        const Result = await axios.post('/plan/search', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const PlansView = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/plan/view', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const PlansEdit = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/plan/edit', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const PlanUpdate = async (Data, workout, selecttags) => {
    try {
        const Form = new FormData()
        Form.append('index', Data.index)
        Form.append('plan_name', Data.plan_name)
        Form.append('plan_active_users', Data.plan_active_users)
        Form.append('plan_total_completions', Data.plan_total_completions)
        Form.append('plan_description', Data.plan_description)
        Form.append('plan_level_id', Data.plan_level_id)
        Form.append('type', Data.type)
        Form.append('status', Data.status)
        Form.append('plan_preview_image', Data.plan_preview_image)
        Form.append('short_video_url', Data.short_video_url)
        Form.append('intro_video_url', Data.intro_video_url)
        Form.append('gif_url', Data.gif_url)
        Form.append('_id', Data._id)

        if (selecttags && selecttags.length !== 0) {
            selecttags.map(async (val) => {
                Form.append('tag_id', val)
            })
        }

        if (workout && workout.length !== 0) {
            workout.map(async (val) => {
                Form.append('workout_name', val.workout_name)
                Form.append('duration', val.duration)
                Form.append('calories', val.calories)
                Form.append('is_free', val.is_free)
                Form.append('workout_id', val._id)
            })
        }

        const Result = await axios.post('/plan/update', Form)
        return Result

    } catch (error) {
        return CatchError(error)
    }
}

export const PlanworkoutDelete = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/plan/workouts/delete', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const PlanDragAndDrop = async (Data) => {
    try {
        const Result = await axios.post('/plan/Updateindex', Data)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const PosesListsNumber = async () => {
    try {
        const Result = await axios.post('/poseslistsname/all')
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const PosesPlanWiseWorkOut = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/plan/findworkout', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const PosesIndex = async () => {
    try {
        const Result = await axios.post('/exercises/index')
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const ExerciseAdd = async (Data, Poses) => {
    try {
        const Form = new FormData()
        Form.append('series_id', Data.series_id)
        Form.append('workout_id', Data.workout_id)
        Form.append('status', Data.status)
        Poses.map((val, index) => {
            Form.append('Exercisesposesid', val)
        })
        const Result = await axios.post('/exercises', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const ExerciseAll = async () => {
    try {
        const Result = await axios.post('/exercises/all')
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const ExerciseDelete = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/exercises/delete', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const ExerciseStatusUpdate = async (Status, id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        Form.append('status', Status)
        const Result = await axios.post('/exercises/status/update', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const ExerciseSearch = async (planname, status) => {
    try {
        const Form = new FormData()
        Form.append('name', planname)
        Form.append('status', status)
        const Result = await axios.post('/exercises/search', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const ExerciseView = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/exercises/view', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const ExerciseEdit = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/exercises/edit', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const ExerciseUpdate = async (Data, Poses) => {
    try {
        const Form = new FormData()
        Form.append('_id', Data._id)
        Form.append('series_id', Data.series_id)
        Form.append('workout_id', Data.workout_id)
        Form.append('status', Data.status)
        Poses.map((val, index) => {
            Form.append('Exercisesposesid', val._id)
            Form.append('Exercisesposeslistid', val.poses_list_id)
            Form.append('Exercisesposesindex', val.index)
        })
        const Result = await axios.post('/exercises/update', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const PoseDelete = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/exercises/exercisesposes/delete', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const ExerciseDragAndDrop = async (Data) => {
    try {
        const Result = await axios.post('/exercises/Updateindex', Data)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}


export const ConfigurationAll = async () => {
    try {
        const Result = await axios.post('/configuration/all')
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const ChnageConfiguration = async (Data, name, value) => {
    try {

        const Form = new FormData()
        Form.append('status', (name === "status") ? value : Data.status)
        Form.append('subscription', (name === "subscription") ? value : Data.subscription)
        Form.append('subscription_required_ios', (name === "subscription_required_ios") ? value : Data.subscription_required_ios)
        Form.append('plans_local_free_ios', (name === "plans_local_free_ios") ? value : Data.plans_local_free_ios)
        Form.append('plans_local_free_android', (name === "plans_local_free_android") ? value : Data.plans_local_free_android)
        Form.append('plans_local_showfirst_ios', (name === "plans_local_showfirst_ios") ? value : Data.plans_local_showfirst_ios)
        Form.append("plans_local_showfirst_android", (name === "plans_local_showfirst_android") ? value : Data.plans_local_showfirst_android)

        const Result = await axios.post('/configuration/status/update', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const GuestToken = async () => {
    try {
        const Result = await axios.post('/guest_token/all')
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const UserAll = async () => {
    try {
        const Result = await axios.post('/userdata/all')
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const UserView = async (id) => {
    try {
        const Form = new FormData()
        Form.append('_id', id)
        const Result = await axios.post('/userdata/view', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const UserSearch = async (email, subscribe, deviceplatform, date) => {
    try {
        const Form = new FormData()
        Form.append("email", email)
        Form.append("device_platform", deviceplatform)
        Form.append("subscribe", subscribe)
        Form.append("date", date)
        const Result = await axios.post('/userdata/search', Form)
        return Result
    } catch (error) {
        return CatchError(error)
    }
}

export const UserPasswordChange = async (id, password) => {
    try {
        const Form = new FormData()
        Form.append('user_id', id)
        Form.append('password', password)
        const Result = await axios.post('/userdata/changepassword', Form)
        return Result

    } catch (error) {
        return CatchError(error)
    }
}
