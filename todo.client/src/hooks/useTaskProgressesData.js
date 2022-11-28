import React from "react";
import { useContext } from "react";
import TaskProgressesContext from "../context/TaskProgressesProvider";


const useTaskProgressesData = () => {
  return useContext(TaskProgressesContext);
};
export default useTaskProgressesData;
