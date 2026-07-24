import { useEffect, useState } from "react";
import "./SendContractModal.css";

import { useAuth } from "../../../context/AuthContext";
import { getContracts } from "../../../services/contractService";
import { sendContractProposal } from "../../../services/contractProposalService";

import type { Contract } from "../../../types/Contract";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  farmerId: string;
  farmerName: string;
  postId: string;
  onSent?: () => void;
}

const SendContractModal = ({
  isOpen,
  onClose,
  farmerId,
  farmerName,
  postId,
  onSent,
}: Props) => {
  const { user } = useAuth();

  const [contracts, setContracts] = useState<Contract[]>([]);
  const [selectedContractId, setSelectedContractId] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingContracts, setLoadingContracts] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      loadContracts();
    }
  }, [isOpen, user]);

  const loadContracts = async () => {
    if (!user) return;

    try {
      setLoadingContracts(true);

      const data = await getContracts();

      // Only show contracts created by this buyer
      // and that are still available to send
      const myContracts = data.filter(
        (contract) =>
          contract.creator?.uid === user.uid && contract.status === "Open",
      );

      setContracts(myContracts);
    } catch (error) {
      console.error("Error loading contracts:", error);
    } finally {
      setLoadingContracts(false);
    }
  };

  const handleSendContract = async () => {
    if (!user) {
      alert("Please login first.");
      return;
    }

    if (!selectedContractId) {
      alert("Please select a contract.");
      return;
    }

    const selectedContract = contracts.find(
      (contract) => contract.id === selectedContractId,
    );

    if (!selectedContract) {
      alert("Contract not found.");
      return;
    }

    try {
      setLoading(true);

      await sendContractProposal({
        contractId: selectedContract.id,
        postId,
        buyerId: user.uid,
        buyerName: user.fullName,
        farmerId,
        farmerName,
        status: "Pending",
        createdAt: new Date().toISOString(),
      });

      alert("Contract sent to farmer successfully.");

      setSelectedContractId("");

      onSent?.();
      onClose();
    } catch (error) {
      console.error("Error sending contract:", error);
      alert("Failed to send contract.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="send-contract-overlay">
      <div className="send-contract-modal">
        <button className="close-modal-btn" onClick={onClose}>
          ×
        </button>

        <h2>Send Contract</h2>

        <p className="farmer-info">
          Send a contract proposal to <strong>{farmerName}</strong>
        </p>

        <div className="form-group">
          <label>Select Your Contract</label>

          {loadingContracts ? (
            <p>Loading contracts...</p>
          ) : contracts.length === 0 ? (
            <div className="no-contracts">
              <p>You don't have any open contracts.</p>
            </div>
          ) : (
            <select
              value={selectedContractId}
              onChange={(e) => setSelectedContractId(e.target.value)}
              disabled={loading}
            >
              <option value="">Select a contract</option>

              {contracts.map((contract) => (
                <option key={contract.id} value={contract.id}>
                  {contract.title} - {contract.crop} - {contract.quantity} KG
                </option>
              ))}
            </select>
          )}
        </div>

        {selectedContractId && (
          <div className="selected-contract">
            {(() => {
              const contract = contracts.find(
                (item) => item.id === selectedContractId,
              );

              if (!contract) return null;

              return (
                <>
                  <h3>{contract.title}</h3>

                  <p>
                    <strong>Crop:</strong> {contract.crop}
                  </p>

                  <p>
                    <strong>Quantity:</strong> {contract.quantity} KG
                  </p>

                  <p>
                    <strong>Price:</strong> {contract.price}
                  </p>

                  <p>
                    <strong>Location:</strong> {contract.location}
                  </p>

                  <p>
                    <strong>Delivery Date:</strong> {contract.deliveryDate}
                  </p>
                </>
              );
            })()}
          </div>
        )}

        <div className="send-contract-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="button"
            className="send-btn"
            onClick={handleSendContract}
            disabled={loading || loadingContracts || contracts.length === 0}
          >
            {loading ? "Sending..." : "Send Contract"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendContractModal;
