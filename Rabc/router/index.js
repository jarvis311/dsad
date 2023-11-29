import express from 'express';
import UserRoutes from './users/user.routes.js'
import AuthenticateRoutes from './users/authenticate.routes.js'
import PemissionRoutes from './users/permission.routes.js'
const router = express.Router()

router.use('/user', UserRoutes)
router.use('/auth', AuthenticateRoutes)
router.use('/permission', PemissionRoutes)


export default router;