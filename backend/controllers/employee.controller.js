import { generateTempPassword } from "../utils/password.js";
import bcrypt from 'bcrypt'
import { sendInviteEmail } from '../utils/sendInviteEmail.js'
import { Employee } from "../models/employee.model.js";
import { Attendance } from "../models/attendance.model.js";
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";

export const employeeRegister = async (req, res) => {
    try {
        const { name, email, phoneNumber, department, location } = req.body;
        const existing = await Employee.findOne({ email });
        if (existing) {
            return res.status(400).json({
                message: "Employee already exists",
                success: false
            });
        }
        const tempPass = generateTempPassword();
        const hashedPass = await bcrypt.hash(tempPass, 10);

        const employee = await Employee.create({
            name,
            email,
            phoneNumber,
            department,
            location,
            password: hashedPass,
            role: "Employee"// 👈 Hardcoded here
        });

        await sendInviteEmail(email, tempPass);

        return res.status(201).json({
            success: true,
            message: "Employee invited successfully",
            employee
        })

    } catch (error) {
        return res.status(500).json({ message: "Failed to create employee" });
    }
}

export const employeeLogin = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Something is missing"
            })
        }
        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            })
        }
        const isPassMatch = await bcrypt.compare(password, employee.password);
        if (!isPassMatch) {
            return res.status(400).json({
                success: true,
                message: "Password is incorrect"
            })
        }
        const tokenData = {
            employeeId: employee._id,
            role: "Employee"
        }
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' })
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            success: true,
            message: `Welcome ${employee.name}`
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to Login"
        })
    }
}

export const updatePassword = async (req, res) => {
    try {
        const { email, password, newPassword } = req.body;
        if (!email || !password || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Something is missing"
            })
        }
        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or Employee not found"
            })
        }
        const isPassMatch = await bcrypt.compare(password, employee.password);
        if (!isPassMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            })
        }
        const newHashPass = await bcrypt.hash(newPassword, 10);
        const updatedEmployee = await Employee.findOneAndUpdate({ email }, { $set: { password: newHashPass } }, { new: true });
        return res.status(200).json({
            success: true,
            employee: updatedEmployee,
            message: "Password updated Successfully"
        })
    } catch (error) {
        return res.status(500).json({ message: "Failed to update password", success: false })
    }
}


export const deleteEmployeeById = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const deletedEmployee = await Employee.findByIdAndDelete({ _id: employeeId });
        if (deletedEmployee) {
            return res.status(200).json({
                success: true,
                message: "Employee Deleted Successfully",
                deletedEmployee
            })
        }
    } catch (error) {
        return res.send(500).json({ message: "Failed to delete employee" })
    }
}

export const getAllEmployees = async (req, res) => {
    try {
        //return all employees by filter too
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { department: { $regex: keyword, $options: "i" } },
                { email: { $regex: keyword, $options: "i" } },
                { location: { $regex: keyword, $options: "i" } }
            ]
        }


        const allEmployees = await Employee.find(query);
        if (!allEmployees) {
            return res.status(404).json({
                message: "NO Employees",
                success: true
            })
        }
        return res.status(200).json({
            allEmployees,
            success: true
        })
    } catch (error) {
        return res.status(500).json({ message: "Failed to get All Employees", success: false })
    }
}

// export const getEmployeeById = async (req, res) => {
//     try {
//         const employeeId = req.params.id;
//         const employee = await Employee.findById(employeeId);
//         if (!employee) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Employee Not Found"
//             })
//         }
//         return res.status(200).json({
//             success: true,
//             employee,
//             message: "Employee found"
//         })
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({
//             message: "Failed to get Employee",
//             success: false
//         })
//     }
// }

export const employeeLogout = async (req , res)=>{
    try {
     return res.status(200).cookie("token" , "" , {maxAge : 0}).json({
        success : true,
        message : "Logged Out Successfully"
     })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Loggout Failed"
        })
    }
}


export const getEmployeeDetail = async (req, res) => {
    try {
      const id = req.params.id;
      if (!id || id === "undefined" || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid employee ID" });
      }
      // Get employee details
      const employee = await Employee.findById(id).select('-password');
      if (!employee) {
        return res.status(404).json({
          success: false,
          message: "Employee not found"
        });
      }
  
      // Get attendance logs for the current month
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      const attendanceLogs = await Attendance.find({
        employee: id,
        date: { $regex: `${currentYear}-${currentMonth}` }
      }).sort({ 'sessions.clockIn': -1 }).limit(7);
  
      // Calculate hours worked
      const todayHours = attendanceLogs.find(log => 
        new Date(log.date).toDateString() === new Date().toDateString()
      )?.totalHoursToday || 0;
  
      const weekHours = attendanceLogs.reduce((sum, log) => sum + log.totalHoursToday, 0);
      const attendanceDays = attendanceLogs.filter(log => log.isCompleteDay).length;
  
      // Format attendance logs
      const formattedLogs = attendanceLogs.map(log => ({
        date: log.date,
        status: log.isCompleteDay ? "Present" : "Absent",
        hours: log.totalHoursToday,
        checkIn: log.sessions[0]?.clockIn?.toLocaleTimeString('en-US', { hour12: true }) || "-",
        checkOut: log.sessions[0]?.clockOut?.toLocaleTimeString('en-US', { hour12: true }) || "-"
      }));
  
      // Create activity logs
      const activities = attendanceLogs.flatMap(log => {
        const activities = [];
        if (log.sessions[0]?.clockIn) {
          activities.push({
            time: `${log.date} – ${log.sessions[0].clockIn.toLocaleTimeString('en-US', { hour12: true })}`,
            activity: "Started work"
          });
        }
        if (log.sessions[0]?.clockOut) {
          activities.push({
            time: `${log.date} – ${log.sessions[0].clockOut.toLocaleTimeString('en-US', { hour12: true })}`,
            activity: "Ended work"
          });
        }
        return activities;
      });
  
      // Format response
      const employeeDetail = {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        department: employee.department,
        status: employee.status,
        phone: employee.phoneNumber,
        joinDate: employee.createdAt.toISOString().split('T')[0],
        lastLogin: "1 hour ago", // This should be calculated based on actual last login
        location: employee.location,
        todayHours,
        weekHours,
        attendanceDays,
        logs: formattedLogs,
        activities,
      };
  
      res.status(200).json({
        success: true,
        employeeDetail
      });
    } catch (error) {
        console.log(error)
      res.status(500).json({
        success: false,
        message: "Failed to fetch employee details",
        error: error.message
      });
    }
  };