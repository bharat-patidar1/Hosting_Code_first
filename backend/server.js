import express from 'express'
import dbConnect from './utils/dbConnect.js';
import dotenv from 'dotenv'
import adminRoute from './routes/admin.route.js';
import cors from 'cors'
import employeeRoute from './routes/employee.route.js';
import attendanceRoute from './routes/attendance.route.js'
import leaveRoute from './routes/leave.route.js'
import cookieParser from "cookie-parser";


dotenv.config({});
dbConnect();
const app = express();
const PORT = process.env.PORT || 8080;


//middleware
app.use(express.json()); // to access json data
app.use(express.urlencoded({ extended: true })); //to access form data
app.use(cookieParser()); // 👈 This line is REQUIRED to access req.cookies
app.use(cors({
    origin: "https://code-1st-healthcare-frontend.onrender.com", // your frontend URL
    credentials: true               // ✅ allow sending cookies
}));

//api's
app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/employee', employeeRoute);
app.use('/api/v1/attendance', attendanceRoute)
app.use('/api/v1/leave', leaveRoute)

// http://localhost:8000/api/v1/admin/register
// http://localhost:8000/api/v1/employee/register
// http://localhost:8000/api/v1/attendance/clockIn
// http://localhost:8000/api/v1/leave/apply


// Handle API routes first
app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/employee', employeeRoute);
app.use('/api/v1/attendance', attendanceRoute);
app.use('/api/v1/leave', leaveRoute);



app.listen(PORT, () => {
    console.log("Server is running at PORT : ", PORT)
})
