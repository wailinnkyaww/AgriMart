import { useEffect, useState } from "react";
import "./CompanySection.css";

import type { User } from "../../../types/User";
import { getBuyers } from "../../../services/userService";

const CompanySection = () => {
  const [buyers, setBuyers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBuyers();
  }, []);

  const loadBuyers = async () => {
    try {
      const data = await getBuyers();
      setBuyers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="company-section">
        <h2>Featured Companies</h2>
        <p>Loading companies...</p>
      </section>
    );
  }

  return (
    <section className="company-section">
      <div className="section-header">
        <h2>Our Companies</h2>
        <p>Trusted buyers working with farmers across Myanmar.</p>
      </div>

      <div className="company-grid">
        {buyers.map((buyer) => (
          <div className="company-card" key={buyer.uid}>
            <img
              src={
                buyer.profileImage ||
                "https://placehold.co/300x300?text=Company"
              }
              alt={buyer.fullName}
            />

            <h3>{buyer.fullName}</h3>

            <span className="company-role">🏢 Buyer</span>

            <p>{buyer.email}</p>

            <div className="verified">✔ Verified Company</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompanySection;
