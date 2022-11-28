import React from "react";
import { createContext, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import ApiConstants from "../constants/ApiConstants";
import { useEffect } from "react";
const TaskProgressesContext = createContext({});

export const TaskProgressesProvider = ({ children }) => {
  const axiosPrivate = useAxiosPrivate();
  const [taskProgresses, setTaskProgresses] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const getTaskProgresses = async () => {
      try {
        const response = await axiosPrivate.get(
          ApiConstants.GET_TASK_PROGRESSES,
          {
            signal: controller.signal,
          }
        );

        const filteredArray = response?.data.map((element) => ({
          value: element.taskProgressId,
          label: element.progress,
        }));

        setTaskProgresses(filteredArray);
      } catch (err) {
        console.error(err);
      }
    };
    getTaskProgresses();
  }, []);

  return (
    <TaskProgressesContext.Provider value={{ taskProgresses }}>
      {children}
    </TaskProgressesContext.Provider>
  );
};

export default TaskProgressesContext;
