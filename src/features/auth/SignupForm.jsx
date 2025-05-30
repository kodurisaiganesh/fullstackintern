import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../../validators/signupSchema";
import { signupUser } from "./authService";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css"; // Custom auth styles

export default function SignupForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    try {
      await signupUser(data);
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <h2>Sign Up</h2>

        <div className="form-group">
          <label>Name</label>
          <input type="text" {...register("name")} disabled={isSubmitting} />
          <p className="error">{errors.name?.message}</p>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" {...register("email")} disabled={isSubmitting} />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea rows="3" {...register("address")} disabled={isSubmitting} />
          <p className="error">{errors.address?.message}</p>
        </div>

        <div className="form-group">
          <label>Role</label>
          <select {...register("role")} disabled={isSubmitting}>
            <option value="">Select Role</option>
            <option value="User">User</option>
            <option value="Store Owner">Store Owner</option>
          </select>
          <p className="error">{errors.role?.message}</p>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" {...register("password")} disabled={isSubmitting} />
          <p className="error">{errors.password?.message}</p>
        </div>

        <button type="submit" disabled={isSubmitting} className="green-button">
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>

        <p className="footer-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
