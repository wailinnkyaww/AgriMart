import "./ContractDetails.css";
import type { Contract } from "../../../types/Contract";
import { useAuth } from "../../../context/AuthContext";

interface Props {
  contract: Contract | null;
  onClose: () => void;
  onApply: (id: string) => void;
}

const ContractDetails = ({ contract, onClose, onApply }: Props) => {
  const user = useAuth();
  const buyerId = "2";

  if (!contract) return null;
  const isOwner = buyerId === contract.buyerId;
  return (
    <div className="contract-modal-overlay">
      <div className="contract-modal">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <img
          src={
            contract.image ||
            "https://placehold.co/900x350?text=Agricultural+Contract"
          }
          alt={contract.crop}
          className="contract-banner"
        />

        <h2>{contract.title}</h2>

        <div className="details-grid">
          <div>
            <strong>Crop</strong>
            <p>{contract.crop}</p>
          </div>

          <div>
            <strong>Contract Type</strong>
            <p>{contract.contractType}</p>
          </div>

          <div>
            <strong>Location</strong>
            <p>{contract.location}</p>
          </div>

          <div>
            <strong>Quantity</strong>
            <p>{contract.quantity} Kg</p>
          </div>

          <div>
            <strong>Price</strong>
            <p>${contract.price} / Kg</p>
          </div>

          <div>
            <strong>Payment Method</strong>
            <p>{contract.paymentMethod}</p>
          </div>

          <div>
            <strong>Start Date</strong>
            <p>{contract.startDate}</p>
          </div>

          <div>
            <strong>Delivery Date</strong>
            <p>{contract.deliveryDate}</p>
          </div>

          <div>
            <strong>End Date</strong>
            <p>{contract.endDate}</p>
          </div>

          <div>
            <strong>Status</strong>
            <p>{contract.status}</p>
          </div>

          <div>
            <strong>Applicants</strong>
            <p>{contract.applicants?.length || 0}</p>
          </div>

          <div>
            <strong>Agreement</strong>
            <p>{contract.agreementId ?? "Not Created"}</p>
          </div>
        </div>

        <div className="section">
          <h3>Description</h3>

          <p>{contract.description || "No description provided."}</p>
        </div>

        <div className="section">
          <h3>Requirements</h3>

          <p>{contract.requirements || "No requirements specified."}</p>
        </div>

        <div className="modal-actions">
          {user?.role === "Farmer" && contract.status === "Open" && (
            <button className="apply-btn" onClick={() => onApply(contract.id)}>
              Apply
            </button>
          )}

          <button className="cancel-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractDetails;
