import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { FaPowerOff } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setmenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMobileMenu = () => setmenuOpen(!menuOpen);
  const closeMobileMenu = () => setmenuOpen(false);
  const handleLinkClick = () => setmenuOpen(false);

  const getDisplayName = () => {
    if (!user) return "User";
    if (user.firstName || user.lastName)
      return `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
    if (user.fullName) return user.fullName;
    if (user.username) return user.username;
    if (user.email) return user.email.split("@")[0];
    return "User";
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <Link className="logolink" to="/" onClick={handleLinkClick}>
          <img
            src="/images/logo/logo3.png"
            alt="Eduquant Logo"
            className="logo-image"
          />
          <span className="logo-text">eyeage</span>
        </Link>
      </div>

      {/* Burger Icon */}
      <div
        className={`burger ${menuOpen ? "toggle" : ""}`}
        onClick={toggleMobileMenu}
      >
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>

      {/* Mobile Nav Menu */}
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        {isAuthenticated ? (
          <>
            <span className="nav-item nav-user">Hi, {getDisplayName()}</span>
            <Link
              to="/dashboard"
              className="nav-item"
              onClick={closeMobileMenu}
            >
              Dashboard
            </Link>

            <button
              className="nav-logout icon-only"
              onClick={() => {
                logout();
                closeMobileMenu();
                navigate("/");
              }}
              title="Logout"
              aria-label="Logout"
            >
              <FaPowerOff size={24} />
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-item" onClick={closeMobileMenu}>
              Login
            </Link>
            <Link to="/register" className="nav-item" onClick={closeMobileMenu}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
