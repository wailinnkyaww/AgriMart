import "./MyContractCard.css";
import type { Contract } from "../../../../types/Contract";

interface MyContractCardProps {
  contract: Contract;
  onView: (contract: Contract) => void;
}

const MyContractCard = ({ contract, onView }: MyContractCardProps) => {
  return (
    <div className="my-contract-card">
      <div className="card-image">
        <img
          src={
            contract.image || "https://placehold.co/600x350?text=Rice+Contract"
          }
          alt={contract.title}
        />
      </div>

      <div className="card-content">
        <div className="card-header">
          <h2>{contract.title}</h2>

          <span className="status assigned">{contract.status}</span>
        </div>

        <div className="card-body">
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
            <strong>Price:</strong> ${contract.price} / Kg
          </p>

          <p>
            <strong>Delivery Date:</strong> {contract.deliveryDate}
          </p>

          <p>
            <strong>Payment:</strong> {contract.paymentMethod}
          </p>
        </div>

        <div className="card-footer">
          <button className="view-btn" onClick={() => onView(contract)}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyContractCard;
