import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email("Provide a correct email form such as example@ex.com").required("Email is required"),
  password: yup.string().min(6,"Password must be at least 6 characters").max(15,"Password must be a max of 15 characters").required("Password is required")
  .matches(/[a-z]+/, "Must contain one lowercase character")
  .matches(/[A-Z]+/, "Must contain one uppercase character")
});

const LoginValidationSchema = () => {
  return schema;
};
export default LoginValidationSchema;
