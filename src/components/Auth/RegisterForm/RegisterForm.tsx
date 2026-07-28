import React, { useState } from "react";
import "./RegisterForm.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import * as yup from "yup";

interface Props {
  onSuccess?: () => void;
  onSwitchLogin?: () => void;
}

export const registerSchema = yup.object({
  role: yup
    .string()
    .oneOf(["Buyer", "Farmer"], "Please select a valid role.")
    .required("Please select a role first."),

  fullName: yup
    .string()
    .required("Full name is required.")
    .matches(/^[A-Za-z\s]+$/, "Full name must contain only letters and spaces.")
    .min(2, "Full name must be at least 2 characters."),

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

  confirmPassword: yup
    .string()
    .required("Please confirm your password.")
    .oneOf([yup.ref("password")], "Passwords do not match."),

  phone: yup
    .string()
    .required("Phone number is required.")
    .matches(
      /^09\d{9}$/,
      "Phone number must be exactly 11 digits and start with 09.",
    ),
});

const RegisterForm = ({ onSuccess, onSwitchLogin }: Props) => {
  const [step, setStep] = useState<"selection" | "register">("selection");

  const [role, setRole] = useState<"Buyer" | "Farmer" | null>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [regLoading, setRegLoading] = useState(false);

  const { register } = useAuth();

  const navigate = useNavigate();

  // ========================================
  // SELECT ROLE
  // ========================================

  const handleRoleSelect = (selectedRole: "Buyer" | "Farmer") => {
    setRole(selectedRole);
    setStep("register");
    setErrorMsg("");
    setSuccessMsg("");
  };

  // ========================================
  // REGISTER
  // ========================================

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMsg("");
    setSuccessMsg("");

    try {
      // ====================================
      // VALIDATE FORM
      // ====================================

      await registerSchema.validate(
        {
          role,
          fullName,
          email,
          password,
          confirmPassword,
          phone,
        },
        {
          abortEarly: true,
        },
      );

      // ====================================
      // START LOADING
      // ====================================

      setRegLoading(true);

      // ====================================
      // CREATE ACCOUNT
      // ====================================

      await register(email, password, fullName, role!, phone);

      // ====================================
      // EMAIL VERIFICATION MESSAGE
      // ====================================

      setSuccessMsg(
        "Registration successful! A verification email has been sent to your email address. Please verify your email before logging in.",
      );

      // ====================================
      // CLEAR FORM
      // ====================================

      setPassword("");
      setConfirmPassword("");

      // ====================================
      // GO TO LOGIN
      // ====================================

      setTimeout(() => {
        onSuccess?.();

        navigate("/login");
      }, 3000);
    } catch (err: any) {
      // ====================================
      // YUP VALIDATION ERROR
      // ====================================

      if (err instanceof yup.ValidationError) {
        setErrorMsg(err.message);

        return;
      }

      // ====================================
      // FIREBASE ERROR
      // ====================================

      console.error("Registration error:", err);

      let message = "Failed to register. Please try again.";

      if (err.code === "auth/email-already-in-use") {
        message = "This email is already registered.";
      } else if (err.code === "auth/invalid-email") {
        message = "Invalid email address format.";
      } else if (err.code === "auth/weak-password") {
        message = "Password is too weak.";
      } else if (err.message) {
        message = err.message;
      }

      setErrorMsg(message);
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <div className="register-container">
      {/* ========================================
          ROLE SELECTION
      ======================================== */}

      {step === "selection" && (
        <div className="role-selection">
          <h2>Welcome!</h2>

          <p>Please choose your role:</p>

          <div className="role-buttons">
            <button
              type="button"
              onClick={() => handleRoleSelect("Buyer")}
              className="buyer-btn"
            >
              I am a Buyer
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect("Farmer")}
              className="farmer-btn"
            >
              I am a Farmer
            </button>
          </div>
        </div>
      )}

      {/* ========================================
          REGISTRATION FORM
      ======================================== */}

      {step === "register" && (
        <div className="register-card">
          <h2>Register as {role}</h2>

          {/* ERROR MESSAGE */}

          {errorMsg && (
            <div
              className="error-message"
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

          {/* SUCCESS MESSAGE */}

          {successMsg && (
            <div
              className="success-message"
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

          <form className="register-form" onSubmit={handleRegister}>
            {/* FULL NAME */}

            <label htmlFor="fullname">
              {role === "Buyer" ? "Company / Full Name" : "Full Name"}
            </label>

            <input
              id="fullname"
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={regLoading}
              required
            />

            {/* EMAIL */}

            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={regLoading}
              required
            />

            {/* PHONE */}

            <label htmlFor="phone">Phone</label>

            <input
              id="phone"
              type="text"
              placeholder="09xxxxxxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={regLoading}
              required
            />

            {/* PASSWORD */}

            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={regLoading}
              required
            />

            {/* CONFIRM PASSWORD */}

            <label htmlFor="confirm-password">Confirm Password</label>

            <input
              id="confirm-password"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={regLoading}
              required
            />

            {/* TERMS */}

            <label className="checkbox-group">
              <input type="checkbox" required disabled={regLoading} />

              <span>I agree to the terms</span>
            </label>

            {/* BUTTONS */}

            <div className="form-buttons">
              <button
                type="button"
                className="back-btn"
                onClick={() => setStep("selection")}
                disabled={regLoading}
              >
                Back
              </button>

              <button
                type="submit"
                className="register-btn"
                disabled={regLoading}
              >
                {regLoading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>

          {/* LOGIN */}

          <p className="register-text">
            Already have an account?{" "}
            <button
              type="button"
              className="register-link"
              onClick={onSwitchLogin}
              disabled={regLoading}
            >
              Login
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
