import { useEffect, useState } from "react";
import "./MyApplications.css";
import { useAuth } from "../../../context/AuthContext";
import { getContracts } from "../../../services/contractService";
import type { Contract } from "../../../types/Contract";
import ApplicationCard from "./ApplicationCard/ApplicationCard";
import ContractDetails from "../../Contracts/ContractDetails/ContractDetails";
import Loader from "../../../components/Common/Loader/Loader";

const MyApplications = () => {
  const { user } = useAuth();

  const [applications, setApplications] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(
    null,
  );

  const loadApplications = async () => {
    if (!user) return;

    try {
      const contracts = await getContracts();

      const myApplications = contracts.filter((contract) =>
        contract.applicants.some((applicant) => applicant.userId === user.uid),
      );

      setApplications(myApplications);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="my-applications-page">
      <div className="page-header">
        <h1>My Applications</h1>
        <p>Track all contracts you have applied for.</p>
      </div>

      {applications.length === 0 ? (
        <div className="empty-state">
          <h3>No Applications</h3>
          <p>You haven't applied for any contracts yet.</p>
        </div>
      ) : (
        <div className="application-grid">
          {applications.map((contract) => (
            <ApplicationCard
              key={contract.id}
              contract={contract}
              currentUserId={user.uid}
              onView={setSelectedContract}
            />
          ))}
        </div>
      )}

      <ContractDetails
        contract={selectedContract}
        onClose={() => setSelectedContract(null)}
      />
    </div>
  );
};

export default MyApplications;
