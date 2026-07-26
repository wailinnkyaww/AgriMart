import { useEffect, useState } from "react";
import "./StatsSection.css";

import { getUserCount } from "../../../services/userService";
import {
  getContractCount,
  getCompletedContractCount,
} from "../../../services/contractService";

const StatsSection = () => {
  const [stats, setStats] = useState({
    farmers: 0,
    buyers: 0,
    contracts: 0,
    completed: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [farmers, buyers, contracts, completed] = await Promise.all([
        getUserCount("farmer"),
        getUserCount("buyer"),
        getContractCount(),
        getCompletedContractCount(),
      ]);

      setStats({
        farmers,
        buyers,
        contracts,
        completed,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="stats-section">
      <div className="stats-header">
        <h2>Platform Statistics</h2>
        <p>Real-time information from our farming platform.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h1>👨‍🌾</h1>
          <h2>{stats.farmers}</h2>
          <p>Farmers</p>
        </div>

        <div className="stat-card">
          <h1>🏢</h1>
          <h2>{stats.buyers}</h2>
          <p>Buyers</p>
        </div>

        <div className="stat-card">
          <h1>📄</h1>
          <h2>{stats.contracts}</h2>
          <p>Contracts</p>
        </div>

        <div className="stat-card">
          <h1>🤝</h1>
          <h2>{stats.completed}</h2>
          <p>Completed</p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
