import "./ApplicantCard.css";
import {
  acceptApplicant,
  rejectApplicant,
} from "../../../../services/contractRequestService";
import type { Applicant, Contract } from "../../../../types/Contract";

interface ApplicantCardProps {
  applicant: Applicant;
  contract: Contract;
  onRefresh: () => Promise<void>;
}

const ApplicantCard = ({
  applicant,
  contract,
  onRefresh,
}: ApplicantCardProps) => {
  const contractAccepted = contract.status === "Accepted";

  const handleAccept = async () => {
    try {
      await acceptApplicant(contract, applicant.userId);

      // Refresh the contract list and modal
      await onRefresh();

      alert("Farmer accepted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to accept farmer.");
    }
  };

  const handleReject = async () => {
    try {
      await rejectApplicant(contract, applicant.userId);

      // Refresh the contract list and modal
      await onRefresh();

      alert("Farmer rejected.");
    } catch (error) {
      console.error(error);
      alert("Failed to reject farmer.");
    }
  };

  return (
    <div className="applicant-card">
      <div className="applicant-info">
        <div className="avatar">{applicant.name.charAt(0).toUpperCase()}</div>

        <div>
          <h3>{applicant.name}</h3>

          <p>{applicant.role}</p>

          <p>Applied : {new Date(applicant.appliedAt).toLocaleDateString()}</p>

          {contract.selectedApplicant?.userId === applicant.userId && (
            <div className="winner-badge">⭐ Selected Farmer</div>
          )}
        </div>
      </div>

      <div className="applicant-status">
        <span
          className={`badge ${applicant.status?.toLowerCase() || "pending"}`}
        >
          {applicant.status || "Pending"}
        </span>
      </div>

      <div className="applicant-actions">
        {applicant.status === "Pending" && !contractAccepted && (
          <>
            <button className="accept-btn" onClick={handleAccept}>
              Accept
            </button>

            <button className="reject-btn" onClick={handleReject}>
              Reject
            </button>
          </>
        )}

        {applicant.status === "Accepted" && (
          <button className="accepted-btn" disabled>
            Accepted
          </button>
        )}

        {applicant.status === "Rejected" && (
          <button className="rejected-btn" disabled>
            Rejected
          </button>
        )}
      </div>
    </div>
  );
};

export default ApplicantCard;
