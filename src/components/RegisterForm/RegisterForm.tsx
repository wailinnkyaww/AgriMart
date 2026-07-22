import React, { useState } from "react";
import "./RegisterForm.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
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
    .matches(/^(?!\s*$).+$/, "Full name cannot be empty or only spaces.")
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

  // Form states
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

  const handleRoleSelect = (selectedRole: "Buyer" | "Farmer") => {
    setRole(selectedRole);
    setStep("register");
    setErrorMsg("");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMsg("");
    setSuccessMsg("");

    try {
      // Validate form data using Yup
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

      setRegLoading(true);

      await register(email, password, fullName, role!, phone);

      setSuccessMsg("Registration successful! Redirecting...");

      setTimeout(() => {
        onSuccess?.();

        if (role === "Buyer") {
          navigate("/buyer/dashboard");
        } else {
          navigate("/farmer/dashboard");
        }
      }, 1000);
    } catch (err: any) {
      // Yup validation error
      if (err instanceof yup.ValidationError) {
        setErrorMsg(err.message);
        return;
      }

      // Firebase registration error
      console.error(err);

      let message = "Failed to register. Please try again.";

      if (err.code === "auth/email-already-in-use") {
        message = "This email is already registered.";
      } else if (err.code === "auth/invalid-email") {
        message = "Invalid email address format.";
      } else if (err.response?.data?.message) {
        message = err.response.data.message;
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
      {step === "selection" && (
        <div className="selection-card">
          <h1>Welcome!</h1>
          <p>Please choose your role:</p>

          <div className="role-buttons">
            <button
              onClick={() => handleRoleSelect("Buyer")}
              className="buyer-btn"
            >
              I am a Buyer
            </button>

            <button
              onClick={() => handleRoleSelect("Farmer")}
              className="farmer-btn"
            >
              I am a Farmer
            </button>
          </div>
        </div>
      )}

      {step === "register" && (
        <div className="register-card">
          <h2>Register as {role}</h2>

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

          <form className="register-form" onSubmit={handleRegister}>
            <label htmlFor="fullname">
              {role === "Buyer" ? "Company / Full Name" : "Full Name"}
            </label>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={regLoading}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={regLoading}
              required
            />

            <label htmlFor="phone">Phone (Optional)</label>
            <input
              type="text"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={regLoading}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={regLoading}
              required
            />

            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={regLoading}
              required
            />

            <label className="checkbox-group">
              <input type="checkbox" required disabled={regLoading} />
              <span>I agree to the terms</span>
            </label>

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
          <p className="register-text">
            Already have an account?{" "}
            <button
              type="button"
              className="register-link"
              onClick={onSwitchLogin}
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
