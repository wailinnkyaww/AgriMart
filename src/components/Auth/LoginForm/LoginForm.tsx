import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import "./Login.css";
import { useAuth } from "../../../context/AuthContext";

interface Props {
  onSuccess?: () => void;
  onSwitchRegister?: () => void;
}

const LoginForm = ({ onSuccess, onSwitchRegister }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const loginSchema = yup.object({
    email: yup
      .string()
      .required("Email is required.")
      .matches(
        /^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "Email must start with a letter and be a valid email address.",
      ),

    password: yup
      .string()
      .required("Password is required.")
      .min(6, "Password must be at least 6 characters."),
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMsg("");
    setSuccessMsg("");

    try {
      // Validate login form using Yup
      await loginSchema.validate(
        {
          email,
          password,
        },
        {
          abortEarly: true,
        },
      );

      setLoginLoading(true);

      const userProfile = await login(email, password);

      setSuccessMsg("Logged in successfully! Redirecting...");

      setTimeout(() => {
        onSuccess?.();

        if (userProfile.role === "Buyer") {
          localStorage.setItem("user_Id", userProfile.uid);

          localStorage.setItem("user_Role", "Buyer");

          navigate("/buyer/dashboard");
        } else if (userProfile.role === "Farmer") {
          localStorage.setItem("user_Id", userProfile.uid);

          localStorage.setItem("user_Role", "Farmer");

          navigate("/farmer/dashboard");
        }
      }, 1000);
    } catch (err: any) {
      // Yup validation error
      if (err instanceof yup.ValidationError) {
        setErrorMsg(err.message);
        return;
      }

      // Firebase authentication error
      console.error(err);

      let message = "Invalid email or password.";

      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        message = "Incorrect email or password.";
      } else if (err.code === "auth/invalid-credential") {
        message = "Invalid login credentials.";
      } else if (err.response?.data?.message) {
        message = err.response.data.message;
      } else if (err.message) {
        message = err.message;
      }
      setErrorMsg(message);
    } finally {
      setLoginLoading(false);
    }
  };
  return (
    <div className="login-card">
      <h2 className="login-title">Login</h2>

      {errorMsg && (
        <div
          style={{
            color: "#ef4444",
            backgroundColor: "#fee2e2",
            padding: "10px",
            borderRadius: "6px",
            margin: "10px 0",
            fontSize: "14px",
            border: "1px solid #fca5a5",
          }}
        >
          {errorMsg}
        </div>
      )}
      {successMsg && (
        <div
          style={{
            color: "#16a34a",
            backgroundColor: "#dcfce7",
            padding: "10px",
            borderRadius: "6px",
            margin: "10px 0",
            fontSize: "14px",
            border: "1px solid #86efac",
          }}
        >
          {successMsg}
        </div>
      )}

      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loginLoading}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loginLoading}
            required
          />
        </div>
        <div className="forgot-password-link">
          <button
            type="button"
            onClick={(e) => {
              navigate("forgot-password");
              onSuccess = { onClose };
            }}
          >
            Forgot Password?
          </button>
        </div>

        <button type="submit" className="login-btn" disabled={loginLoading}>
          {loginLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="register-text">
        Don't have an account?{" "}
        <button
          type="button"
          className="register-link"
          onClick={onSwitchRegister}
        >
          Register
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
