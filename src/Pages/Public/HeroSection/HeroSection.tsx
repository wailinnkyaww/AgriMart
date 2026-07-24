import "./HeroSection.css";
import { useAuth } from "../../../context/AuthContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useState } from "react";
import AuthModal from "../../../components/Auth/AuthModal/AuthModal";
import Hero_01 from "../../../assets/images/home/hero_01.jpg";
import Hero_02 from "../../../assets/images/home/hero_02.jpg";
import Hero_03 from "../../../assets/images/home/hero_03.jpg";

const slides = [
  {
    id: 1,
    image: Hero_01,
    title: "Smart Contract Farming Platform",
    subtitle:
      "Connecting buyers and farmers through a secure and transparent digital farming ecosystem.",
  },
  {
    id: 2,
    image: Hero_02,
    title: "Empowering Myanmar Agriculture",
    subtitle:
      "Helping farmers access reliable buyers and helping companies find trusted farming partners.",
  },
  {
    id: 3,
    image: Hero_03,
    title:
      //" ပိုမိုကောင်းမွန်စွာ ကြီးထွားတိုးတက်ကြပါစို့",
      "Grow Better Together",
    subtitle:
      // "စာချုပ်များ၊ ရိတ်သိမ်းမှုများ၊ ငွေပေးချေမှုများနှင့် မိတ်ဖက်ပူးပေါင်းဆောင်ရွက်မှုများကို ပလက်ဖောင်းတစ်ခုတည်းတွင် စီမံခန့်ခွဲပါ",
      "Manage contracts, harvests, post and partnerships in one platform.Lets create strong market and wealthy together",
  },
];

const HeroSection = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const { user } = useAuth();
  return (
    <section className="hero-section">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="hero-slide"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="hero-overlay">
                <div className="hero-content">
                  <span className="hero-badge">
                    🌾 Contract Farming Platform
                  </span>

                  <h1>{slide.title}</h1>
                  <p>{slide.subtitle}</p>

                  {!user && (
                    <div className="hero-buttons">
                      <button
                        className="hero-btn-register"
                        onClick={() => {
                          setAuthMode("register");
                          setShowAuth(true);
                        }}
                      >
                        Get Start
                      </button>

                      <button
                        className="hero-btn-login"
                        onClick={() => {
                          setAuthMode("login");
                          setShowAuth(true);
                        }}
                      >
                        Login
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <AuthModal
        open={showAuth}
        onClose={() => setShowAuth(false)}
        initialMode={authMode}
      />
    </section>
  );
};

export default HeroSection;
