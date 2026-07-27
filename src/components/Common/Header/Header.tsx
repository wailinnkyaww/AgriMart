import "./Header.css";
import NotificationModal from "../../Modals/NotificationModal/NotificationModal";
import { useState } from "react";
import { FaBars, FaBell, FaCog } from "react-icons/fa";
import { VscSignOut } from "react-icons/vsc";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../../assets/images/home/logo-2.png";
import { useAuth } from "../../../context/AuthContext";
import AuthModal from "../../Auth/AuthModal/AuthModal";
import Loader from "../Loader/Loader";

interface Props {
  toggleSidebar?: () => void;
}

function Header({ toggleSidebar }: Props) {
  const { user, loading, logout } = useAuth();
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();
  const [showMobileLinks, setShowMobileLinks] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const handleLogout = async () => {
    await logout();

    navigate("/");
  };

  return (
    <header className="header">
      {/* LEFT SECTION */}
      <div className="header-left">
        <button className="menu-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>

        <div className="logo" onClick={() => navigate("/")}>
          <img src={Logo} alt="Logo image" width={160} height={50} />
        </div>
      </div>

      {/* CENTER SECTION */}
      <nav className="header-center">
        <Link to="/">Home</Link>

        <Link to="/all-posts">Posts</Link>

        <Link to="/contracts">Contracts</Link>
      </nav>

      {/* RIGHT SECTION */}
      <div className="header-right">
        {loading ? (
          <span>loading ...</span>
        ) : // <Loader />
        user ? (
          <>
            {/* <span className="username">{user.fullName}</span> */}
            <button
              className="notification-btn"
              onClick={() => {
                setShowNotification(true);
              }}
            >
              <FaBell />
            </button>
            <button className="logout-btn pc-logout" onClick={handleLogout}>
              <VscSignOut size={16} /> Logout
            </button>
            <div className="mobile-settings">
              <button
                className="settings-btn"
                onClick={() => setShowMobileLinks(!showMobileLinks)}
              >
                <FaCog />
              </button>

              {showMobileLinks && (
                <div className="mobile-settings-menu">
                  <Link to="/" onClick={() => setShowMobileLinks(false)}>
                    Home
                  </Link>

                  <Link
                    to="/all-posts"
                    onClick={() => setShowMobileLinks(false)}
                  >
                    Posts
                  </Link>

                  <Link
                    to="/contracts"
                    onClick={() => setShowMobileLinks(false)}
                  >
                    Contracts
                  </Link>
                  <button className="mb-logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <button
              className="create-btn"
              onClick={() => {
                setAuthMode("register");
                setShowAuth(true);
              }}
            >
              Register
            </button>

            <button
              className="create-btn"
              onClick={() => {
                setAuthMode("login");
                setShowAuth(true);
              }}
            >
              Login
            </button>
          </>
        )}
      </div>

      <AuthModal
        open={showAuth}
        onClose={() => setShowAuth(false)}
        initialMode={authMode}
      />
      <NotificationModal
        open={showNotification}
        onClose={() => {
          setShowNotification(false);
        }}
      />
    </header>
  );
}

export default Header;
