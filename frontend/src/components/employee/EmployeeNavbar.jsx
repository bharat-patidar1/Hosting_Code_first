import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  BellIcon,
  ClockIcon,
  CalendarIcon,
  UserIcon,
  SettingsIcon,
  UploadIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "sonner";

const EmployeeNavbar = () => {
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        toast.success("Profile image updated successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      toast.success("Successfully logged out!");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left - Company Brand */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-primary">
              👨‍⚕️ Code 1st Health
            </span>
          </div>

          {/* Center - Navigation Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/employee/dashboard/history")}
              className="flex items-center space-x-2"
            >
              <CalendarIcon className="h-4 w-4" />
              <span>Attendance</span>
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/employee/dashboard/leaves")}
              className="flex items-center space-x-2"
            >
              <ClockIcon className="h-4 w-4" />
              <span>Leave</span>
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/employee/dashboard/payroll")}
              className="flex items-center space-x-2"
            >
              <SettingsIcon className="h-4 w-4" />
              <span>Payroll</span>
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/employee/dashboard/notifications")}
              className="flex items-center space-x-2 relative"
            >
              <BellIcon className="h-4 w-4" />
              <span>Notifications</span>
              <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                3
              </span>
            </Button>
          </div>
          <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Avatar className="cursor-pointer">
      <AvatarImage src={profileImage || '/default-avatar.png'} />
      <AvatarFallback>BH</AvatarFallback>
    </Avatar>
  </DropdownMenuTrigger>

  <DropdownMenuContent className="w-[300px] py-4 px-3">
  <div className="flex flex-col space-y-4">
              {/* User Info */}
              <div className="text-center">
                <h3 className="text-lg font-bold">Bharat Patidar</h3>
                <p className="text-sm text-gray-500">Software Engineer</p>
              </div>

              {/* Profile Photo Upload */}
              <div className="space-y-2">
                <p className="flex items-center gap-2 font-medium">
                  <UploadIcon className="w-4 h-4" />
                  Profile Photo
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageUpload}
                  className="w-full text-sm file:px-4 file:py-1.5 file:rounded-md file:border-0 file:bg-muted file:text-sm file:font-medium file:text-black"
                />
              </div>

              {/* Profile Update */}
              <div className="space-y-1">
                <Button
                  variant="outline"
                  className="w-full flex justify-start gap-2"
                  onClick={() => navigate('/employee/dashboard/profile')}
                >
                  <UserIcon className="w-4 h-4" />
                  Edit Profile
                </Button>
              </div>

              {/* Skills Update */}
              <div className="space-y-1">
                <Button
                  variant="outline"
                  className="w-full flex justify-start gap-2"
                  onClick={() => navigate('/employee/dashboard/skills')}
                >
                  <SettingsIcon className="w-4 h-4" />
                  Edit Skills
                </Button>
              </div>

              {/* Logout */}
              <Button
                variant="destructive"
                className="w-full"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
  </DropdownMenuContent>
</DropdownMenu>
          

        </div>
      </div>
    </nav>
  );
};

export default EmployeeNavbar;
