import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";

import { useAuth } from "../../../context/AuthContext";

import "./VerifyEmail.css";

const VerifyEmail = () => {
  const { firebaseUser, logout } = useAuth();
  const navigate = useNavigate();

  const [sending, setSending] = useState(false);
  const [checking, setChecking] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Redirect if no user is logged in
  useEffect(() => {
    if (!firebaseUser) {
      navigate("/login");
    }
  }, [firebaseUser, navigate]);

  // Send verification email
  const handleSendVerification = async () => {
    if (!firebaseUser) return;

    try {
      setSending(true);
      setError("");
      setMessage("");

      await sendEmailVerification(firebaseUser);

      setMessage(
        "Verification email sent successfully. Please check your inbox.",
      );
    } catch (error: any) {
      console.error("Error sending verification email:", error);

      if (error.code === "auth/too-many-requests") {
        setError("Too many requests. Please wait a while before trying again.");
      } else {
        setError("Failed to send verification email. Please try again.");
      }
    } finally {
      setSending(false);
    }
  };

  // Check if email is verified
  const handleCheckVerification = async () => {
    if (!firebaseUser) return;

    try {
      setChecking(true);
      setError("");
      setMessage("");

      // Refresh Firebase user information
      await firebaseUser.reload();

      if (firebaseUser.emailVerified) {
        setMessage("Your email has been verified successfully!");

        // Redirect after verification
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setError(
          "Your email is not verified yet. Please check your email and click the verification link.",
        );
      }
    } catch (error) {
      console.error("Error checking email verification:", error);

      setError("Unable to check verification status. Please try again.");
    } finally {
      setChecking(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (!firebaseUser) {
    return null;
  }

  return (
    <div className="verify-email-page">
      <div className="verify-email-card">
        <div className="verify-email-icon">✉️</div>

        <h1>Verify Your Email</h1>

        <p className="verify-email-description">
          We have sent a verification email to:
        </p>

        <p className="user-email">{firebaseUser.email}</p>

        <p className="verify-email-info">
          Please check your inbox and click the verification link to verify your
          email address.
        </p>

        {message && <div className="verify-success">{message}</div>}

        {error && <div className="verify-error">{error}</div>}

        <div className="verify-email-actions">
          <button
            className="check-verification-btn"
            onClick={handleCheckVerification}
            disabled={checking}
          >
            {checking ? "Checking..." : "I Have Verified My Email"}
          </button>

          <button
            className="resend-verification-btn"
            onClick={handleSendVerification}
            disabled={sending}
          >
            {sending ? "Sending..." : "Resend Verification Email"}
          </button>
        </div>

        <p className="email-not-received">
          Didn't receive the email? Check your spam or junk folder.
        </p>

        <button className="logout-btn" onClick={handleLogout}>
          Use Another Account
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
