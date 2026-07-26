import "./AboutSection.css";

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="about-image">
        <img
          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=900"
          alt="Contract Farming"
        />
      </div>

      <div className="about-content">
        <span className="section-tag">ABOUT US</span>

        <h2>Smart Contract Farming Platform</h2>

        <p>
          Our Contract Farming System connects farmers and buyers through a
          secure digital platform. Buyers can publish farming contracts while
          farmers apply for suitable opportunities, creating transparent and
          reliable agricultural partnerships.
        </p>

        <div className="about-features">
          <div className="feature-item">✅ Secure Contract Agreements</div>

          <div className="feature-item">✅ Verified Farmers & Buyers</div>

          <div className="feature-item">✅ Harvest Record Management</div>

          <div className="feature-item">✅ Digital Payment Tracking</div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
