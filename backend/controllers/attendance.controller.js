import { Attendance } from "../models/attendance.model.js";


export const employeeClockIn = async (req, res) => {
    try {
        const employeeId = req.employeeId;
        const todayDate = new Date().toDateString();
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