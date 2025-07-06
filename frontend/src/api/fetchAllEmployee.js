import axios from "axios";
import { Employee_API_END_POINT } from "@/utils/constant";
import { setAllEmployees } from "@/redux/employeeSlice";

export const fetchAllEmployees = async (dispatch) => {
  try {
    const res = await axios.get(`${Employee_API_END_POINT}/get`, {withCredentials : true});
    if (res.data.success) {
      dispatch(setAllEmployees(res.data.allEmployees));
    }
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
};
