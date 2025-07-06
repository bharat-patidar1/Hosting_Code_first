import React from "react";
// import {Button} from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";


export default function AdminDashboard() {

  const navigate = useNavigate();

  return (
    <>
      <AdminNavbar />
      <div className="p-6 space-y-3">

        <h3 className="text-black"></h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[5%]">
          <Card onClick={() => { navigate('/admin/dashboard/overview') }} className="cursor-pointer border-[4px] border-transparent hover:border-[4px] hover:border-[rgba(135,134,234,0.61)]">
            <CardHeader>
              <CardTitle>Employee Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p>View all employees, active/inactive status, and more.</p>
            </CardContent>
          </Card>

          <Card onClick={()=>navigate('/admin/dashboard/attendanceSummary')} className="cursor-pointer border-[4px] border-transparent hover:border-[4px] hover:border-[rgba(135,134,234,0.61)]">
            <CardHeader>
              <CardTitle>Attendance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Track daily and weekly attendance trends.</p>
            </CardContent>
          </Card>

          <Card onClick={()=>navigate('/admin/dashboard/employeeLeaves')} className="cursor-pointer border-[4px] border-transparent hover:border-[4px] hover:border-[rgba(135,134,234,0.61)]">
            <CardHeader>
              <CardTitle>Leave Management Panel</CardTitle>
            </CardHeader>
            <CardContent>
              <p>View and Manage All Leave Requests Submitted by Employees</p>
            </CardContent>
          </Card>

          <Card onClick={()=>navigate('/admin/dashboard/workhour')} className="cursor-pointer border-[4px] border-transparent hover:border-[4px] hover:border-[rgba(135,134,234,0.61)]">
            <CardHeader>
              <CardTitle>Work Hour Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Monitor daily/weekly work hours and highlight low performers.</p>
            </CardContent>
          </Card>

          <Card onClick={()=>navigate('/admin/dashboard/employees')} className="cursor-pointer border-[4px] border-transparent hover:border-[4px] hover:border-[rgba(135,134,234,0.61)]">
            <CardHeader>
              <CardTitle>Manage Employees</CardTitle>
            </CardHeader>
            <CardContent>
              <p>View, invite or remove employees</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
