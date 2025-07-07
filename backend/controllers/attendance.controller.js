import { Attendance } from "../models/attendance.model.js";


export const employeeClockIn = async (req, res) => {
    try {
        const employeeId = req.employeeId;
        const todayDate = new Date().toISOString().split("T")[0]
        // Check if attendance for today already exists
        let attendance = await Attendance.findOne({
            employee: employeeId,
            date: todayDate
        })
        // 2. If not exists, create it
        if (!attendance) {
            attendance = await Attendance.create({
                employee: employeeId,
                date: todayDate,
                sessions: [
                    {
                        clockIn: new Date(), // 👈 Directly add clockIn on create
                        clockOut: null,
                        duration: 0
                    }
                ],
                totalHoursToday: 0,
                isCompleteDay: false
            });
            return res.status(200).json({
                success: true,
                message: "Clocked in successfully (new attendance created)",
                attendance
            });
        }
        //3. Check if already clocked in without last session clockout
        const lastSession = attendance.sessions.at(-1);
        if (lastSession && !lastSession.clockOut) {
            return res.status(400).json({
                success: false,
                message: "Already clocked in. Please clock out first."

            })
        }
        // 4. Add new clockIn session to existing attendance
        attendance.sessions.push({
            clockIn: new Date(),
            clockOut: null,
            duration: 0
        })
        await attendance.save();

        return res.status(200).json({
            success: true,
            message: "Clocked in successfully",
            attendance
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Clock In failed"
        })
    }
}

export const employeeClockOut = async (req, res) => {
    try {
        const employeeId = req.employeeId
        const todayDate = new Date().toISOString().split("T")[0];

        const attendance = await Attendance.findOne({
            employee: employeeId,
            date: todayDate
        })
        if (!attendance) {
            return res.status(400).json({
                success: false,
                message: "You have not clocked in today"
            })
        }

        //get last session
        const lastSession = attendance.sessions.at(-1);
        if (!lastSession || !lastSession.clockIn || lastSession.clockOut) {
            return res.status(400).json({
                success: false,
                message: "You must clock in before clocking out.",
            });
        }
        //set clockout time
        const now = new Date();
        lastSession.clockOut = now;
        //now calculate and asign duration
        const durationInMinutes = Math.floor((now - new Date(lastSession.clockIn)) / (1000 * 60));
        lastSession.duration = durationInMinutes;

        //update total hours
        attendance.totalHoursToday = attendance.sessions.reduce((total, session) => {
            return total + (session.duration || 0);
        }, 0); // Total in minutes

        // Optionally convert to hours:
        const totalInHours = attendance.totalHoursToday / 60;
        attendance.totalHoursToday = parseFloat(totalInHours.toFixed(2));
        attendance.isCompleteDay = totalInHours >= 8;
        await attendance.save();

        return res.status(200).json({
            success: true,
            attendance,
            message: "Clocked Out Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to Clock Out"
        })
    }
}

export const AttendanceHistoryById = async (req, res) => {
    try {
        const employeeId = req.employeeId;

        const history = await Attendance.find({
            employee: employeeId
        }).sort({ date: -1 });
        return res.status(200).json({
            success: true,
            history
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Failed to fetch attendance history"
        })
    }
}

