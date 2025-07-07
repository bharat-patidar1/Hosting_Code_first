// src/components/admin/AdminAttendanceSummary.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ADMIN_API_END_POINT } from "@/utils/constant";
import moment from "moment";
import AdminNavbar from "./AdminNavbar";

const AdminAttendanceSummary = () => {
  const [view, setView] = useState("daily");
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const date = moment().format("YYYY-MM-DD");
      const res = await axios.get(
        `${ADMIN_API_END_POINT}/getAttendanceSummary?view=${view}&date=${date}`,
        { withCredentials: true }
      );
      setSummary(res.data);
    } catch (err) {
      console.error("Failed to fetch attendance summary", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [view]);

  const percentage = (present, total) => {
    if (!total) return 0;
    return ((present / total) * 100).toFixed(1);
  };

  const renderEmployeeTable = (title, employees, status) => (
    <div className="mb-6">
      <h4 className="text-md font-semibold mb-2">{title}</h4>
      <table className="w-full text-left border border-gray-300 text-sm bg-white rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">S.No.</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={emp._id} className="border-t hover:bg-gray-50">
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{emp.name}</td>
              <td className="p-2 border">
                <span
                  className={`px-2 py-1 rounded text-white text-xs ${
                    status === "present" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderWeeklyCards = () =>
    [...(summary.data || [])]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map((day) => (
        <Card key={day.date} className="mb-6 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">
              {moment(day.date).format("dddd, MMM D")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderEmployeeTable("Present Employees", day.presentEmployees || [], "present")}
            {renderEmployeeTable("Absent Employees", day.absentEmployees || [], "absent")}
          </CardContent>
        </Card>
      ));

  return (
    <div>
      <AdminNavbar/>
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-2xl font-semibold">
            Attendance Summary – {view === "daily" ? "Today" : "Weekly"}
          </CardTitle>
          <Button
            variant="outline"
            onClick={() => setView((v) => (v === "daily" ? "weekly" : "daily"))}
          >
            Switch to {view === "daily" ? "Weekly" : "Daily"}
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 bg-green-100">
                <h4 className="text-sm text-gray-600">Total Employees</h4>
                <p className="text-2xl font-semibold">{summary.totalEmployees}</p>
              </Card>
              <Card className="p-4 bg-blue-100">
                <h4 className="text-sm text-gray-600">Present</h4>
                <p className="text-2xl font-semibold">{summary.present}</p>
              </Card>
              <Card className="p-4 bg-red-100">
                <h4 className="text-sm text-gray-600">Absent</h4>
                <p className="text-2xl font-semibold">{summary.absent}</p>
              </Card>
              <Card className="p-4 bg-purple-100">
                <h4 className="text-sm text-gray-600">Attendance %</h4>
                <p className="text-2xl font-semibold">
                  {percentage(summary.present, summary.totalEmployees)}%
                </p>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {!loading && view === "daily" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Today's Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            {renderEmployeeTable("Present Employees", summary.presentEmployees || [], "present")}
            {renderEmployeeTable("Absent Employees", summary.absentEmployees || [], "absent")}
          </CardContent>
        </Card>
      )}

      {!loading && view === "weekly" && renderWeeklyCards()}
    </div>
    </div>
  );
};

export default AdminAttendanceSummary;
