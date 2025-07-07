import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white shadow-sm py-4">
      <div className="px-6 flex items-center justify-between max-w-screen-xl mx-auto">
        <div className="text-2xl font-semibold">👨‍⚕️ Code 1st Health</div>

        <div className="flex items-center space-x-6">
          <a href="/admin/dashboard" className="hover:text-blue-600">Dashboard</a>
          <a href="/admin/dashboard/employees" className="hover:text-blue-600">Employees</a>
          <a href="/admin/dashboard/attendanceSummary" className="hover:text-blue-600">Attendance</a>
          <a href="/admin/dashboard/employeeLeaves" className="hover:text-blue-600">Leaves</a>
          <Button variant="destructive" onClick={() => navigate("/")}>Logout</Button>
        </div>
      </div>
    </div>
  );
}
