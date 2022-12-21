import React from "react";
import "./upcomingtasks.scss";
import { Timeline } from "antd";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import ApiConstants from "../../constants/ApiConstants";
import { Spin, Space } from "antd";
import moment from "moment";

const UpComingTasks = () => {
  const [allUserTasks, setAllUserTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const { auth, setAuth } = useAuth();

  console.log(auth.userObject.id);

  useEffect(() => {
    const getAllUserTasks = async function () {
      try {
        const response = axiosPrivate
          .get(ApiConstants.GETALL_USER_TASKS(auth.userObject.id))
          .then((response) => {
            setIsLoading(false);
            setAllUserTasks(response.data.sort(function(a,b)  {
              var c = new Date(a.deadlineDate);
              var d = new Date(b.deadlineDate);
              return c - d;
            }));
          });
      } catch (err) {
        console.error(err);
      }
    };
    getAllUserTasks();
  }, []);
  console.log(allUserTasks);
  return (
    <>
      {isLoading ? (
        <Space size="large" align="center" className="bigSpin-loader">
          {" "}
          <Spin size="large" />
        </Space>
      ) : (
        <div className="upcomingtasks-wrapper">
          <div className="header-wrapper-upcomingtasks">
            <h1>Your upcoming tasks</h1>
          </div>
          <div className="timeline-wrapper">
            <Timeline mode="right">
              {allUserTasks.map((task) => (
                <Timeline.Item
                  label={moment(task.deadlineDate).format("LL")}
                  color={
                    task.taskPriorityId === 1
                      ? "red"
                      : task.taskPriorityId === 2
                      ? "yellow"
                      : "gray"
                  }
                  className={
                    task.taskPriorityId === 1
                      ? "timeline-wrapper-left red"
                      : task.taskPriorityId === 2
                      ? "timeline-wrapper-left yellow"
                      : "timeline-wrapper-left gray"
                  }
                >
                  <div className="task-title-wrapper">
                    <h6>
                      <span>●</span> {task.taskTitle}
                    </h6>
                    <p>{task.taskDescription}</p>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </div>
        </div>
      )}
    </>
  );
};

export default UpComingTasks;
