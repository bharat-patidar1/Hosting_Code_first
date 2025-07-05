// src/pages/EmployeeDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Attendance_API_END_POINT, Employee_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function EmployeeDashboard() {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [totalHours, setTotalHours] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Fetch today's attendance on mount
  const fetchTodayStatus = async () => {
    try {
      const res = await axios.get("/api/v1/attendance/today",{
        withCredentials : true
      });
      if (res.data.success) {
        const today = res.data.attendance;
        const lastSession = today?.sessions?.at(-1);
        setIsClockedIn(lastSession && !lastSession.clockOut);
        setTotalHours(today.totalHoursToday || 0);
      }
    } catch (err) {
      console.error("Failed to fetch today's attendance", err);
    }
  };

  useEffect(() => {
    fetchTodayStatus();
  }, []);

  // Clock In Handler
  const handleClockIn = async () => {
    setLoading(true);
    try {
      await axios.post(`http://localhost:8000/api/v1/attendance/clockIn`,{
        withCredentials: true, // ✅ this is crucial to send the token cookie
      });
      if (res.data.success) {
        toast.success("Clocked in successfully!");
        setIsClockedIn(true);
      }
    } catch (err) {
      console.log(err)
      toast.error("Clock In failed");
    } finally {
      setLoading(false);
    }
  };

  // Clock Out Handler
  const handleClockOut = async () => {
    setLoading(true);
    try {
      console.log("Success")
      //   const res = await axios.post("/api/v1/attendance/clock-out");
      //   if (res.data.success) {
      //     toast.success("Clocked out successfully!");
      //     setIsClockedIn(false);
      //     setTotalHours(prev => prev + res.data.sessionDuration); // optional
      //   }
    } catch (err) {
      toast.error("Clock Out failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${Employee_API_END_POINT}/logout`)
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
          <Button variant="outline">Today's Hours: {totalHours.toFixed(2)} hrs</Button>
          <Button variant="outline">Attendance History</Button>
          <Button onClick={() => { handleLogout() }} variant="destructive">Logout</Button>
        </div>
      </header>

      {/* Clock In / Out Section */}
      <main className="flex justify-center mt-12">
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center space-y-4">
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
      </main>
    </div>
  );
}
