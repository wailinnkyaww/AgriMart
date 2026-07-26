import { useEffect, useState } from "react";
import "./ContractProposals.css";

import { useAuth } from "../../../context/AuthContext";

import {
  getFarmerProposals,
  acceptContractProposal,
  rejectContractProposal,
} from "../../../services/contractProposalService";

import { getContracts } from "../../../services/contractService";

import type { ContractProposal } from "../../../types/ContractProposal";
import type { Contract } from "../../../types/Contract";

import ContractDetails from "../../Contracts/ContractDetails/ContractDetails";
import Loader from "../../../components/Common/Loader/Loader";
// Change this import path to your actual ContractDetails location.

const ContractProposals = () => {
  const { user } = useAuth();

  const [proposals, setProposals] = useState<ContractProposal[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);

  const [loading, setLoading] = useState(true);

  // Contract selected for View Details
  const [selectedContract, setSelectedContract] = useState<Contract | null>(
    null,
  );

  // Accept / Reject loading
  const [processingId, setProcessingId] = useState<string | null>(null);

  // ========================================
  // Load Proposals and Contracts
  // ========================================

  const loadData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Get proposals sent to this farmer
      const proposalData = await getFarmerProposals(user.uid);

      // Get actual contracts from Firebase
      const contractData = await getContracts();

      setProposals(proposalData);
      setContracts(contractData);
    } catch (error) {
      console.error("Error loading contract proposals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  // ========================================
  // View Contract Details
  // ========================================

  const handleViewDetails = (contract: Contract) => {
    setSelectedContract(contract);
  };

  // ========================================
  // Accept Contract Proposal
  // ========================================

  const handleAccept = async (proposal: ContractProposal) => {
    if (!user) return;

    const contract = contracts.find((item) => item.id === proposal.contractId);

    if (!contract) {
      alert("Original contract could not be found.");
      return;
    }

    const confirmAccept = window.confirm(
      `Are you sure you want to accept "${contract.title}"?`,
    );

    if (!confirmAccept) return;

    try {
      setProcessingId(proposal.id);

      await acceptContractProposal(proposal.id, proposal.contractId, user.uid);

      alert("Contract accepted successfully.");

      // Refresh proposals and contracts
      await loadData();
    } catch (error) {
      console.error("Error accepting contract proposal:", error);

      alert("Failed to accept contract.");
    } finally {
      setProcessingId(null);
    }
  };

  // ========================================
  // Reject Contract Proposal
  // ========================================

  const handleReject = async (proposal: ContractProposal) => {
    const confirmReject = window.confirm(
      "Are you sure you want to reject this contract proposal?",
    );

    if (!confirmReject) return;

    try {
      setProcessingId(proposal.id);

      await rejectContractProposal(proposal.id);

      alert("Contract proposal rejected.");

      // Refresh data
      await loadData();
    } catch (error) {
      console.error("Error rejecting contract proposal:", error);

      alert("Failed to reject contract.");
    } finally {
      setProcessingId(null);
    }
  };

  // ========================================
  // Loading
  // ========================================

  if (loading) {
    return <Loader />;
  }

  // ========================================
  // Render
  // ========================================

  return (
    <div className="contract-proposals-page">
      <div className="contract-proposals-header">
        <h1>Contract Proposals</h1>

        <p>
          Review contracts sent by buyers and decide whether to accept or reject
          them.
        </p>
      </div>

      {proposals.length === 0 ? (
        <div className="no-proposals">
          <h3>No Contract Proposals</h3>

          <p>You don't have any contract proposals yet.</p>
        </div>
      ) : (
        <div className="proposal-list">
          {proposals.map((proposal) => {
            // ========================================
            // Find real contract from Firebase
            // ========================================

            const contract = contracts.find(
              (item) => item.id === proposal.contractId,
            );

            // ========================================
            // Contract not found
            // ========================================

            if (!contract) {
              return (
                <div className="proposal-card" key={proposal.id}>
                  <h3>Contract Not Found</h3>

                  <p>
                    <strong>Contract ID:</strong> {proposal.contractId}
                  </p>

                  <p>
                    <strong>Proposal Status:</strong> {proposal.status}
                  </p>
                </div>
              );
            }

            const isProcessing = processingId === proposal.id;

            return (
              <div className="proposal-card" key={proposal.id}>
                {/* ================================
                    CONTRACT HEADER
                ================================= */}

                <div className="proposal-card-header">
                  <div>
                    <h2>{contract.title}</h2>

                    <p>Contract ID: {proposal.contractId}</p>
                  </div>

                  <span
                    className={`proposal-status ${proposal.status.toLowerCase()}`}
                  >
                    {proposal.status}
                  </span>
                </div>

                {/* ================================
                    BASIC INFORMATION
                ================================= */}

                <div className="proposal-info">
                  <p>
                    <strong>Buyer:</strong> {proposal.buyerName}
                  </p>

                  <p>
                    <strong>Crop:</strong> {contract.crop}
                  </p>

                  <p>
                    <strong>Quantity:</strong> {contract.quantity} KG
                  </p>

                  <p>
                    <strong>Price:</strong> {contract.price} / KG
                  </p>

                  <p>
                    <strong>Location:</strong> {contract.location}
                  </p>

                  <p>
                    <strong>Post ID:</strong> {proposal.postId}
                  </p>
                </div>

                {/* ================================
                    VIEW DETAILS
                ================================= */}

                <button
                  className="view-btn"
                  onClick={() => handleViewDetails(contract)}
                >
                  View Contract Details
                </button>

                {/* ================================
                    ACCEPT / REJECT
                ================================= */}

                {proposal.status === "Pending" && (
                  <div className="proposal-actions">
                    <button
                      className="logout-btn"
                      onClick={() => handleReject(proposal)}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : "Reject"}
                    </button>

                    <button
                      className="create-btn"
                      onClick={() => handleAccept(proposal)}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : "Accept Contract"}
                    </button>
                  </div>
                )}

                {/* ================================
                    ACCEPTED
                ================================= */}

                {proposal.status === "Accepted" && (
                  <div className="accepted-message">
                    ✓ You have accepted this contract.
                  </div>
                )}

                {/* ================================
                    REJECTED
                ================================= */}

                {proposal.status === "Rejected" && (
                  <div className="rejected-message">
                    ✕ You rejected this contract proposal.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================
          CONTRACT DETAILS MODAL
      ======================================== */}

      {selectedContract && (
        <ContractDetails
          contract={selectedContract}
          onClose={() => setSelectedContract(null)}
        />
      )}
    </div>
  );
};

export default ContractProposals;
