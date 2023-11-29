import express, { Router } from "express";
import { TagsCreate, TagsView, TagsEdit, TagsDelete, TagsUpdate, TagsStatusUpdate, TagsSearch, CategoriesCreate, CategoriesView, CategoriesEdit, CategoriesDelete, CategoriesUpdate, CategoriesSearch, TagsAll, CategoriesAll, LanguagesCreate, LanguagesView, LanguagesEdit, LanguagesDelete, LanguagesUpdate, LanguagesAll, PlanlevelsCreate, PlanlevelsView, PlanlevelsEdit, PlanlevelsDelete, PlanlevelsUpdate, PlanlevelsAll, PlanCreate, PlanView, PlanEdit, PlanDelete, PlanAll, PlanUpdate, PlanSearch, PlanWorkoutDelete, PlanStatusUpdate, PlanTypeUpdate, PosesListsCreate, PosesListsView, PosesListsEdit, PosesListsDelete, PosesListsbackgroundaudioDelete, PosesListsAll, PosesListsUpdate, SoundsCreate, SoundsView, SoundsEdit, SoundsDelete, SoundsSearch, SoundsAll, SoundsUpdate, ExercisesCreate, PlanFindWorkout, ExercisesView, ExercisesEdit, ExercisesDelete, ExercisesSearch, ExercisesPosesDelete, ExercisesAll, ExercisesStatusUpdate, ExercisesUpdate, PosesListsNameAll, Register, RegisterUpdate, Login, Logout, Authenticat, ConfigurationStatusUpdate, ConfigurationAll, GuestTokenAll, DashboardCount, CategoriesIndex, SoundsIndex, SoundsName, PosesListsSearch, PlanIndex, TagsActiveStatusAll, ExercisesIndex, ConfigurationCreate, ConfigurationDelete, PlanUpdateIndex, CategoriesUpdateIndex, SoundUpdateIndex, ExercisesUpdateIndex, UserAll, UserView, UserSearch, UserChangePassword } from "../controller/web.js"
import { ConvertBackgroundAudio, ConvertCategories, ConvertExercises, ConvertExercisesPoses, ConvertGuestTokens, ConvertLanguages, ConvertPlan, ConvertPlanLevel, ConvertPlanTag, ConvertPosesLists, ConvertSounds, ConvertTag, ConvertUserFcmToken, ConvertUserRegister, ConvertUserWorkoutReview, ConvertUserWorkouts, ConvertWorkout, Convertfirstdayunlocks } from "../controller/convert.js";
const router = express.Router()

/* Tags Module */

router.post("/tags", Authenticat, TagsCreate)   
router.post("/tags/view", Authenticat, TagsView)
router.post("/tags/edit", Authenticat, TagsEdit)
router.post("/tags/delete", Authenticat, TagsDelete)
router.post("/tags/update", Authenticat, TagsUpdate)
router.post('/tags/all', Authenticat, TagsAll)
router.post('/tags/activestatus/all', Authenticat, TagsActiveStatusAll)
router.post("/tags/status", Authenticat, TagsStatusUpdate)
router.post("/tags/search", Authenticat, TagsSearch)

/* End Tags Module */

/* Categories Module */

router.post("/categories/index", Authenticat, CategoriesIndex)
router.post("/categories", Authenticat, CategoriesCreate)  
router.post("/categories/view", Authenticat, CategoriesView)
router.post("/categories/edit", Authenticat, CategoriesEdit)
router.post("/categories/delete", Authenticat, CategoriesDelete)
router.post("/categories/update", Authenticat, CategoriesUpdate)
router.post('/categories/all', Authenticat, CategoriesAll)
router.post("/categories/search", Authenticat, CategoriesSearch)
router.post('/categories/Updateindex', Authenticat, CategoriesUpdateIndex)


/* End Categories Module */

/* Languages Module */

router.post("/languages", Authenticat, LanguagesCreate) 
router.post("/languages/view", Authenticat, LanguagesView)
router.post("/languages/edit", Authenticat, LanguagesEdit)
router.post("/languages/delete", Authenticat, LanguagesDelete)
router.post("/languages/update", Authenticat, LanguagesUpdate)
router.post('/languages/all', Authenticat, LanguagesAll)

/* End Languages Module */

/* Plan Levels Module */

router.post("/planlevels", Authenticat, PlanlevelsCreate)
router.post("/planlevels/view", Authenticat, PlanlevelsView)
router.post("/planlevels/edit", Authenticat, PlanlevelsEdit)
router.post("/planlevels/delete", Authenticat, PlanlevelsDelete)
router.post("/planlevels/update", Authenticat, PlanlevelsUpdate)
router.post('/planlevels/all', Authenticat, PlanlevelsAll)

/* End Plan Levels Module */

/* Plan Module */

router.post("/plan/index", Authenticat, PlanIndex)
router.post('/plan', Authenticat, PlanCreate)  
router.post("/plan/view", Authenticat, PlanView)
router.post("/plan/edit", Authenticat, PlanEdit)
router.post("/plan/delete", Authenticat, PlanDelete)
router.post("/plan/workouts/delete", Authenticat, PlanWorkoutDelete)
router.post("/plan/update", Authenticat, PlanUpdate)
router.post("/plan/all", Authenticat, PlanAll)
router.post("/plan/search", Authenticat, PlanSearch)
router.post('/plan/status/update', Authenticat, PlanStatusUpdate)
router.post('/plan/type/update', Authenticat, PlanTypeUpdate)
router.post('/plan/findworkout', Authenticat, PlanFindWorkout)
router.post('/plan/Updateindex', Authenticat, PlanUpdateIndex)



/* End Plan Module */

/* Poses Lists Module */

router.post('/poseslists', Authenticat, PosesListsCreate)
router.post("/poseslists/view", Authenticat, PosesListsView)
router.post("/poseslists/edit", Authenticat, PosesListsEdit)
router.post("/poseslists/delete", Authenticat, PosesListsDelete)
router.post("/poseslists/backgroundaudio/delete", Authenticat, PosesListsbackgroundaudioDelete)
router.post("/poseslists/update", Authenticat, PosesListsUpdate)
router.post("/poseslists/all", Authenticat, PosesListsAll)
router.post('/poseslistsname/all', Authenticat, PosesListsNameAll)
router.post("/poseslists/search", Authenticat, PosesListsSearch)


/* End Poses Lists Module */

/* Sounds Module */

router.post("/sounds/index", Authenticat, SoundsIndex)
router.post('/sounds', Authenticat, SoundsCreate)
router.post('/sounds/view', Authenticat, SoundsView)
router.post('/sounds/edit', Authenticat, SoundsEdit)
router.post("/sounds/delete", Authenticat, SoundsDelete)
router.post("/sounds/update", Authenticat, SoundsUpdate)
router.post("/sounds/all", Authenticat, SoundsAll)
router.post("/sounds/name", Authenticat, SoundsName)
router.post("/sounds/search", Authenticat, SoundsSearch)
router.post('/sounds/Updateindex', Authenticat, SoundUpdateIndex)


/* End Sounds Module */

/* Exercises Module */

router.post("/exercises/index", Authenticat, ExercisesIndex)
router.post('/exercises', Authenticat, ExercisesCreate) 
router.post('/exercises/view', Authenticat, ExercisesView)
router.post('/exercises/edit', Authenticat, ExercisesEdit)
router.post('/exercises/delete', Authenticat, ExercisesDelete)
router.post('/exercises/exercisesposes/delete', Authenticat, ExercisesPosesDelete)
router.post('/exercises/update', Authenticat, ExercisesUpdate)
router.post('/exercises/status/update', Authenticat, ExercisesStatusUpdate)
router.post("/exercises/all", Authenticat, ExercisesAll)
router.post("/exercises/search", Authenticat, ExercisesSearch)
router.post('/exercises/Updateindex', Authenticat, ExercisesUpdateIndex)


/* End Exercises Module */

/* Configuration Module */

router.post('/configuration', Authenticat, ConfigurationCreate)
router.post('/configuration/status/update', Authenticat, ConfigurationStatusUpdate)
router.post('/configuration/delete', Authenticat, ConfigurationDelete)
router.post('/configuration/all', Authenticat, ConfigurationAll)
router.post('/guest_token/all', Authenticat, GuestTokenAll)


/* End Configuration Module */

/* Register Api */

router.post('/register', Register)
router.post('/register/update', RegisterUpdate)
router.post('/login', Login)
router.post('/logout', Authenticat, Logout)

/* End Register Api */

/* Dashboard Module */

router.post("/dashboardcount",Authenticat, DashboardCount)

/* End Dashboard Module */

/* User Data */

router.post('/userdata/all', Authenticat, UserAll)
router.post('/userdata/view', Authenticat, UserView)
router.post('/userdata/search', Authenticat, UserSearch)
router.post('/userdata/changepassword',UserChangePassword)

/* End User Data */


/* Convert Data Mongodb */

router.post("/convert/categories",ConvertCategories) 
router.post("/convert/tag",ConvertTag)   
router.post("/convert/planlevel",ConvertPlanLevel)  
router.post("/convert/languages",ConvertLanguages)  
router.post("/convert/firstdayunlocks",Convertfirstdayunlocks)  
router.post("/convert/sounds",ConvertSounds)  
router.post("/convert/poseslists",ConvertPosesLists) 
router.post("/convert/backgroundaudio",ConvertBackgroundAudio) 
router.post("/convert/plan",ConvertPlan)  
router.post("/convert/plantag",ConvertPlanTag) 
router.post("/convert/workout",ConvertWorkout) 
router.post("/convert/Exercises",ConvertExercises) 
router.post("/convert/Exercisesposes",ConvertExercisesPoses) 
router.post("/convert/userregister",ConvertUserRegister) 
router.post("/convert/userfcmtoken",ConvertUserFcmToken) 
router.post("/convert/userworkoutreview",ConvertUserWorkoutReview) 
router.post("/convert/userworkouts",ConvertUserWorkouts) 
router.post("/convert/guesttokens",ConvertGuestTokens) 

/* End Convert Data Mongodb */

export default router