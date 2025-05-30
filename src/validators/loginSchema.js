import * as yup from "yup";

const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])/;

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters")
    .matches(passwordRegex, "Password must contain an uppercase letter and a special character")
    .required("Password is required"),
});
