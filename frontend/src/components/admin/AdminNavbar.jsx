import React from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ADMIN_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/loadSlice";
import { Loader2 } from "lucide-react";
import code1stimg from '../images/code1st.png'

export default function AdminNavbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(store=>store.load);
    const logoutHandler = async ()=>{
      try {
          dispatch(setLoading(true));
          const res = await axios.get(`${ADMIN_API_END_POINT}/logout`);
          if(res.data.success){
            navigate('/login')
            toast.success(res.data.message)
          }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }finally{
        dispatch(setLoading(false));
      }
    }

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md border-b">
      <img className="h-15 w-35" src={code1stimg} alt="" />
      <span className="flex"> <h1  className="text-3xl font-bold text-center text-black">Code 1st Dashboard</h1><p className="flex flex-col justify-end h-9 ml-3 ">ft. Rohit Patidar</p></span>
      {
        loading ? (<Button className="cursor-pointer" variant="destructive" onClick={logoutHandler}>
        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait
      </Button>) : (

      <Button className="cursor-pointer" variant="destructive" onClick={logoutHandler}>
        Logout
      </Button>
      )
      }
    </nav>
  );
}
