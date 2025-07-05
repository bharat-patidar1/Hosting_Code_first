import express from 'express'
import { adminLogin, adminLogout, adminRegister } from '../controllers/admin.controller.js';

const router = express.Router();

router.route('/register').post(adminRegister);
router.route('/login').post(adminLogin);
router.route('/logout').get(adminLogout);


export default router;