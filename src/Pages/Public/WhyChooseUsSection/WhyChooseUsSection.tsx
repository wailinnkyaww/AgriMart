import "./WhyChooseUsSection.css";

const features = [
  {
    icon: "🔒",
    title: "Secure Contracts",
    description:
      "Every farming agreement is stored securely, ensuring transparency between buyers and farmers.",
  },
  {
    icon: "🌾",
    title: "Verified Farmers",
    description:
      "Connect with trusted farmers who are ready to fulfill contract farming opportunities.",
  },
  {
    icon: "🏢",
    title: "Reliable Buyers",
    description:
      "Work with registered companies and buyers looking for long-term agricultural partnerships.",
  },
  {
    icon: "💳",
    title: "Payment Tracking",
    description:
      "Monitor payments from creation to completion for better financial transparency.",
  },
  {
    icon: "📊",
    title: "Harvest Records",
    description:
      "Keep digital harvest records to monitor production and contract performance.",
  },
  {
    icon: "📱",
    title: "Easy Management",
    description:
      "Manage contracts, applications, harvests, and reports from one platform.",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="why-section">
      <div className="why-header">
        <span>WHY CHOOSE US</span>

        <h2>Everything You Need for Contract Farming</h2>

        <p>
          Our platform simplifies contract farming by connecting buyers and
          farmers in a secure and transparent environment.
        </p>
      </div>

      <div className="why-grid">
        {features.map((feature) => (
          <div className="why-card" key={feature.title}>
            <div className="why-icon">{feature.icon}</div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
