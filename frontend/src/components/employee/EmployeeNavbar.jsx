import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BellIcon, ClockIcon, CalendarIcon, UserIcon, SettingsIcon, UploadIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "sonner";

const EmployeeNavbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
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
    <nav className="bg-white shadow-md fixed w-[73%] z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex w-full justify-between items-center h-16">
          {/* Left - Company Brand */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-primary">
              👨‍⚕️ Code 1st Health
            </span>
          </div>

          {/* Center - Quick Actions */}
          <div className="hidden md:flex items-center flex-1 justify-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/employee/dashboard/history')}
              className="flex items-center space-x-2"
            >
              <CalendarIcon className="h-4 w-4" />
              <span>Attendance</span>
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/employee/dashboard/applyLeave')}
              className="flex items-center space-x-2"
            >
              <ClockIcon className="h-4 w-4" />
              <span>Leave</span>
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/employee/dashboard/payroll')}
              className="flex items-center space-x-2"
            >
              <SettingsIcon className="h-4 w-4" />
              <span>Payroll</span>
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/employee/dashboard/notifications')}
              className="flex items-center space-x-2 relative"
            >
              <BellIcon className="h-4 w-4" />
              <span>Notifications</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
            </Button>
          </div>

          {/* Right - Profile Section */}
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={profileImage || '/default-avatar.png'} />
                  <AvatarFallback>BH</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80">
                <div className="flex flex-col space-y-4 p-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Bharat Patidar</h3>
                    <p className="text-sm text-gray-500">Software Engineer</p>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <UploadIcon className="h-4 w-4" />
                      <span>Update Profile Photo</span>
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageUpload}
                      className="hidden"
                      id="profile-image"
                    />
                    <label htmlFor="profile-image" className="cursor-pointer">
                      <Button variant="outline" size="sm">
                        Choose Photo
                      </Button>
                    </label>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <UserIcon className="h-4 w-4" />
                      <span>Update Profile</span>
                    </label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/employee/dashboard/profile')}
                    >
                      Edit Profile
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <SettingsIcon className="h-4 w-4" />
                      <span>Skills & Bio</span>
                    </label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/employee/dashboard/skills')}
                    >
                      Edit Skills
                    </Button>
                  </div>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default EmployeeNavbar;