import React, { useState } from "react";
import "./overview.scss";
import { DownOutlined, CloseCircleFilled } from "@ant-design/icons";
import {
  Dropdown,
  Menu,
  Space,
  DatePicker,
  Select,
  Form,
  Input,
  Checkbox,
  Popconfirm,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ApiConstants from "../../constants/ApiConstants";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useTaskPrioritiesData from "../../hooks/useTaskPrioritiesData";
import moment from "moment";
import ToDosImage from "../../assets/images/undraw_note_list_re_r4u9.svg";
import InProgressImage from "../../assets/images/undraw_progress_overview_re_tvcl.svg";
import TasksDoneImage from "../../assets/images/undraw_complete_task_re_44tb.svg";
import AddTaskValidationSchema from "../../validation/ToDos/AddTaskValidationSchema";
import TextArea from "antd/lib/input/TextArea";
import useTaskProgressesData from "../../hooks/useTaskProgressesData";
import ToDoLightImage from "../../assets/images/todo-light.png";
import InProgressLightImage from "../../assets/images/progress-light.png";
import DoneLightImage from "../../assets/images/done-light.png";
const Overview = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const taskPriorities = useTaskPrioritiesData().taskPriorities;
  const taskProgresses = useTaskProgressesData().taskProgresses;
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false);
  const [userToDoTasks, setUserToDoTasks] = useState([]);
  const [userInProgressTasks, setUserInProgressTasks] = useState([]);
  const [userDoneTasks, setUserDoneTasks] = useState([]);
  //[1]- Accessing react context / user object + getting JWT Token
  const authObject = useAuth();
  const userObject = authObject?.auth?.userObject;
  //[2]- Getting the tasks of the current user - (ToDo - In Progress - Done)
  //[3]- call the function one time when the page load
  useEffect(() => {
    let isMounted = true;
    //to cancel our request if the component is unmounted
    const controller = new AbortController();
    //[1]- Gets the userToDoTasks
    const getUserToDoTasks = async () => {
      try {
        const response = await axiosPrivate.get(
          ApiConstants.GETALL_USER_TODOS_ENDPOINT(userObject?.id),
          {
            signal: controller.signal,
          }
        );
        isMounted && setUserToDoTasks(response?.data);
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
    const getUserTasksInProgress = async () => {
      try {
        const response = await axiosPrivate.get(
          ApiConstants.GETALL_USER_IN_PROGRESS_TASKS_ENDPOINT(userObject?.id),
          {
            signal: controller.signal,
          }
        );
        isMounted && setUserInProgressTasks(response?.data);
      } catch (err) {
        console.error(err);
        //in case of error (exipre of refresh token) - send them back to login
        navigate("/auth/login", {
          state: { from: location },
          replace: true,
        });
      }
    };
    //[3]- Gets the userDone Tasks
    const getUserDoneTasks = async () => {
      try {
        const response = await axiosPrivate.get(
          ApiConstants.GETALL_USER_DONE_TASKS_ENDPOINT(userObject?.id),
          {
            signal: controller.signal,
          }
        );
        isMounted && setUserDoneTasks(response?.data);
      } catch (err) {
        console.log(err);
      }
    };
    //-- calling of the functions
    getUserToDoTasks();
    getUserTasksInProgress();
    getUserDoneTasks();
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
  //[6]- Chaning of the overdue date of each task category
  //----------------Better idea is on change and that's set :(
  const handleOverdueDateChange = (e, t, setUt) => {
    var taskToUpdate = t;
    taskToUpdate.deadlineDate = e?._d || undefined;
    taskToUpdate["userId"] = userObject.id;
    const updateOverdueDate = async () => {
      try {
        const response = await axiosPrivate.put(
          ApiConstants.UPDATE_USER_TASK,
          JSON.stringify(taskToUpdate)
        );
        //update the task to the received value
        setUt((current) =>
          current.map((obj) => {
            if (obj.taskId === t.taskId) {
              return { ...obj, deadlineDate: response.data.deadlineDate };
            }

            return obj;
          })
        );
      } catch (err) {
        console.log(err);
      }
    };

    updateOverdueDate();
  };

  //[7]- Adding task functions
  //yup validation
  const yupSync = {
    async validator({ field }, value) {
      await AddTaskValidationSchema().validateSyncAt(field, { [field]: value });
    },
  };
  const [form] = Form.useForm();

  const handleAddTaskFormSubmission = async (e, task) => {
    const userId = authObject.auth.userObject.id;
    const taskTitle = e.taskTitle;
    const taskDescription = e?.taskDescription;
    const overDueDate = e.overDueDate;
    const taskPriorityId = e.taskPriorityPicker;

    try {
      const response = await axiosPrivate.post(
        ApiConstants.ADD_USER_TASK,
        JSON.stringify({
          userId: userId,
          taskTitle: taskTitle,
          taskDescription: taskDescription,
          DeadlineDate: overDueDate,
          taskPriorityId: taskPriorityId,
        }),
        {
          headers: ApiConstants.CONTENT_TYPE_POST_REQUEST,
        }
      );
      //Adding to the todosUserTask
      response?.data && setUserToDoTasks((prev) => [response.data, ...prev]);
      //close the add form
      setIsAddTaskFormOpen(false);
      //show message
      message.success("Task is successfully added");
    } catch (err) {
      console.error(err);
    }
  };

  //[8]- DatePicker limitations
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current <= moment().startOf("day");
  }

  //[9]- Handle move to change
  const handleMoveToChange = (value, taskId, taskObject) => {
    var newTaskProgressId = value.target.value;
    var taskUpdateReqeust = {
      taskId: taskObject.taskId,
      userId: userObject.id,
      taskTitle: taskObject.taskTitle,
      taskDescription: taskObject.taskDescription,
      deadlineDate: taskObject.deadlineDate,
      taskPriorityId: taskObject.taskPriorityId,
      taskProgressId: newTaskProgressId,
    };
    //[1]- Send Request to API to update (send the whole new object with the new values)
    const updateUserTask = async () => {
      try {
        const response = await axiosPrivate.put(
          ApiConstants.UPDATE_USER_TASK,
          JSON.stringify(taskUpdateReqeust)
        );
        //[2]- Remove from todos the task with the taskId
        taskObject.taskProgressId === 2 &&
          setUserToDoTasks((prev) =>
            prev.filter((taskItem) => taskItem.taskId !== taskObject.taskId)
          );
        taskObject.taskProgressId === 1 &&
          setUserDoneTasks((prev) =>
            prev.filter((taskItem) => taskItem.taskId !== taskObject.taskId)
          );
        taskObject.taskProgressId === 3 &&
          setUserInProgressTasks((prev) =>
            prev.filter((taskItem) => taskItem.taskId !== taskObject.taskId)
          );
        //[3]- Add the task recived from the api to the specific state (Progress, done)
        newTaskProgressId === 1 &&
          setUserDoneTasks((prev) => [response.data, ...prev]);
        newTaskProgressId === 2 &&
          setUserToDoTasks((prev) => [response.data, ...prev]);
        newTaskProgressId === 3 &&
          setUserInProgressTasks((prev) => [response.data, ...prev]);
      } catch (err) {
        console.log(err);
      }
    };
    updateUserTask();
  };

  //[10]- Handle deletion of a task
  const confirmDeletion = (taskId, taskProgressId) => {
    //[1]- Function to send request to delete the task
    const deleteTask = async () => {
      try {
        const response = await axiosPrivate.delete(
          ApiConstants.GET_DELETE_USER_TASK_ENDPOINT(taskId)
        );
        response.status === 204 && message.success("Task successfully deleted");
        //[2]- Remove from specific list of tasks the task with the taskId
        taskProgressId === 2 &&
          setUserToDoTasks((prev) =>
            prev.filter((taskItem) => taskItem.taskId !== taskId)
          );
        taskProgressId === 1 &&
          setUserDoneTasks((prev) =>
            prev.filter((taskItem) => taskItem.taskId !== taskId)
          );
        taskProgressId === 3 &&
          setUserInProgressTasks((prev) =>
            prev.filter((taskItem) => taskItem.taskId !== taskId)
          );
      } catch (err) {
        console.error(err);
      }
    };
    //[2]- call the delete function
    deleteTask();
  };

  return (
    <>
      <div
        className={
          localStorage.getItem("darkmode") === "true"
            ? "overview-wrapper dark"
            : localStorage.getItem("lightmode") === "true"
            ? "overview-wrapper light"
            : "overview-wrapper dark"
        }
      >
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
                  <Form
                    form={form}
                    onFinish={handleAddTaskFormSubmission}
                    className="addTask-form-container"
                  >
                    <div className="addTask-inputFields-container">
                      <Form.Item rules={[yupSync]} name="taskTitle">
                        <Input
                          placeholder="Task title.."
                          className="taskTitleInput"
                        ></Input>
                      </Form.Item>
                      <Form.Item name="taskDescription">
                        <TextArea
                          placeholder="Task description..."
                          className="taskDescriptionInput"
                        ></TextArea>
                      </Form.Item>
                    </div>

                    <div className="addTask-overdue-priorty-container">
                      <div className="deadline-container">
                        <h5>Due date: </h5>
                        <Form.Item rules={[yupSync]} name="overDueDate">
                          <DatePicker
                            disabledDate={disabledDate}
                            className="overDueTaskDatePicker"
                          />
                        </Form.Item>
                      </div>
                      <div className="priorty-container">
                        <h5>Task Priority: </h5>
                        <Form.Item rules={[yupSync]} name="taskPriorityPicker">
                          <Select
                            className="taskPriorityPicker"
                            defaultValue="Task Priority"
                            options={taskPriorities}
                          />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="addTask-cancel-add-container">
                      <button type="submit">Create</button>
                      <button onClick={() => addToDoTaskInputFields()}>
                        Cancel
                      </button>
                    </div>
                  </Form>
                </div>
              </>
            )}

            {/* task item */}
            {userToDoTasks?.length ? (
              userToDoTasks.map((task) => (
                <div className="task-item-container" key={task.taskId}>
                  <div className="header-container">
                    <h4>
                      {" "}
                      <span className="task-header-bullet">•</span>{" "}
                      {task.taskTitle}
                    </h4>
                    <Popconfirm
                      title="Are you sure you want to delete the task ?"
                      popConfirmId={task.taskId}
                      onConfirm={(e) =>
                        confirmDeletion(task.taskId, task.taskProgressId)
                      }
                    >
                      <CloseCircleFilled className="deleteIcon" />
                    </Popconfirm>
                  </div>
                  <div className="task-description-container">
                    <p>{task.taskDescription}</p>
                  </div>
                  <div className="overdue-priority-container">
                    <div className="task-overduedate-container">
                      <h5>Overdue date:</h5>
                      {task.deadlineDate ? (
                        <DatePicker
                          value={moment(task.deadlineDate)}
                          defaultValue="Select a date..."
                          onChange={(e) =>
                            handleOverdueDateChange(e, task, setUserToDoTasks)
                          }
                        />
                      ) : (
                        <DatePicker
                          placeholder="Select a date..."
                          onChange={(e) => handleOverdueDateChange(e, task)}
                        />
                      )}
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
                  <div className="move-to-container">
                    <div className="move-to-container-header">
                      <h5>Move to:</h5>
                    </div>
                    <div className="move-to-container-checkbox-container">
                      {taskProgresses?.map((item) => {
                        return (
                          !(item.label === "ToDo") && (
                            <>
                              <div
                                className="single-checkboxlabel-container"
                                key={item.value}
                              >
                                <Checkbox
                                  key={item.label}
                                  onChange={(e) =>
                                    handleMoveToChange(e, task.taskId, task)
                                  }
                                  value={item.value}
                                ></Checkbox>
                                <label>{item.label}</label>
                              </div>
                            </>
                          )
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="NoTasks-Image-Container">
                  <img
                    src={
                      localStorage.getItem("darkmode") === "true"
                        ? ToDosImage
                        : localStorage.getItem("lightmode") === "true"
                        ? ToDoLightImage
                        : ToDosImage
                    }
                    alt="To Dos"
                  />
                </div>
              </>
            )}
          </div>

          {/* In Progress container */}
          <div className="inProgress-container">
            <div className="innertask-container-header">
              <div className="title">
                <h3>In Progress</h3>
                <p className="counter">
                  {userInProgressTasks ? userInProgressTasks.length : "0"}
                </p>
              </div>
              {userInProgressTasks?.length <= 0 ? (
                <>
                  <div className="NoTasks-Image-Container">
                    <img
                      src={
                        localStorage.getItem("darkmode") === "true"
                          ? InProgressImage
                          : localStorage.getItem("lightmode") === "true"
                          ? InProgressLightImage
                          : InProgressImage
                      }
                      alt="In Progress"
                    />
                  </div>
                </>
              ) : (
                <>
                  {userInProgressTasks?.map((t) => (
                    <div className="task-item-container" key={t.taskId}>
                      <div className="header-container">
                        <h5>
                          {" "}
                          <span className="task-header-bullet">•</span>{" "}
                          {t.taskTitle}
                        </h5>
                        <Popconfirm
                          title="Are you sure you want to delete the task ?"
                          popConfirmId={t.taskId}
                          onConfirm={(e) =>
                            confirmDeletion(t.taskId, t.taskProgressId)
                          }
                        >
                          <CloseCircleFilled className="deleteIcon" />
                        </Popconfirm>
                      </div>
                      <div className="task-description-container">
                        <p>{t.taskDescription}</p>
                      </div>
                      <div className="overdue-priority-container">
                        <div className="task-overduedate-container">
                          <h5>Overdue date:</h5>
                          {t.deadlineDate ? (
                            <DatePicker
                              value={moment(t.deadlineDate)}
                              defaultValue="Select a date..."
                              onChange={(e) =>
                                handleOverdueDateChange(
                                  e,
                                  t,
                                  setUserInProgressTasks
                                )
                              }
                            />
                          ) : (
                            <DatePicker
                              placeholder="Select a date..."
                              onChange={(e) => handleOverdueDateChange(e, t)}
                            />
                          )}
                        </div>
                        <div className="task-priority-container">
                          <h5>Priority:</h5>
                          <div
                            className={
                              t?.taskPriorityId === 1
                                ? "priority-highest"
                                : t?.taskPriorityId === 2
                                ? "priority-medium"
                                : "priority-low"
                            }
                          >
                            {t.priority}
                          </div>
                        </div>
                      </div>
                      <div className="move-to-container">
                        <div className="move-to-container-header">
                          <h5>Move to:</h5>
                        </div>
                        <div className="move-to-container-checkbox-container">
                          {taskProgresses?.map((item) => {
                            return (
                              !(item.label === "In Progress") && (
                                <>
                                  <div
                                    className="single-checkboxlabel-container"
                                    key={item.value}
                                  >
                                    <Checkbox
                                      key={item.label}
                                      onChange={(e) =>
                                        handleMoveToChange(e, t.taskId, t)
                                      }
                                      value={item.value}
                                    ></Checkbox>
                                    <label>{item.label}</label>
                                  </div>
                                </>
                              )
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Done container */}
          <div className="doneTasks-container">
            <div className="innertask-container-header">
              <div className="title">
                <h3>Done</h3>
                <p className="counter">
                  {userDoneTasks ? userDoneTasks.length : "0"}
                </p>
              </div>
              {userDoneTasks?.length <= 0 ? (
                <>
                  <div className="NoTasks-Image-Container">
                    <img
                      src={
                        localStorage.getItem("darkmode") === "true"
                          ? TasksDoneImage
                          : localStorage.getItem("lightmode") === "true"
                          ? DoneLightImage
                          : TasksDoneImage
                      }
                      alt="Done tasks"
                    />
                  </div>
                </>
              ) : (
                <>
                  {userDoneTasks?.map((t) => (
                    <div className="task-item-container" key={t.taskId}>
                      <div className="header-container">
                        <h5>
                          {" "}
                          <span className="task-header-bullet">•</span>{" "}
                          {t.taskTitle}
                        </h5>
                        <Popconfirm
                          title="Are you sure you want to delete the task ?"
                          popConfirmId={t.taskId}
                          onConfirm={(e) =>
                            confirmDeletion(t.taskId, t.taskProgressId)
                          }
                        >
                          <CloseCircleFilled className="deleteIcon" />
                        </Popconfirm>
                      </div>
                      <div className="task-description-container">
                        <p>{t.taskDescription}</p>
                      </div>
                      <div className="overdue-priority-container">
                        <div className="task-overduedate-container">
                          <h5>Overdue date:</h5>
                          {t.deadlineDate ? (
                            <DatePicker
                              value={moment(t.deadlineDate)}
                              defaultValue="Select a date..."
                              onChange={(e) =>
                                handleOverdueDateChange(e, t, setUserDoneTasks)
                              }
                            />
                          ) : (
                            <DatePicker
                              placeholder="Select a date..."
                              onChange={(e) => handleOverdueDateChange(e, t)}
                            />
                          )}
                        </div>
                        <div className="task-priority-container">
                          <h5>Priority:</h5>
                          <div
                            className={
                              t?.taskPriorityId === 1
                                ? "priority-highest"
                                : t?.taskPriorityId === 2
                                ? "priority-medium"
                                : "priority-low"
                            }
                          >
                            {t.priority}
                          </div>
                        </div>
                      </div>
                      <div className="move-to-container">
                        <div className="move-to-container-header">
                          <h5>Move to:</h5>
                        </div>
                        <div className="move-to-container-checkbox-container">
                          {taskProgresses?.map((item) => {
                            return (
                              !(item.label === "Done") && (
                                <>
                                  <div
                                    className="single-checkboxlabel-container"
                                    key={item.value}
                                  >
                                    <Checkbox
                                      key={item.label}
                                      onChange={(e) =>
                                        handleMoveToChange(e, t.taskId, t)
                                      }
                                      value={item.value}
                                    ></Checkbox>
                                    <label>{item.label}</label>
                                  </div>
                                </>
                              )
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
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
