import axios from "axios";
import { Employee_API_END_POINT } from "@/utils/constant";
import { setEmployee } from "@/redux/employeeSlice";

export const fetchEmployee = async (dispatch , id) => {
  try {
    const res = await axios.get(`${Employee_API_END_POINT}/get/${id}`, {withCredentials : true});
    if (res.data.success) {
      dispatch(setEmployee(res.data.employeeDetail));
    }
  } catch (error) {
    console.error("Error fetching employee:", error);
  }
};