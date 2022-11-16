import { createContext, useState, useEffect } from "react";
import React from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import ApiConstants from "../constants/ApiConstants";
const TaskPrioritiesContext = createContext({});

export const TaskPrioritiesProvider = ({ children }) => {
  const axiosPrivate = useAxiosPrivate();
  const [taskPriorities, setTaskPriorities] = useState();

  useEffect(() => {
    const controller = new AbortController();

    const getTaskPriorities = async () => {
      try {
        const response = await axiosPrivate.get(
          ApiConstants.GET_TASK_PRIORITIES,
          {
            signal: controller.signal,
          }
        );
        const filteredArray = response?.data.map((element) => ({
          value: element.taskPriorityId,
          label: element.priority,
        }));
        console.log(filteredArray)
        setTaskPriorities(filteredArray);
      } catch (err) {
        console.log(err);
      }
    };

    getTaskPriorities();
  }, []);
  return (
    <TaskPrioritiesContext.Provider value={{ taskPriorities }}>
      {children}
    </TaskPrioritiesContext.Provider>
  );
};
export default TaskPrioritiesContext;
