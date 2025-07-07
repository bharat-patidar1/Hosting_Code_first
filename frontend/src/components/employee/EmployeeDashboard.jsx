import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Attendance_API_END_POINT, Employee_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsClockedin } from "@/redux/attendanceSlice";
import { setTotalHours } from "@/redux/employeeSlice";
import { CalendarIcon, ClockIcon, BellIcon, UserIcon, ArchiveIcon } from "lucide-react";
import EmployeeNavbar from "./EmployeeNavbar";

axios.defaults.withCredentials = true;

export default function EmployeeDashboard() {
  const { totalHours } = useSelector((store) => store.employee);
  const [loading, setLoading] = useState(false);
  const { isClockedIn } = useSelector((store) => store.attendance);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClockIn = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${Attendance_API_END_POINT}/clockIn`);
      if (response.data.success) {
        dispatch(setIsClockedin(true));
        toast.success("Successfully clocked in!");
      }
    } catch (error) {
      toast.error("Failed to clock in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClockOut = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${Attendance_API_END_POINT}/clockOut`);
      if (response.data.success) {
        dispatch(setIsClockedin(false));
       dispatch(setTotalHours(response.data.totalHours));
        toast.success("Successfully clocked out!");
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to clock out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${Employee_API_END_POINT}/logout`);
      if (response.data.success) {
        toast.success("Successfully logged out!");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <EmployeeNavbar className="mx-auto"/>
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Header with Hours and Actions */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Badge variant="outline">Today's Hours: {totalHours} hrs</Badge>
              <Button onClick={() => navigate('/employee/dashboard/history')} variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Attendance History
              </Button>
            </div>
            <Button onClick={handleLogout} variant="destructive">
              <UserIcon className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <Button
                    onClick={() => navigate('/employee/dashboard/applyLeave')}
                    variant="outline"
                    className="w-full"
                  >
                    <ClockIcon className="mr-2 h-4 w-4" />
                    Apply Leave
                  </Button>
                  <Button
                    onClick={() => navigate('/employee/dashboard/profile')}
                    variant="outline"
                    className="w-full"
                  >
                    <UserIcon className="mr-2 h-4 w-4" />
                    Update Profile
                  </Button>
                  <Button
                    onClick={() => navigate('/employee/dashboard/payroll')}
                    variant="outline"
                    className="w-full"
                  >
                    <ArchiveIcon className="mr-2 h-4 w-4" />
                    View Payroll
                  </Button>
                  <Button
                    onClick={() => navigate('/employee/dashboard/notifications')}
                    variant="outline"
                    className="w-full"
                  >
                    <BellIcon className="mr-2 h-4 w-4" />
                    Notifications
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Clock In/Out Card */}
            <Card>
              <CardHeader>
                <CardTitle>Attendance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-4">
                  {isClockedIn ? "🟢 Clocked In" : "🔴 Clocked Out"}
                </div>
                <Button
                  className={`w-full ${
                    isClockedIn ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                  }`}
                  onClick={isClockedIn ? handleClockOut : handleClockIn}
                >
                  {isClockedIn ? "Clock Out" : "Clock In"}
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Shifts Card */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Shifts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span>Monday</span>
                    <span>9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span>Tuesday</span>
                    <span>9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span>Wednesday</span>
                    <span>9:00 AM - 5:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
