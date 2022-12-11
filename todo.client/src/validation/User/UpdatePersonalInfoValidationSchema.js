import * as yup from "yup";
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  phoneNumber: yup.string(),
});

const UpdatePersonalInfoValidationSchema = () => {
  return schema;
};

export default UpdatePersonalInfoValidationSchema;
