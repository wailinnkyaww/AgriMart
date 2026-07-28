import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { useAuth } from "../../../context/AuthContext";

import "./ForgotPassword.css";

const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .required("Email is required.")
    .email("Please enter a valid email address."),
});

const ForgotPassword = () => {
  const navigate = useNavigate();

  const { resetPassword } = useAuth();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMsg("");
    setSuccessMsg("");

    try {
      // Validate email
      await forgotPasswordSchema.validate({ email }, { abortEarly: true });

      setLoading(true);

      // Send Firebase password reset email
      await resetPassword(email);

      setSuccessMsg(
        "Password reset email sent successfully. Please check your inbox.",
      );

      setEmail("");
    } catch (error: any) {
      console.error("Forgot password error:", error);

      if (error instanceof yup.ValidationError) {
        setErrorMsg(error.message);
        return;
      }

      if (error.code === "auth/user-not-found") {
        setErrorMsg("No account found with this email address.");
      } else if (error.code === "auth/invalid-email") {
        setErrorMsg("Please enter a valid email address.");
      } else if (error.code === "auth/too-many-requests") {
        setErrorMsg("Too many requests. Please try again later.");
      } else {
        setErrorMsg("Failed to send password reset email. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-card">
        <div className="forgot-password-icon">🔑</div>

        <h1>Forgot Password?</h1>

        <p className="forgot-password-description">
          Enter your registered email address and we will send you a link to
          reset your password.
        </p>

        {errorMsg && <div className="forgot-error">{errorMsg}</div>}

        {successMsg && <div className="forgot-success">{successMsg}</div>}

        <form onSubmit={handleSubmit} className="forgot-password-form">
          <label htmlFor="email">Email Address</label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <button
          type="button"
          className="back-login-btn"
          onClick={() => navigate("/login")}
        >
          ← Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
