import "./Home.css";
import HeroSection from "./HeroSection/HeroSection";
import CategorySection from "./CategorySection/CategorySection";
import FarmerSection from "./FarmerSection/FarmerSection";
import CompanySection from "./CompanySection/CompanySection";
import AboutSection from "./AboutSection/AboutSection";
import WhyChooseUsSection from "./WhyChooseUsSection/WhyChooseUsSection";
import StatsSection from "./StatsSection/StatsSection";
import HowItWorksSection from "./HowItWorksSection/HowItWorksSection";
import ContactSection from "./ContactSection/ContactSection";

const Home = () => {
  return (
    <div className="main-home-page">
      <HeroSection />
      <CategorySection />
      <FarmerSection />
      <CompanySection />
      <AboutSection />
      <WhyChooseUsSection />
      <StatsSection />
      <HowItWorksSection />
      <ContactSection />
    </div>
  );
};

export default Home;
