import "./Contracts.css";
import { useEffect, useState } from "react";
import { applyContract } from "../../services/applicationService";
import { useAuth } from "../../context/AuthContext";
import { getContracts } from "../../services/contractService";
import type { Contract } from "../../types/Contract";
import ContractCard from "./ContractCard/ContractCard";
import ContractFilter from "./ContractFilter/ContractFilter";
import ContractDetails from "./ContractDetails/ContractDetails";
import CreateContractModal from "./CreateContractModal/CreateContractModal";

const Contracts = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);

  // Filter States
  const [search, setSearch] = useState("");
  const [crop, setCrop] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  //contractdetails
  const { user } = useAuth();
  const [selectedContract, setSelectedContract] = useState<Contract | null>(
    null,
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const loadContracts = async () => {
    try {
      const data = await getContracts();
      setContracts(data);
    } catch (error) {
      console.error("Error fetching contracts:", error);
    }
  };

  useEffect(() => {
    loadContracts();
  }, []);

  const handleApply = async (id: string) => {
    if (!user) {
      alert("Please login before applying");
      return;
    }

    try {
      await applyContract(id, {
        userId: user.uid,
        name: user.fullName,
        role: user.role,
        status: "Pending",
        appliedAt: new Date().toISOString(),
      });

      alert("Application submitted successfully");
    } catch (error) {
      console.error("Apply contract error:", error);

      alert("Failed to apply contract");
    }
  };

  const handleView = (id: string) => {
    const contract = contracts.find((item) => item.id === id);

    if (contract) {
      setSelectedContract(contract);
    }
  };

  // Filter Logic
  const filteredContracts = contracts.filter((contract) => {
    const matchSearch =
      search === "" ||
      contract.title.toLowerCase().includes(search.toLowerCase());

    const matchCrop = crop === "" || contract.crop === crop;

    const matchStatus = status === "" || contract.status === status;

    const matchLocation =
      location === "" ||
      contract.location.toLowerCase().includes(location.toLowerCase());

    return matchSearch && matchCrop && matchStatus && matchLocation;
  });
  return (
    <div className="contracts-page">
      <div className="contracts-header">
        <h1>Available Contracts</h1>
        <p>Browse available farming contracts and apply.</p>
        <button
          className="create-contract-btn"
          onClick={() => setIsCreateModalOpen(true)}
        >
          + Create Contract
        </button>
      </div>

      <ContractFilter
        search={search}
        crop={crop}
        status={status}
        location={location}
        onSearchChange={setSearch}
        onCropChange={setCrop}
        onStatusChange={setStatus}
        onLocationChange={setLocation}
      />

      {filteredContracts.length === 0 ? (
        <div className="empty-state">
          <h2>No Contracts Found</h2>
          <p>Try changing your search or filters.</p>
        </div>
      ) : (
        <div className="contracts-grid">
          {filteredContracts.map((contract) => (
            <ContractCard
              key={contract.id}
              contract={contract}
              currentUserId={user?.uid}
              onApply={handleApply}
              onView={handleView}
              onRefresh={loadContracts}
            />
          ))}
        </div>
      )}
      <ContractDetails
        contract={selectedContract}
        onClose={() => setSelectedContract(null)}
        onApply={handleApply}
      />
      <CreateContractModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreated={loadContracts}
      />
    </div>
  );
};

export default Contracts;
