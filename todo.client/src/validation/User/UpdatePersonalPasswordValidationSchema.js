import * as yup from "yup";
const schema = yup.object().shape({
  password: yup
    .string()
    .required("Your current password is required.")
    .min(6, "Password must be at least 6 characters.")
    .max(20, "Password must be a max of 20 characters."),
  
  newPassword: yup
    .string()
    .required("The new password is required.")
    .min(6, "Password must be at least 6 characters.")
    .max(20, "Password must be a max of 20 characters.")
});

const UpdatePersonalPasswordValidationSchema = () => {
  return schema;
};

export default UpdatePersonalPasswordValidationSchema;
