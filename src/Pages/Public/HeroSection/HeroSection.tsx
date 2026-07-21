import "./HeroSection.css";

import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useState } from "react";
import AuthModal from "../../../components/AuthModal/AuthModal";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600",
    title: "Smart Contract Farming Platform",
    subtitle:
      "Connecting buyers and farmers through a secure and transparent digital farming ecosystem.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600",
    title: "Empowering Myanmar Agriculture",
    subtitle:
      "Helping farmers access reliable buyers and helping companies find trusted farming partners.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=1600",
    title:
      //" ပိုမိုကောင်းမွန်စွာ ကြီးထွားတိုးတက်ကြပါစို့",
      "Grow Better Together",
    subtitle:
      // "စာချုပ်များ၊ ရိတ်သိမ်းမှုများ၊ ငွေပေးချေမှုများနှင့် မိတ်ဖက်ပူးပေါင်းဆောင်ရွက်မှုများကို ပလက်ဖောင်းတစ်ခုတည်းတွင် စီမံခန့်ခွဲပါ",
      "Manage contracts, harvests, payments and partnerships in one platform.",
  },
];

const HeroSection = () => {
  const [showAuth, setShowAuth] = useState(false);

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

                  <div className="hero-buttons">
                    <button
                      className="hero-btn-register"
                      onClick={() => {
                        setShowAuth(true);
                      }}
                    >
                      Register
                    </button>

                    <button
                      className="hero-btn-login"
                      onClick={() => setShowAuth(true)}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
    </section>
  );
};

export default HeroSection;
