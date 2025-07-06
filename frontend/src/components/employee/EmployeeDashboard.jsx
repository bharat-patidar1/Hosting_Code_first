// src/pages/EmployeeDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Attendance_API_END_POINT, Employee_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsClockedin } from "@/redux/attendanceSlice";
import { setTotalHours } from "@/redux/employeeSlice";
axios.defaults.withCredentials = true; //this line is important 

export default function EmployeeDashboard() {
  const {totalHours} = useSelector(store=>store.employee)
  const [loading, setLoading] = useState(false);
  const {isClockedIn} = useSelector(store=>store.attendance)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleClockIn = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${Attendance_API_END_POINT}/clockIn`,{
        withCredentials: true, // ✅ this is crucial to send the token cookie
      });
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setIsClockedin(true))
      }
    } catch (err) {
      console.log(err)
      toast.error("Clock In failed");
      dispatch(setIsClockedin(false));
    } finally {
      setLoading(false);
    }
  };

  // Clock Out Handler
  const handleClockOut = async () => {
    setLoading(true);
    try {
        const res = await axios.post(`${Attendance_API_END_POINT}/clockOut` , {withCredentials : true});
        if (res.data.success) {
          toast.success(res.data.message);
          dispatch(setIsClockedin(false))
          dispatch(setTotalHours(res.data.attendance.totalHoursToday))
        }
    } catch (err) {
      toast.error("Clock Out failed");
      dispatch(setIsClockedin(true))
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${Employee_API_END_POINT}/logout`,{withCredentials : true})
      if (res.data.success) {
        navigate('/login')
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">👨‍⚕️ Code 1st Employee Dashboard</h1>
        <div className="space-x-4">
          <Button variant="outline">Today's Hours: {totalHours} hrs</Button>
          <Button onClick={()=>navigate('/employee/dashboard/history')} variant="outline">Attendance History</Button>
          <Button onClick={() => { handleLogout() }} variant="destructive">Logout</Button>
        </div>
      </header>

      {/* Clock In / Out Section */}
      <main className="flex justify-center mt-12">
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center space-y-4 mx-3">
          <h2 className="text-2xl font-semibold">Today's Attendance</h2>
          <p className="text-gray-600 text-sm">
            {isClockedIn
              ? "You are currently clocked in."
              : "You haven’t clocked in yet today."}
          </p>
          <Button
            className={isClockedIn ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
            disabled={loading}
            onClick={isClockedIn ? handleClockOut : handleClockIn}
          >
            {loading
              ? "Processing..."
              : isClockedIn
                ? "🔴 Clock Out"
                : "🟢 Clock In"}
          </Button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center space-y-4 mx-3">
          <h2 className="text-2xl font-semibold">Apply Leave</h2>
          <p className="text-gray-600 text-sm">
            Apply krde aur bhag ja
          </p>
          <Button onClick={()=>navigate('/employee/dashboard/applyLeave')}> 🟢 Apply</Button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center space-y-4 gap-3 mx-3">
          <h2 className="text-2xl font-semibold">Applied Leaves</h2>
          <p className="text-gray-600 text-sm">
           Past applied jobs and status
          </p>
          <Button onClick={()=>navigate('/employee/dashboard/leaves')}> 🟢 View</Button>
        </div>
      </main>
    </div>
  );
}
