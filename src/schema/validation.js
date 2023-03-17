import * as yup from "yup"

const schema = yup.object().shape({
  email: yup.string().email().required(),
  fullName: yup.string().required(),
  userName: yup.string().required(),
  password: yup.string().min(6).max(15).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null])
});

export default schema;