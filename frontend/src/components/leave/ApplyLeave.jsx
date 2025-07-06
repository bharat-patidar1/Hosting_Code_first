// src/components/employee/ApplyLeave.jsx
import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { leave_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const API_ENDPOINT = "http://localhost:8000/api/employee/leave/apply"; // adjust as per your backend route

const ApplyLeave = ({ onClose }) => {
  const [formData, setFormData] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLeaveTypeChange = (value) => {
    setFormData((prev) => ({ ...prev, leaveType: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
     const res =  await axios.post(`${leave_API_END_POINT}/apply`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if(res.data.success){
          toast.success(res.data.message)
          navigate('/employee/dashboard')
      }
    } catch (error) {
      console.error("Leave submission failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Apply for Leave</h2>
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Leave Type */}
        <div>
          <Label htmlFor="leaveType">Leave Type</Label>
          <Select onValueChange={handleLeaveTypeChange}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select Leave Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sick">Sick</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="unpaid">Unpaid</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* From Date */}
        <div>
          <Label htmlFor="fromDate">From Date</Label>
          <Input
            type="date"
            id="fromDate"
            name="fromDate"
            value={formData.fromDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* To Date */}
        <div>
          <Label htmlFor="toDate">To Date</Label>
          <Input
            type="date"
            id="toDate"
            name="toDate"
            value={formData.toDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Reason */}
        <div>
          <Label htmlFor="reason">Reason</Label>
          <Textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows={4}
            placeholder="Explain your reason for leave"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4 pt-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ApplyLeave;
