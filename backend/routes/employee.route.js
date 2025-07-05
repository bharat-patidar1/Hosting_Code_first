import express from 'express'
import { deleteEmployeeById, employeeLogin, employeeLogout, employeeRegister, getAllEmployees, getEmployeeById, updatePassword } from '../controllers/employee.controller.js';

const router = express.Router();

router.route('/register').post(employeeRegister);
router.route('/login').post(employeeLogin);
router.route('/logout').get(employeeLogout);
router.route('/updatePassword').put(updatePassword);
router.route('/delete/:id').delete(deleteEmployeeById);
router.route('/get').get(getAllEmployees);
router.route('/get/:id').get(getEmployeeById);


export default router;