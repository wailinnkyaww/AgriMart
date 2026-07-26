import "./CategorySection.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const categories = [
  {
    id: 1,
    name: "Rice",
    icon: "🌾",
    description: "High quality rice contracts",
  },
  {
    id: 2,
    name: "Corn",
    icon: "🌽",
    description: "Corn farming opportunities",
  },
  {
    id: 3,
    name: "Tomato",
    icon: "🍅",
    description: "Fresh tomato production",
  },
  {
    id: 4,
    name: "Onion",
    icon: "🧅",
    description: "Commercial onion farming",
  },
  {
    id: 5,
    name: "Potato",
    icon: "🥔",
    description: "Potato cultivation",
  },
  {
    id: 6,
    name: "Beans",
    icon: "🫘",
    description: "Bean production contracts",
  },
];

const CategorySection = () => {
  return (
    <section className="category-section">
      <div className="section-title">
        <h2>Product Categories</h2>

        <p>Browse agricultural products available for contract farming.</p>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
        }}
        loop
        spaceBetween={25}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          576: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <div className="category-card">
              <div className="category-icon">{category.icon}</div>

              <h3>{category.name}</h3>

              <p>{category.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CategorySection;
