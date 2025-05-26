import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Hero from "../components/Hero";
import "./Home.css";
import eyeScan from "../assets/eye-scan.png"; // Replace with your image
// import eyeScan from "../assets/fitness-hero.png"; // Replace with your image

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <Hero />
      <div className="home">
        {/* Hero Section */}

        {/* Features Section */}
        <section className="features-section">
          <h2 className="section-title">Why Use eyeage?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🔍 Accurate Logging</h3>
              <p>Record precise left and right eye values with ease.</p>
            </div>
            <div className="feature-card">
              <h3>📊 Progress Visualization</h3>
              <p>
                View historical trends and changes in eye condition over time.
              </p>
            </div>
            <div className="feature-card">
              <h3>📤 Share with Doctor</h3>
              <p>
                Export readings and charts for consultations and follow-ups.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials or Use Case (Optional) */}
        <section className="testimonial-section">
          <h2 className="section-title">What People Say</h2>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <p>"Good collection of frames. Prices were fair too."</p>
              <span>- Ankit Luthra, Faridabad</span>
            </div>
            <div className="testimonial-card">
              <p>
                "Got my eyes tested and glasses ready in two days. Very happy."
              </p>
              <span>- Rahul Luthra, Delhi</span>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="cta-footer">
          <h2>Start Monitoring Your Eyes Today</h2>
          <p>
            No equipment needed — just record and manage readings from anywhere.
          </p>
          <Link
            to={isAuthenticated ? "/dashboard" : "/register"}
            className="btn primary large"
          >
            {isAuthenticated ? "Go to Dashboard" : "Get Started"}
          </Link>
        </section>
      </div>
    </>
  );
};

export default Home;
