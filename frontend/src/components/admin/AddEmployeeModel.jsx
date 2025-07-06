import { useEffect, useState } from "react";
// import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/loadSlice";
import axios from "axios";
import { Employee_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { fetchAllEmployees } from "@/api/fetchAllEmployee";

export default function AddEmployeeModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    department: "",
    location: "",
  });
  const dispatch = useDispatch();
  const { loading } = useSelector(store => store.load);
  const navigate = useNavigate()
  const [open, setOpen] = useState(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${Employee_API_END_POINT}/register`, form, {
        headers: {
          "Content-Type": 'application/json'
        },
        withCredentials: true
      })
      if(res.data.success){
        navigate('/admin/dashboard/employees');
        toast.success(res.data.message);
        onSuccess?.()
        await fetchAllEmployees(dispatch);
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setLoading(false))
      setOpen(false)
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite New Employee</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="department">Department</Label>
            <Input name="department" value={form.department} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input name="location" value={form.location} onChange={handleChange} />
          </div>
          {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Sending Invite..." : "Send Invite"}
          </Button>

        </form>
      </DialogContent>
    </Dialog>
  );
}