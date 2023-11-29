import express from 'express';
import { userSignIn } from '../../controller/UserAuthentication/UserAuthanticateCotroller.js';
const router = express.Router()

router.post('/signin', userSignIn)


export default router;