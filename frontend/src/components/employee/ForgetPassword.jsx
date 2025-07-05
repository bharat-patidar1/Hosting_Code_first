// components/auth/ForgotPassword.jsx

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Employee_API_END_POINT } from "@/utils/constant";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.put( `${Employee_API_END_POINT}/updatePassword`,
        {
          email: formData.email,
          password: formData.password,
          newPassword: formData.newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Password reset successful. Please log in.");
        navigate("/login");
      } else {
        toast.error(res.data.message || "Password reset failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 shadow rounded-lg bg-white mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center">Reset Your Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="email"
          type="email"
          placeholder="Your Email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="Current / Temp Password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <Input
          name="newPassword"
          type="password"
          placeholder="New Password"
          required
          value={formData.newPassword}
          onChange={handleChange}
        />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm New Password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
}
