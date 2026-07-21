import { useState } from "react";

import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";

import "./AuthModal.css";

interface Props {
  open: boolean;
  onClose: () => void;
}

const AuthModal = ({ open, onClose }: Props) => {
  const [mode, setMode] = useState<"login" | "register">("login");

  if (!open) return null;

  return (
    <div className="auth-overlay">
      <div className="auth-modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        {mode === "login" ? (
          <LoginForm
            onSuccess={onClose}
            onSwitchRegister={() => setMode("register")}
          />
        ) : (
          <RegisterForm
            onSuccess={onClose}
            onSwitchLogin={() => setMode("login")}
          />
        )}
      </div>
    </div>
  );
};

export default AuthModal;
