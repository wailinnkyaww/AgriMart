import "./ApplicationCard.css";
import type { Contract } from "../../../../types/Contract";

interface ApplicationCardProps {
  contract: Contract;
  currentUserId: string | undefined;
  onView: (contract: Contract) => void;
}

const ApplicationCard = ({
  contract,
  currentUserId,
  onView,
}: ApplicationCardProps) => {
  const application = contract.applicants.find(
    (applicant) => applicant.userId === currentUserId,
  );

  if (!application) return null;

  return (
    <div className="application-card">
      <div className="application-header">
        <h2>{contract.title}</h2>

        <span
          className={`status-badge ${application.status?.toLowerCase() || "pending"}`}
        >
          {application.status || "Pending"}
        </span>
      </div>

      <div className="application-body">
        <p>
          <strong>Buyer:</strong> {contract.creator.name}
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
          <strong>Applied:</strong>{" "}
          {new Date(application.appliedAt).toLocaleDateString()}
        </p>
      </div>

      <div className="application-footer">
        <button className="view-btn" onClick={() => onView(contract)}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default ApplicationCard;
