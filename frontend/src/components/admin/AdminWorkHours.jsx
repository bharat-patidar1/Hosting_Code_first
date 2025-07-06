// src/components/admin/AdminWorkHours.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  Cell,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ADMIN_API_END_POINT } from "@/utils/constant";
import AdminNavbar from "./AdminNavbar";

// Softer, friendly colors
const COLORS = [
  "#60a5fa", // Sky Blue
  "#86efac", // Mint Green
  "#a5b4fc", // Indigo Soft
  "#fcd34d", // Amber
  "#c4b5fd", // Lavender
  "#f9a8d4", // Light Pink
  "#fca5a5", // Soft Coral
  "#93c5fd", // Cloud Blue
];

const AdminWorkHours = () => {
  const [workDataRaw, setWorkDataRaw] = useState([]);
  const [view, setView] = useState("weekly");
  const [chartType, setChartType] = useState("bar");
  const [loading, setLoading] = useState(true);

  const fetchWorkHours = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${ADMIN_API_END_POINT}/getWorkHour/?view=${view}`, {
        withCredentials: true,
      });
      setWorkDataRaw(res.data.employees || []);
    } catch (err) {
      console.error("Failed to fetch work hours", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkHours();
  }, [view]);

  const toggleView = () => {
    setView((prev) => (prev === "daily" ? "weekly" : "daily"));
  };

  const toggleChartType = () => {
    setChartType((prev) => (prev === "bar" ? "line" : "bar"));
  };

  const isUnderworked = (hours) =>
    (view === "daily" && hours < 8) || (view === "weekly" && hours < 40);

  const normalizedData = workDataRaw.map((entry) => ({
    ...entry,
    hours: parseFloat(entry.hours),
  }));

  return (
    <div>
    <AdminNavbar/>
    <div className="p-6 max-w-6xl mx-auto space-y-6 bg-[#f9fafb] min-h-screen text-gray-800">
      {/* Chart Section */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="flex flex-col md:flex-row justify-between items-center gap-4">
          <CardTitle className="text-2xl font-semibold">
            Work Hours – {view === "daily" ? "Daily" : "Weekly"}
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" onClick={toggleView}>
              Switch to {view === "daily" ? "Weekly" : "Daily"}
            </Button>
            <Button variant="outline" onClick={toggleChartType}>
              {chartType === "bar" ? "Line Chart" : "Bar Chart"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${view}-${chartType}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.4 }}
              >
                <ResponsiveContainer width="100%" height={400}>
                  {chartType === "bar" ? (
                    <BarChart data={normalizedData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#f9fafb",
                          borderColor: "#d1d5db",
                          color: "#1f2937",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="hours" label={{ position: "top", fill: "#374151" }}>
                        {normalizedData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              isUnderworked(entry.hours)
                                ? "#fca5a5" // Light coral for underworked
                                : COLORS[index % COLORS.length]
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  ) : (
                    <LineChart data={normalizedData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#f9fafb",
                          borderColor: "#d1d5db",
                          color: "#1f2937",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="hours"
                        stroke="#60a5fa"
                        strokeWidth={3}
                        dot={{ stroke: "white", strokeWidth: 2 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </motion.div>
            </AnimatePresence>
          )}
        </CardContent>
      </Card>

      {/* Work Summary Section */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Work Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={`summary-${view}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
              className="space-y-2"
            >
              {normalizedData.map((emp, index) => (
                <div
                  key={emp._id}
                  className={`flex justify-between items-center px-4 py-2 rounded-lg ${
                    isUnderworked(emp.hours) ? "bg-pink-100" : "bg-gray-100"
                  }`}
                >
                  <span className="font-medium text-gray-700">{emp.name}</span>
                  <Badge
                    style={{
                      backgroundColor: isUnderworked(emp.hours)
                        ? "#fca5a5"
                        : COLORS[index % COLORS.length],
                      color: "#1f2937",
                    }}
                  >
                    {emp.hours} hrs
                  </Badge>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
    </div>
  );
};

export default AdminWorkHours;
