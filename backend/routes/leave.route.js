import express from 'express'
import { isAuthenticatedAdmin, isAuthenticatedEmployee } from '../middleware/isAuthenticated.js';
import { applyLeave, deleteLeave, getAllLeaves, getEmployeeLeaves, updateLeaveStatus } from '../controllers/leave.controller.js';
const router = express.Router();

router.post("/apply", isAuthenticatedEmployee, applyLeave);
router.get("/myleaves", isAuthenticatedEmployee, getEmployeeLeaves);

router.get("/all", isAuthenticatedAdmin, getAllLeaves);
router.put("/:id/status", isAuthenticatedAdmin, updateLeaveStatus); //id is leave id
router.delete("/:id/delete", isAuthenticatedEmployee, deleteLeave); //id is leave id

export default router;