import { useEffect, useState } from "react";
import "./FarmerSection.css";

import type { User } from "../../../types/User";
import { getFarmers } from "../../../services/userService";

const FarmerSection = () => {
  const [farmers, setFarmers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFarmers();
  }, []);

  const loadFarmers = async () => {
    try {
      const data = await getFarmers();
      setFarmers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="farmer-section">
        <h2>Featured Farmers</h2>
        <p>Loading farmers...</p>
      </section>
    );
  }

  return (
    <section className="farmer-section">
      <div className="section-header">
        <h2>Featured Farmers</h2>
        <p>Meet experienced farmers on our platform.</p>
      </div>

      <div className="farmer-grid">
        {farmers.map((farmer) => (
          <div className="farmer-card" key={farmer.uid}>
            <img
              src={
                farmer.profileImage ||
                "https://placehold.co/300x300?text=Farmer"
              }
              alt={farmer.fullName}
            />

            <h3>{farmer.fullName}</h3>

            <span className="role">🌾 Farmer</span>

            <p>{farmer.email}</p>

            <button>View Profile</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FarmerSection;
