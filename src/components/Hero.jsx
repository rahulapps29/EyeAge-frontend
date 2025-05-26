import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import eyeScan from "../assets/eye-scan.png"; // Ensure your image file is correctly named and placed
import "./Hero.css";

const Hero = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div>
      <section className="hero-section">
        <div className="hero-left">
          <h1 className="main-heading">
            Monitor Your Eye Health <span className="highlight">Smartly</span>
          </h1>
          <p className="hero-subtext">
            eyeage helps you track left and right eye readings with precision
            and visualize changes over time.
          </p>

          <div className="cta-buttons">
            {!isAuthenticated ? (
              <>
                <Link to="/register" className="btn primary">
                  Create Account
                </Link>
                <Link to="/login" className="btn secondary">
                  Login
                </Link>
              </>
            ) : (
              <Link to="/dashboard" className="btn primary">
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>

        <div className="hero-right">
          <img src={eyeScan} alt="Eye Health Monitoring" className="hero-img" />
        </div>
      </section>
    </div>
  );
};

export default Hero;
