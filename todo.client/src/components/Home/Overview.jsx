import React, { useState } from "react";
import "./overview.scss";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space, DatePicker, DatePickerProps } from "antd";
import { PlusOutlined, PushpinOutlined } from "@ant-design/icons";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ApiConstants from "../../constants/ApiConstants";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

const Overview = () => {
  const axiosPrivate = useAxiosPrivate();
  //[1]- Accessing react context / user object + getting JWT Token
  const authObject = useAuth();
  const userObject = authObject?.auth?.userObject;
  const [userToDoTasks, setUserToDoTasks] = useState([]);
  //[2]- Getting the tasks of the current user
  useEffect(() => {
    let isMounted = true;
    //to cancel our request if the component is unmounted
    const controller = new AbortController();
    const getUserTasks = async () => {
      try {
        const response = await axiosPrivate.post(
          ApiConstants.GETALL_USER_TASKS_ENDPOINT(userObject?.id),
          {
            signal: controller.signal,
          }
        );
        console.log(response.data);
        isMounted && setUserToDoTasks(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    getUserTasks();

    //clean up function of useEffect - it runs when the component unmount
    return () => {
      isMounted = false;
      //cancel any request when the component unmount
      controller.abort();
    };
  }, []);
  //[3]- call the function one time when the page load

  //[4]- for the purpose of date pickers
  const menu = (
    <Menu
      items={[
        {
          label: <a href="https://www.antgroup.com">This week</a>,
          key: "0",
        },
        {
          label: <a href="https://www.aliyun.com">This month</a>,
          key: "1",
        },
        {
          type: "divider",
        },
        {
          label: "Daily tasks",
          key: "3",
        },
      ]}
    />
  );

  return (
    <div className="overview-wrapper">
      {/* Header title */}
      <div className="header-wrapper">
        <h2 className="pageTitle">Task's overview</h2>
        <Dropdown
          overlay={menu}
          trigger={["click"]}
          className="ant-dropdown-tasksDate"
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Date
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
      {/* Content */}
      <div className="tasks-overview-wrapper">
        {/* To Do container */}
        <div className="addTask-container">
          <div className="innertask-container-header">
            <div className="title">
              <h3>To Do</h3>
              <p className="counter">7</p>
            </div>
            <div className="innertask-headerContainer-button-container">
              <button className="addTaskButton">
                <PlusOutlined className="addButtonIcon" />
              </button>
            </div>
          </div>
          {/* task item */}

          {userToDoTasks?.length ? (
            userToDoTasks.map((task) => (
              <div className="task-item-container" key={task.taskId}>
                <div className="header-container">
                  <h4> • {task.taskTitle}</h4>
                  <PushpinOutlined className="pinIcon" />
                </div>
                <div className="task-description-container">
                  <p>{task.taskDescription}</p>
                </div>
                <div className="overdue-priority-container">
                  <div className="task-overduedate-container">
                    <h5>Overdue date:</h5>
                    <DatePicker />
                  </div>
                  <div className="task-priority-container">
                    {/* example of Very important */}
                    <h5>Priority:</h5>
                    <div className="priority-highest">{task.priority}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              <p>No Current tasks to do :( </p>
            </>
          )}
        </div>

        {/* In Progress container */}
        <div className="todayTasks-container">
          {" "}
          <div className="innertask-container-header">
            <div className="title">
              <h3>In Progress</h3>
              <p className="counter">7</p>
            </div>
            <div className="innertask-headerContainer-button-container">
              <button className="addTaskButton">
                <PlusOutlined className="addButtonIcon" />
              </button>
            </div>
          </div>
        </div>

        {/* Done container */}
        <div className="tomorrowTasks-container">
          {" "}
          <div className="innertask-container-header">
            <div className="title">
              <h3>Done</h3>
              <p className="counter">7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
