import express from 'express';
import { assingPermissionToRole, createRole, createUser, fetchUsers, testingRoutes } from '../../controller/UserAuthentication/UserController.js';
import { verifyToken } from '../../middleware/auth.middleware.js';
const router = express.Router()

router.post('/fetch-user', fetchUsers)
router.post('/create-user', createUser)
router.post('/create-role', createRole)
router.post('/assing-permission', assingPermissionToRole)
router.post('/testing', verifyToken, testingRoutes)


export default router;