import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validators/loginSchema";
import { loginUser } from "./authService";
import { useAuth } from "./authContext";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      login(response.user, response.token);

      // Redirect based on role
      if (response.user.role === "system-admin") navigate("/dashboard/admin");
      else if (response.user.role === "normal-user") navigate("/dashboard/user");
      else if (response.user.role === "store-owner") navigate("/dashboard/owner");
      else navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <h2>Login</h2>

        <div className="form-group">
          <label>Email</label>
          <input type="email" {...register("email")} disabled={isSubmitting} />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" {...register("password")} disabled={isSubmitting} />
          <p className="error">{errors.password?.message}</p>
        </div>

        <button type="submit" disabled={isSubmitting} className="green-button">
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <p className="footer-text">
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
