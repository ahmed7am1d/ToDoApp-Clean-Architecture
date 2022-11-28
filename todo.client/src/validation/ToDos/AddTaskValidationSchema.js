import * as yup from "yup"

const schema = yup.object().shape({
    taskTitle: yup.string().required("Task title is required"),
    overDueDate: yup.string().required("Over due date is required"),
    taskPriorityPicker: yup.string().required("Task priority is required")
})

const AddTaskValidationSchema = () => {
    return schema;
}

export default AddTaskValidationSchema;