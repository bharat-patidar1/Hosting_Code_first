import axios from 'axios';
import { Employee_API_END_POINT } from '@/utils/constant';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

axios.defaults.withCredentials = true;

export const useAuth = () => {
  const navigate = useNavigate();

  // Logout function - Just calls the backend to clear the cookie
  const logout = async () => {
    try {
      const response = await axios.get(`${Employee_API_END_POINT}/logout`);
      if (response.data.success) {
        toast.success('Successfully logged out!');
        navigate('/login');
      }
    } catch (error) {
      toast.error('Logout failed');
      throw error;
    }
  };

  // For JWT with cookies, we don't need to manage the token state
  // The cookie will be automatically sent with each request
  // The backend will handle token validation

  return {
    logout,
  };
};