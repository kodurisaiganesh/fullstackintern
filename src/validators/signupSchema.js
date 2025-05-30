import * as yup from "yup";

const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])/;

export const signupSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  address: yup.string().required("Address is required"),
  role: yup
    .string()
    .oneOf(["User", "Store Owner"], "Role must be User or Store Owner")
    .required("Role is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters")
    .matches(passwordRegex, "Password must contain an uppercase letter and a special character")
    .required("Password is required"),
});
