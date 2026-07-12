import "./RequestCard.css";
import type { Contract } from "../../../../types/Contract";
import {
  openApplications,
  closeApplications,
} from "../../../../services/contractRequestService";
import ApplicantModal from "../ApplicantModal/ApplicantModal";

interface RequestCardProps {
  contract: Contract;
  onRefresh: () => void;
  onManage: (contract: Contract) => void;
}

const RequestCard = ({ contract, onRefresh, onManage }: RequestCardProps) => {
  const handleToggleStatus = async () => {
    try {
      if (contract.status === "Open") {
        await closeApplications(contract.id);
      } else if (contract.status === "Closed") {
        await openApplications(contract.id);
      }

      onRefresh();
    } catch (error) {
      console.error(error);
      alert("Failed to update contract status.");
    }
  };

  return (
    <div className="request-card">
      {contract.image ? (
        <img
          src={contract.image}
          alt={contract.title}
          className="request-image"
        />
      ) : (
        <div className="request-image placeholder">No Image</div>
      )}
      <div className="request-header">
        <h2>{contract.title}</h2>

        <span className={`status ${contract.status.toLowerCase()}`}>
          {contract.status}
        </span>
      </div>

      <div className="request-body">
        <p>
          <strong>Buyer:</strong> {contract.creator.fullName}
        </p>
        <p>
          <strong>Crop:</strong> {contract.crop}
        </p>

        <p>
          <strong>Location:</strong> {contract.location}
        </p>

        <p>
          <strong>Quantity:</strong> {contract.quantity} {contract.unit}
        </p>

        <p>
          <strong>Price:</strong> ${contract.price}
        </p>

        <p>
          <strong>Applicants:</strong>
          <span className="applicant-count">{contract.applicants.length}</span>
        </p>
      </div>

      <div className="request-actions">
        <button className="manage-btn" onClick={() => onManage(contract)}>
          Manage Requests
        </button>

        {contract.status === "Open" && (
          <button className="req-close-btn" onClick={handleToggleStatus}>
            Close Applications
          </button>
        )}

        {contract.status === "Closed" && (
          <button className="open-btn" onClick={handleToggleStatus}>
            Open Applications
          </button>
        )}
      </div>
    </div>
  );
};

export default RequestCard;
