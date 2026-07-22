import "./Footer.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/images/home/logo-2.png";

const Footer = () => {
  const year = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <div className="logo" onClick={() => navigate("/")}>
            <img src={Logo} alt="Logo image" width={160} height={65} />
          </div>

          <p>
            Connecting farmers and buyers through a secure and transparent
            digital contract farming platform.
          </p>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/contracts">Contract</Link>
          {/* <Link to="/login">Login</Link>
          <Link to="/register">Register</Link> */}
        </div>

        <div className="footer-column">
          <h3>Features</h3>

          <p>Contract Management</p>
          <p>Harvest Records</p>
          <p>Payments</p>
          <p>Reports</p>
        </div>

        <div className="footer-column">
          <h3>Contact</h3>

          <p>📍 Yangon, Myanmar</p>
          <p>📞 +95 9 123 456 789</p>
          <p>📧 support@contractfarming.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {year} Contract Farming System. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
