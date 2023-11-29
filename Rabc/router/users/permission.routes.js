import express from 'express';
import { createPermission } from '../../controller/UserAuthentication/PemissionController.js';

const router = express.Router()

router.post('/create', createPermission)


export default router;