const ApiConstants = { 
    //-Random Quotes API
    QUOTES_API_BASE_URL:'https://type.fit',
    RANDOM_QUOTES_ENDPOINT:'/api/quotes',
    
    //-ToDO API
    TODO_API_BASE_URL: 'http://localhost:5133',

    //--Auth EndPoints
    REGISTER_ENDPOINT: '/auth/register',
    LOGIN_ENDPOINT: '/auth/login',
    REFRESHTOKEN_ENDPOINT: '/auth/refresh-token',

    //--ToDos EndPoints 
    GETALL_USER_TASKS_ENDPOINT:(userId) =>{
        return `/todo/${userId}`
    },
    GET_TASK_PRIORITIES: '/todo/task-priorities',

    //Content type for post request
    CONTENT_TYPE_POST_REQUEST: { 'Content-Type': 'application/json' },
};

export default ApiConstants;