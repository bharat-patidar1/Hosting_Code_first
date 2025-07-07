import { useEffect, useState } from "react";
import axios from "axios";
import { Attendance_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import EmployeeNavbar from "./EmployeeNavbar";

export default function AttendanceHistory() {
  const [history, setHistory] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});
  const {totalHours} = useSelector(store=>store.employee)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${Attendance_API_END_POINT}/history`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setHistory(res.data.history);
          toast.success("History Fetched Successfully");
        }
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    };
    fetchHistory();
  }, []);

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const toggleRow = (index) => {
    setExpandedRows((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div>
    <EmployeeNavbar/>
    <div className="p-4 max-w-5xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Attendance History</h2>
      <div className="overflow-x-auto rounded shadow border">
        <table className="min-w-full bg-white text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Sessions</th>
              <th className="p-3 border">Total Hours</th>
              <th className="p-3 border">Completed</th>
            </tr>
          </thead>
          <tbody>
            {history.map((record, i) => {
              const showAll = expandedRows[i];
              const displaySessions = showAll
                ? record.sessions
                : record.sessions.slice(0, 5);
              return (
                <tr key={i} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3 border align-top whitespace-nowrap">{record.date}</td>
                  <td className="p-3 border">
                    <AnimatePresence>
                      {displaySessions.map((s, j) => (
                        <motion.div
                          key={j}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {formatTime(s.clockIn)} - {s.clockOut ? formatTime(s.clockOut) : "N/A"}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    {record.sessions.length > 5 && (
                      <Button
                        variant="link"
                        className="text-blue-600 p-0 mt-1"
                        onClick={() => toggleRow(i)}
                      >
                        {showAll ? "Show Less" : `Show More (${record.sessions.length})`}
                      </Button>
                    )}
                  </td>
                  <td className="p-3 border align-top">
                    {totalHours} hrs
                  </td>
                  <td className="p-3 border align-top text-center">
                    {record.isCompleteDay ? "✅" : "❌"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}
