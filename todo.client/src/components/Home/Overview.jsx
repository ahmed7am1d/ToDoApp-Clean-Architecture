import React, { useState } from "react";
import "./overview.scss";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space, DatePicker, Select } from "antd";
import { PlusOutlined, PushpinOutlined } from "@ant-design/icons";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ApiConstants from "../../constants/ApiConstants";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useTaskPrioritiesData from "../../hooks/useTaskPrioritiesData";
import moment from "moment";
import InProgressImage from "../../assets/images/undraw_progress_overview_re_tvcl.svg";
import TasksDoneImage from "../../assets/images/undraw_complete_task_re_44tb.svg";
const Overview = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  //[1]- Accessing react context / user object + getting JWT Token
  const authObject = useAuth();
  const userObject = authObject?.auth?.userObject;
  const taskPriorities = useTaskPrioritiesData().taskPriorities;
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false);
  const [userToDoTasks, setUserToDoTasks] = useState([]);
  const [userInProgressTasks, setUserInProgressTasks] = useState();
  const [userDoneTasks, setUserDoneTasks] = useState();

  //[2]- Getting the tasks of the current user - (ToDo - In Progress - Done)
  //[3]- call the function one time when the page load
  useEffect(() => {
    let isMounted = true;
    //to cancel our request if the component is unmounted
    const controller = new AbortController();
    //[1]- Gets the userToDoTasks
    const getUserTasks = async () => {
      try {
        const response = await axiosPrivate.post(
          ApiConstants.GETALL_USER_TASKS_ENDPOINT(userObject?.id),
          {
            signal: controller.signal,
          }
        );
        isMounted && setUserToDoTasks(response.data);
      } catch (err) {
        console.error(err);
        //in case of error (exipre of refresh token) - send them back to login
        navigate("/auth/login", {
          state: { from: location },
          replace: true,
        });
      }
    };
    //[2]- Gets the userInProgress Tasks

    //[3]- Gets the userDone Tasks

    //[4]- set taskpriorities

    getUserTasks();
    //clean up function of useEffect - it runs when the component unmount
    return () => {
      isMounted = false;
      //cancel any request when the component unmount
      controller.abort();
    };
  }, []);

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
  //[5]- On click of add task item function
  const addToDoTaskInputFields = () => {
    isAddTaskFormOpen
      ? setIsAddTaskFormOpen(false)
      : setIsAddTaskFormOpen(true);
  };

  //[6]- Drop down task priority
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
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
                <p className="counter">
                  {userToDoTasks ? userToDoTasks.length : "0"}
                </p>
              </div>
              {!isAddTaskFormOpen && (
                <>
                  <div
                    className="innertask-headerContainer-button-container"
                    onClick={() => addToDoTaskInputFields()}
                  >
                    <button className="addTaskButton">
                      <PlusOutlined className="addButtonIcon" />
                    </button>
                  </div>
                </>
              )}
            </div>
            {/* Add task input fields  */}
            {isAddTaskFormOpen && (
              <>
                <div className="task-item-container addTask">
                  <form className="addTask-form-container">
                    <div className="addTask-inputFields-container">
                      <input placeholder="Task title.."></input>
                      <textarea placeholder="Task description..."></textarea>
                    </div>

                    <div className="addTask-overdue-priorty-container">
                      <div className="deadline-container">
                        <h5>Due date: </h5>
                        <DatePicker />
                      </div>
                      <div className="priorty-container">
                        <h5>Task Priority: </h5>
                        <Select
                          defaultValue="Task Priority"
                          onChange={handleChange}
                          options={taskPriorities}
                        />
                      </div>
                    </div>

                    <div className="addTask-cancel-add-container">
                      <button type="submit">Create</button>
                      <button onClick={() => addToDoTaskInputFields()}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
            {/* task item */}
            {userToDoTasks?.length ? (
              userToDoTasks.map((task) => (
                <div className="task-item-container" key={task.taskId}>
                  <div className="header-container">
                    <h5>
                      {" "}
                      <span className="task-header-bullet">•</span>{" "}
                      {task.taskTitle}
                    </h5>
                    <PushpinOutlined className="pinIcon" />
                  </div>
                  <div className="task-description-container">
                    <p>{task.taskDescription}</p>
                  </div>
                  <div className="overdue-priority-container">
                    <div className="task-overduedate-container">
                      <h5>Overdue date:</h5>
                      <DatePicker defaultValue={moment(task.deadlineDate)} />
                    </div>
                    <div className="task-priority-container">
                      {/* example of Very important */}
                      <h5>Priority:</h5>
                      <div
                        className={
                          task?.taskPriorityId === 1
                            ? "priority-highest"
                            : task?.taskPriorityId === 2
                            ? "priority-medium"
                            : "priority-low"
                        }
                      >
                        {task.priority}
                      </div>
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
            <div className="innertask-container-header">
              <div className="title">
                <h3>In Progress</h3>
                <p className="counter">
                  {userInProgressTasks ? userInProgressTasks.length : "0"}
                </p>
              </div>
              {!userInProgressTasks && (
                <>
                  <div className="NoTasks-Image-Container">
                    <img src={InProgressImage} />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Done container */}
          <div className="tomorrowTasks-container">
            <div className="innertask-container-header">
              <div className="title">
                <h3>Done</h3>
                <p className="counter">
                  {userDoneTasks ? userDoneTasks.length : "0"}
                </p>
              </div>
              {!userDoneTasks && (
                <>
                  <div className="NoTasks-Image-Container">
                    <img src={TasksDoneImage} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
