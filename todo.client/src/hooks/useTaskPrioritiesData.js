import TaskPrioritiesContext from "../context/TaskPrioritiesProvider";
import { useContext } from "react";

const useTaskPrioritiesData = () => {
  return useContext(TaskPrioritiesContext)
}

export default useTaskPrioritiesData