import "./ContractCard.css";
import type { Contract } from "../../../types/Contract";
import ApplyButton from "../ApplyButton/ApplyButton";

interface ContractCardProps {
  contract: Contract;
  currentUserId: string | undefined;
  onApply: (id: string) => void;
  onView: (id: string) => void;
  onRefresh: () => Promise<void>;
}

const ContractCard = ({
  contract,
  currentUserId,
  onApply,
  onView,
  onRefresh,
}: ContractCardProps) => {
  return (
    <div className="contract-card">
      <div className="contract-image">
        <img src={contract.image} alt={contract.crop} />
      </div>

      <div className="contract-content">
        <h3>{contract.title}</h3>

        <div className="contract-info">
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
            <strong>Price:</strong> ${contract.price}/Kg
          </p>

          <p>
            <strong>Delivery:</strong> {contract.deliveryDate}
          </p>
          <p>
            {contract.applicants.length > 0 && <strong>Farmer:</strong>}
            {contract.applicants?.map((applicant, index) => (
              <span key={index}>{applicant.name || "Unknown Applicant"},</span>
            ))}
          </p>
        </div>

        <div className="contract-footer">
          <span className={`status ${contract.status.toLowerCase()}`}>
            {contract.status}
          </span>

          <div className="contract-buttons">
            <button className="view-btn" onClick={() => onView(contract.id)}>
              View Details
            </button>
            <ApplyButton contract={contract} onApplied={onRefresh} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractCard;
