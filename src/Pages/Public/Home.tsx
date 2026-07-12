import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./Home.css";

const HomePage = () => {
  return (
    <div style={styles.homeContainer}>
      {/* 1. Banner Section */}
      <section className="banner" style={styles.banner}>
        <h1>ရေရှည်တည်တံ့သော စိုက်ပျိုးရေး</h1>
        <p>နည်းပညာအသုံးပြု၍ ပိုမိုကောင်းမွန်သော အနာဂတ်ကို မြှင့်တင့်ခြင်း</p>
      </section>

      {/* 2. Product Categories (Swiper: 4 Columns) */}
      <section style={styles.section}>
        <h2>Product Categories</h2>
        <Swiper slidesPerView={4} spaceBetween={20}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SwiperSlide key={i} style={styles.card}>
              Category {i}
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 3. Farmer Section (2x2 Grid + Button) */}
      <section style={styles.section}>
        <h2>Our Farmers</h2>
        <div style={styles.farmerGrid}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={styles.card}>
              Farmer {i} Profile
            </div>
          ))}
        </div>
        <button style={styles.btn}>See All Farmers</button>
      </section>

      {/* 4. Company Section (3 Columns, Dynamic Rows) */}
      <section style={styles.section}>
        <h2>Our Company</h2>
        <div style={styles.companyGrid}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} style={styles.card}>
              Company Info {i}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const styles = {
  homeContainer: { display: "flex", flexDirection: "column", gap: "40px" },
  banner: {
    height: "300px",
    backgroundColor: "#e8f5e9",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage:
      "url('https://www.agrixchange.com/_next/image?url=https%3A%2F%2Fagrixchange.blueboxonline.com%2Fportal%2Fagrixchange%2FUserFiles%2FSysDocs%2Fbb_agrix_content%2F10000%2F1%2Ffarmerhandpic.jpg&w=1920&q=80')",
    backgroundSize: "cover",
  },
  section: { padding: "20px" },
  card: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    textAlign: "center",
  },

  // 2x2 Grid for Farmers
  farmerGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "20px",
  },

  // 3-Column Dynamic Grid for Company
  companyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  },

  btn: {
    padding: "10px 20px",
    cursor: "pointer",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
  },
} as const;

export default function Home() {
  return (
    <>
      {" "}
      <HomePage />
    </>
  );
}
