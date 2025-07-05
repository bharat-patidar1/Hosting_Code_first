// Redesigned Employee Detail Component (Professional UI like 2nd Screenshot)

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table";
import { Button } from "../ui/button";
import { Separator } from "@radix-ui/react-select";
import Navbar from "../shared/Navbar";

export default function EmployeeDetail() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    setEmployee({
      id,
      name: "Ayesha Sharma",
      email: "ayesha@email.com",
      department: "Tech",
      status: "active",
      phone: "+91 9876543210",
      joinDate: "2025-01-10",
      lastLogin: "1 hour ago",
      location: "Remote",
      todayHours: 3.5,
      weekHours: 18,
      attendanceDays: 4,
      logs: [
        { date: "Jul 1, 2025", status: "Present", hours: 4.5, checkIn: "10:01 AM", checkOut: "2:33 PM" },
        { date: "Jul 2, 2025", status: "Present", hours: 3, checkIn: "10:15 AM", checkOut: "1:20 PM" },
        { date: "Jul 3, 2025", status: "Absent", hours: 0, checkIn: "-", checkOut: "-" },
      ],
      activities: [
        { time: "Jul 2 – 10:15 AM", activity: "Started work" },
        { time: "Jul 2 – 12:00 PM", activity: "Screenshot taken" },
        { time: "Jul 2 – 1:20 PM", activity: "Ended work" },
        { time: "Jul 2 – 5:00 PM", activity: "Marked as idle" },
      ],
    });
  }, [id]);

  if (!employee) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-7xl">
        <div className="max-w-7xl mx-6 ">
    <Navbar/>
        </div>
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
      {/* Left Column: Profile Overview */}
      <div className="lg:col-span-1 space-y-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Avatar className="h-20 w-20 mx-auto">
              <AvatarImage src={`https://ui-avatars.com/api/?name=${employee.name}`} />
              <AvatarFallback>{employee.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <h2 className="text-lg font-semibold mt-4">{employee.name}</h2>
            <p className="text-muted-foreground text-sm">{employee.email}</p>
            <div className="flex justify-center gap-2 mt-2 text-sm text-muted-foreground">
              <span>📞 {employee.phone}</span>
            </div>
            <Separator className="my-4" />
            <div className="text-left text-sm space-y-1">
              <p><strong>Department:</strong> {employee.department}</p>
              <p><strong>Location:</strong> {employee.location}</p>
              <p><strong>Join Date:</strong> {employee.joinDate}</p>
              <p><strong>Status:</strong> <Badge>{employee.status}</Badge></p>
            </div>
            <Button variant="outline" className="w-full mt-4">Edit Details</Button>
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Details */}
      <div className="lg:col-span-3 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card><CardHeader><CardTitle>Today Hours</CardTitle></CardHeader><CardContent>{employee.todayHours} hrs</CardContent></Card>
          <Card><CardHeader><CardTitle>Week Hours</CardTitle></CardHeader><CardContent>{employee.weekHours} hrs</CardContent></Card>
          <Card><CardHeader><CardTitle>Attendance Days</CardTitle></CardHeader><CardContent>{employee.attendanceDays} / 5</CardContent></Card>
          <Card><CardHeader><CardTitle>Status</CardTitle></CardHeader><CardContent><Badge variant="secondary">{employee.status}</Badge></CardContent></Card>
        </div>

        {/* Attendance Table */}
        <Card className="text-center">
          <CardHeader><CardTitle>Daily Attendance</CardTitle></CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Date</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Hours Worked</TableHead>
                  <TableHead className="text-center">Check-in</TableHead>
                  <TableHead className="text-center">Check-out</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employee.logs.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell>{log.date}</TableCell>
                    <TableCell>{log.status}</TableCell>
                    <TableCell>{log.hours}</TableCell>
                    <TableCell>{log.checkIn}</TableCell>
                    <TableCell>{log.checkOut}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Activity Logs */}
        <Card>
          <CardHeader><CardTitle>Activity Logs</CardTitle></CardHeader>
          <CardContent>
            <ScrollArea className="h-48 pr-4">
              <div className="space-y-3">
                {employee.activities.map((act, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-blue-600 font-medium">{act.time}</span>
                    <span className="text-muted-foreground">{act.activity}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="default">Send Message</Button>
          <Button variant="secondary">Reset Password</Button>
          <Button variant="destructive">Deactivate</Button>
          <Button variant="outline">Export Report</Button>
        </div>
      </div>
    </div>
    </div>
  );
}