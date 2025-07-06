import { generateTempPassword } from "../utils/password.js";
import bcrypt from 'bcrypt'
import { sendInviteEmail } from '../utils/sendInviteEmail.js'
import { Employee } from "../models/employee.model.js";
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

export const getEmployeeById = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(400).json({
                success: false,
                message: "Employee Not Found"
            })
        }
        return res.status(200).json({
            success: true,
            employee,
            message: "Employee found"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Failed to get Employee",
            success: false
        })
    }
}

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