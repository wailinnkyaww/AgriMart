import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setLoginLoading(true);
    try {
      const userProfile = await login(email, password);
      setSuccessMsg("Logged in successfully! Redirecting...");
      setTimeout(() => {
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

        <button type="submit" className="login-btn" disabled={loginLoading}>
          {loginLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="register-text">
        Don't have an account?{" "}
        <Link className="register-link" to="/register">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
