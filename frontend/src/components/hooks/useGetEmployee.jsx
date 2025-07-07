import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchEmployee } from "@/api/fetchEmployee";

export const useGetEmployee = (id) => {
  const dispatch = useDispatch();
  console.log(id)

  useEffect(() => {
    fetchEmployee(dispatch , id);
  }, [dispatch]);
};