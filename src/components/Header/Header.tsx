import "./Header.css";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthModal from "../AuthModal/AuthModal";
import Logo from "../../assets/images/home/logo-1.png";
import Loader from "../Loader/Loader";

function Header() {
  const { user, loading, logout } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <header className="header">
        <div
          className="logo"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <img src={Logo} alt="logo" width={140} />
          {/* <span>AgriMart</span> */}
        </div>
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <FaTimes /> : <FaBars />}
        </button>
        <nav className={`nav ${mobileMenu ? "active" : ""}`}>
          <Link to="/" onClick={() => setMobileMenu(false)}>
            Home
          </Link>

          <Link to="/AllPost" onClick={() => setMobileMenu(false)}>
            Posts
          </Link>

          <Link to="/contracts" onClick={() => setMobileMenu(false)}>
            Contracts
          </Link>

          {loading ? (
            <Loader />
          ) : user ? (
            <div className="user-nav-section">
              <button className="btn-login" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <button
                className="btn-login"
                onClick={() => {
                  setShowAuth(true);
                }}
              >
                Register
              </button>

              <button className="btn-login" onClick={() => setShowAuth(true)}>
                Login
              </button>
            </>
          )}
        </nav>
        <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
      </header>
    </>
  );
}

export default Header;
