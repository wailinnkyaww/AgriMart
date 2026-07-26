import { useEffect, useState } from "react";
import "./ContractRequests.css";
import { useAuth } from "../../../context/AuthContext";
import { getContracts } from "../../../services/contractService";
import type { Contract } from "../../../types/Contract";

import RequestCard from "./RequestCard/RequestCard";
import ApplicantModal from "./ApplicantModal/ApplicantModal";
import SkeletonCard from "../../../components/Skeleton/SkeletonCard";

const ContractRequests = () => {
  const { user } = useAuth();
  const [selectedContract, setSelectedContract] = useState<Contract | null>(
    null,
  );
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);

  const loadContracts = async () => {
    try {
      const data = await getContracts();

      const buyerContracts = data.filter(
        (contract) =>
          contract.creator.uid === user?.uid &&
          contract.applicants &&
          contract.applicants.length > 0,
      );

      setContracts(buyerContracts);

      // Keep modal in sync with Firestore
      if (selectedContract) {
        const updatedContract = buyerContracts.find(
          (c) => c.id === selectedContract.id,
        );

        if (updatedContract) {
          setSelectedContract(updatedContract);
        } else {
          setSelectedContract(null);
        }
      }
    } catch (error) {
      console.error("Error loading contract requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadContracts();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="harvest-grid">
        {[1, 2, 3, 4].map((item) => (
          <SkeletonCard key={item} type="harvest" />
        ))}
      </div>
    );
  }

  return (
    <div className="contract-requests-page">
      <div className="page-header">
        <h1>Contract Requests</h1>

        <p>Manage farmer applications for your contracts.</p>
      </div>

      {contracts.length === 0 ? (
        <div className="empty-state">
          <h3>No Contract Requests</h3>

          <p>No farmers have applied to your contracts yet.</p>
        </div>
      ) : (
        <div className="request-grid">
          {contracts.map((contract) => (
            <RequestCard
              key={contract.id}
              contract={contract}
              onRefresh={loadContracts}
              onManage={setSelectedContract}
            />
          ))}
        </div>
      )}
      <ApplicantModal
        contract={selectedContract}
        onClose={() => setSelectedContract(null)}
        onRefresh={loadContracts}
      />
    </div>
  );
};

export default ContractRequests;
