// src/components/admin/EmployeeAttendanceList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ADMIN_API_END_POINT } from "@/utils/constant";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import moment from "moment";

const EmployeeAttendanceList = ({ view }) => {
  const [data, setData] = useState([]);
  const [date] = useState(moment().format("YYYY-MM-DD"));

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get(
          `${ADMIN_API_END_POINT}/getAttendanceEmployees?view=${view}&date=${date}`,
          { withCredentials: true }
        );
        setData(res.data || []);
      } catch (err) {
        console.error("Failed to fetch employee attendance", err);
      }
    };

    fetchAttendance();
  }, [view, date]);

  if (!data || data.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.map((day, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{view === "daily" ? "Today" : day.date}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-green-600">Present</h4>
              {day.present.length > 0 ? (
                day.present.map((emp) => (
                  <div key={emp._id} className="flex justify-between border-b py-1">
                    <span>{emp.name}</span>
                    <Badge className="bg-green-500">Present</Badge>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No present employees</p>
              )}
            </div>

            <div>
              <h4 className="text-lg font-semibold text-red-600">Absent</h4>
              {day.absent.length > 0 ? (
                day.absent.map((emp) => (
                  <div key={emp._id} className="flex justify-between border-b py-1">
                    <span>{emp.name}</span>
                    <Badge className="bg-red-500">Absent</Badge>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No absent employees</p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EmployeeAttendanceList;
