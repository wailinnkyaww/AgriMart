import { useEffect, useState } from "react";
import "./HarvestRecords.css";

import { useAuth } from "../../../context/AuthContext";

import { getContracts } from "../../../services/contractService";
import { getHarvests } from "../../../services/harvestService";

import type { Harvest } from "../../../types/Harvest";

import HarvestCard from "../../../components/HarvestCard/HarvestCard";

const HarvestRecords = () => {
  const { user } = useAuth();

  const [harvests, setHarvests] = useState<Harvest[]>([]);
  const [loading, setLoading] = useState(true);

  const loadHarvests = async () => {
    if (!user) return;

    try {
      const contracts = await getContracts();

      const allHarvests = await getHarvests();

      const myContracts = contracts.filter(
        (contract) => contract.creator.uid === user.uid,
      );

      const contractIds = myContracts.map((contract) => contract.id);

      const buyerHarvests = allHarvests.filter((harvest) =>
        contractIds.includes(harvest.contractId),
      );

      setHarvests(buyerHarvests);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHarvests();
  }, [user]);

  if (loading) {
    return <div className="loading">Loading Harvest Records...</div>;
  }

  return (
    <div className="harvest-page">
      <div className="page-header">
        <div>
          <h1>Harvest Records</h1>
          <p>Harvest records submitted by farmers.</p>
        </div>
      </div>

      {harvests.length === 0 ? (
        <div className="empty-state">
          <h3>No Harvest Records</h3>
          <p>No farmers have submitted harvest records yet.</p>
        </div>
      ) : (
        <div className="harvest-grid">
          {harvests.map((harvest) => (
            <HarvestCard key={harvest.id} harvest={harvest} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HarvestRecords;
