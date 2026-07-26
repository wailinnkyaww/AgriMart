import "./HowItWorksSection.css";

const steps = [
  {
    number: "01",
    icon: "📝",
    title: "Buyer Creates Contract",
    description:
      "Buyers publish farming contracts with crop type, quantity, location, price, and requirements.",
  },
  {
    number: "02",
    icon: "👨‍🌾",
    title: "Farmer Applies",
    description:
      "Farmers browse available contracts and submit applications for suitable opportunities.",
  },
  {
    number: "03",
    icon: "🤝",
    title: "Application Review",
    description:
      "The buyer reviews all applications and selects the most suitable farmer for the contract.",
  },
  {
    number: "04",
    icon: "🌾",
    title: "Harvest Management",
    description:
      "The selected farmer records harvest information and tracks farming progress.",
  },
  {
    number: "05",
    icon: "💳",
    title: "Payment",
    description:
      "After successful delivery, buyers create payment records and farmers receive payment confirmation.",
  },
  {
    number: "06",
    icon: "📊",
    title: "Reports & Completion",
    description:
      "Both buyers and farmers can monitor completed contracts and view reports.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="how-section">
      <div className="how-header">
        <span>PROCESS</span>

        <h2>How Our Platform Works</h2>

        <p>
          A simple and transparent workflow connecting buyers and farmers from
          contract creation to successful completion.
        </p>
      </div>

      <div className="timeline">
        {steps.map((step) => (
          <div className="timeline-card" key={step.number}>
            <div className="step-number">{step.number}</div>

            <div className="step-icon">{step.icon}</div>

            <h3>{step.title}</h3>

            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
