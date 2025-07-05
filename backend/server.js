import express from 'express'
import dbConnect from './utils/dbConnect.js';
import dotenv from 'dotenv'
import adminRoute from './routes/admin.route.js';
import cors from 'cors'
import employeeRoute from './routes/employee.route.js';
import attendanceRoute from './routes/attendance.route.js'
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
    origin: "http://localhost:5173", // your frontend URL
    credentials: true               // ✅ allow sending cookies
}));

//api's
app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/employee', employeeRoute);
app.use('/api/v1/attendance', attendanceRoute)

// http://localhost:8000/api/v1/admin/register
// http://localhost:8000/api/v1/employee/register
// http://localhost:8000/api/v1/attendance/clockIn


app.listen(PORT, () => {
    console.log("Server is running at PORT : ", PORT)
})