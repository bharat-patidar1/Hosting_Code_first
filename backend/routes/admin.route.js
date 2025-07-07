import express from 'express'
import { adminLogin, adminLogout, adminRegister, getAttendanceSummary, getWorkHours, updatePassword } from '../controllers/admin.controller.js';
import { isAuthenticatedAdmin } from '../middleware/isAuthenticated.js';

const router = express.Router();

router.route('/register').post(adminRegister);
router.route('/login').post(adminLogin);
router.route('/logout').get( isAuthenticatedAdmin , adminLogout);
router.route('/updatePassword').put(isAuthenticatedAdmin , updatePassword);
router.route('/getWorkHour').get( isAuthenticatedAdmin ,  getWorkHours);
router.route('/getAttendanceSummary').get(isAuthenticatedAdmin , getAttendanceSummary);


export default router;