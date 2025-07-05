import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const dummyEmployees = [
  {
    id: 1,
    name: "Ayesha Sharma",
    email: "ayesha@email.com",
    department: "Tech",
    status: "active",
    todayHours: 3.5,
    weekHours: 15,
    lastLogin: "1 hr ago",
  },
  {
    id: 2,
    name: "Rahul Mehra",
    email: "rahul@email.com",
    department: "Sales",
    status: "inactive",
    todayHours: 0,
    weekHours: 5,
    lastLogin: "3 days ago",
  },{
    id: 3,
    name: "Nikita Verma",
    email: "nikita@email.com",
    department: "HR",
    status: "active",
    todayHours: 2,
    weekHours: 12,
    lastLogin: "30 mins ago",
  },
  {
    id: 4,
    name: "Kunal Singh",
    email: "kunal@email.com",
    department: "Tech",
    status: "active",
    todayHours: 4,
    weekHours: 20,
    lastLogin: "10 mins ago",
  },
  {
    id: 5,
    name: "Meera Iyer",
    email: "meera@email.com",
    department: "Marketing",
    status: "inactive",
    todayHours: 0,
    weekHours: 0,
    lastLogin: "7 days ago",
  },
  {
    id: 6,
    name: "Arjun Das",
    email: "arjun@email.com",
    department: "Finance",
    status: "active",
    todayHours: 5,
    weekHours: 25,
    lastLogin: "2 hrs ago",
  },
  {
    id: 7,
    name: "Sara Ali",
    email: "sara@email.com",
    department: "Tech",
    status: "inactive",
    todayHours: 0,
    weekHours: 3,
    lastLogin: "5 days ago",
  },
  {
    id: 8,
    name: "Vikram Rathore",
    email: "vikram@email.com",
    department: "HR",
    status: "active",
    todayHours: 2.5,
    weekHours: 10,
    lastLogin: "1 hr ago",
  },
  {
    id: 9,
    name: "Tina Kapoor",
    email: "tina@email.com",
    department: "Sales",
    status: "active",
    todayHours: 3,
    weekHours: 18,
    lastLogin: "just now",
  },
  {
    id: 10,
    name: "Mohit Jain",
    email: "mohit@email.com",
    department: "Finance",
    status: "inactive",
    todayHours: 0,
    weekHours: 1,
    lastLogin: "4 days ago",
  }
];

export default function EmployeeOverview() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredEmployees = dummyEmployees.filter((emp) => {
    return (
      (emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter === "" || emp.status === statusFilter)
    );
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Employee Overview</h2>

      {/* Top Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-6 gap-3">
        <Input
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3"
        />
        <Select onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center" >Name</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Department</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Today</TableHead>
            <TableHead className="text-center">Week</TableHead>
            <TableHead className="text-center">Last Login</TableHead>
            <TableHead className="pl-15">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEmployees.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell className="font-medium text-center">{emp.name}</TableCell>
              <TableCell className="text-center">{emp.email}</TableCell>
              <TableCell className="text-center">{emp.department}</TableCell>
              <TableCell className="text-center">
                <Badge
                  variant={emp.status === "active" ? "default" : "outline"}
                  className={emp.status === "active" ? "bg-green-500 text-white" : "bg-gray-200 text-black"}
                >
                  {emp.status.charAt(0).toUpperCase() + emp.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-center">{emp.todayHours} hrs</TableCell>
              <TableCell className="text-center">{emp.weekHours} hrs</TableCell>
              <TableCell className="text-center">{emp.lastLogin}</TableCell>
              <TableCell >
                <div className="flex justify-start gap-2">
                  <Button onClick={()=>navigate(`/admin/dashboard/employee/${emp.id}`)} size="sm" variant="outline">View</Button>
                  {emp.status === "active" ? (
                    <Button size="sm" variant="destructive">Deactivate</Button>
                  ) : (
                    <Button size="sm">Activate</Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
