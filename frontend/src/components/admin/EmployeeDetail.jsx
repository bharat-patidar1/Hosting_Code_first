// Redesigned Employee Detail Component (Professional UI like 2nd Screenshot)

import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
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
import { Separator } from "@radix-ui/react-separator";
import  AdminNavbar from "./AdminNavbar";
import {useGetEmployee} from "../hooks/useGetEmployee";

export default function EmployeeDetail() {
  const { _id : id  } = useParams();
  const { employee } = useSelector(state => state.employee);
  // Use custom hook to fetch employee data
  useGetEmployee(id);

  // // Handler functions
  // const handleEdit = (employeeId) => {
  //   // TODO: Implement edit functionality
  //   console.log('Edit clicked for employee:', employeeId);
  // };

  // const handleSendMessage = (employeeId) => {
  //   // TODO: Implement send message functionality
  //   console.log('Send message to employee:', employeeId);
  // };

  // const handleResetPassword = (employeeId) => {
  //   // TODO: Implement reset password functionality
  //   console.log('Reset password for employee:', employeeId);
  // };

  // const handleDeactivate = (employeeId) => {
  //   // TODO: Implement deactivate functionality
  //   console.log('Deactivate employee:', employeeId);
  // };

  // const handleExportReport = (employeeId) => {
  //   // TODO: Implement export report functionality
  //   console.log('Export report for employee:', employeeId);
  // };
 

  if (!employee) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-7xl mx-6">
      <AdminNavbar/>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
        {/* Left Column: Profile Overview */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              {employee && (
                <>
                  <Avatar className="h-20 w-20 mx-auto">
                    <AvatarImage src={`https://ui-avatars.com/api/?name=${employee.name}`} />
                    <AvatarFallback>{employee.name?.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-lg font-semibold mt-4">{employee.name}</h2>
                  <p className="text-muted-foreground text-sm">{employee.email}</p>
                  <div className="flex justify-center gap-2 mt-2 text-sm text-muted-foreground">
                    <span>📞 {employee.phoneNumber}</span>
                  </div>
                  <Separator className="my-4" />
                </>
              )}
              <div className="text-left text-sm space-y-1">
                <p><strong>Department:</strong> {employee.department}</p>
                <p><strong>Location:</strong> {employee.location}</p>
                <p><strong>Join Date:</strong> {employee.joinDate}</p>
                <p><strong>Status:</strong> <Badge>{employee.status}</Badge></p>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => handleEdit(employee.id)}
              >
                Edit Details
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-3 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Today Hours</CardTitle>
              </CardHeader>
              <CardContent>{employee.todayHours} hrs</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Week Hours</CardTitle>
              </CardHeader>
              <CardContent>{employee.weekHours} hrs</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Attendance Days</CardTitle>
              </CardHeader>
              <CardContent>{employee.attendanceDays} / 5</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">{employee.status}</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Attendance Table */}
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Daily Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-48 pr-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center">Date</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Hours</TableHead>
                      <TableHead className="text-center">Check-In</TableHead>
                      <TableHead className="text-center">Check-Out</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* {employee?.logs?.map((log, index) => ( */}
                      <TableRow >
                        <TableCell>08-07-2025</TableCell>
                        <TableCell>
                          <Badge>active</Badge>
                        </TableCell>
                        <TableCell>4</TableCell>
                        <TableCell>11:05 am</TableCell>
                        <TableCell>12:30 pm</TableCell>
                      </TableRow>
                    {/* ))} */}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Activity Logs */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-48 pr-4">
                <div className="space-y-3">
                  {employee?.activities?.map((act, index) => (
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
            <Button 
              variant="default"
              onClick={() => handleSendMessage(employee.id)}
            >
              Send Message
            </Button>
            <Button 
              variant="secondary"
              onClick={() => handleResetPassword(employee.id)}
            >
              Reset Password
            </Button>
            <Button 
              variant="destructive"
              onClick={() => handleDeactivate(employee.id)}
            >
              Deactivate
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleExportReport(employee.id)}
            >
              Export Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}