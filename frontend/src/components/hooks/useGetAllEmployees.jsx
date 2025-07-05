import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllEmployees } from "@/api/fetchAllEmployee";

export const useGetAllEmployees = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllEmployees(dispatch);
  }, [dispatch]);
};
