import express from 'express'
import { employeeClockIn } from '../controllers/attendance.controller.js';
import { isAuthenticatedEmployee } from '../middleware/isAuthenticated.js'

const router = express.Router();

router.route('/clockIn').post(isAuthenticatedEmployee , employeeClockIn)

export default router;