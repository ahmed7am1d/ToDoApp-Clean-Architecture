const ApiConstants = {
  //-Random Quotes API
  QUOTES_API_BASE_URL: "https://type.fit",
  RANDOM_QUOTES_ENDPOINT: "/api/quotes",

  //-ToDO API
  TODO_API_BASE_URL: "https://todoapp-webapi.azurewebsites.net",

  //--Auth EndPoints
  REGISTER_ENDPOINT: "/auth/register",
  LOGIN_ENDPOINT: "/auth/login",
  REFRESHTOKEN_ENDPOINT: "/auth/refresh-token",
  LOGOUT_ENDPOINT: "/auth/log-out",

  //--ToDos EndPoints
  GETALL_USER_TODOS_ENDPOINT: (userId) => {
    return `/todo/${userId}`;
  },
  GETALL_USER_IN_PROGRESS_TASKS_ENDPOINT: (userId) => {
    return `/todo/in-progress-tasks/${userId}`;
  },
  GETALL_USER_DONE_TASKS_ENDPOINT: (userId) => {
    return `/todo/todo-done-tasks/${userId}`;
  },
  GETALL_USER_TASKS: (userId) => {
    return `/todo/all/${userId}`
  },
  GET_TASK_PRIORITIES: "/todo/task-priorities",
  GET_TASK_PROGRESSES: "/todo/task-progresses",
  ADD_USER_TASK: "/todo/addTask",
  UPDATE_USER_TASK: "/todo/update-task",
  GET_DELETE_USER_TASK_ENDPOINT:(taskId) =>{
    return `/todo/delete-task/${taskId}`;
  },
  UPDATE_PERSONAL_INFO : "/user/update-personal-info",
  UPDATE_PERSONAL_PASSWORD: "/user/update-personal-password",
  //Content type for post request
  CONTENT_TYPE_POST_REQUEST: { "Content-Type": "application/json" },
};

export default ApiConstants;
