import * as yup from "yup";
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phoneNumber: yup.string()
});

const UpdatePersonalInfoValidationSchema = () => {
  return schema;
};

export default UpdatePersonalInfoValidationSchema;