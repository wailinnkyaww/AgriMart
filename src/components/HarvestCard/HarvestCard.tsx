import "./HarvestCard.css";

import type { Harvest } from "../../types/Harvest";

interface Props {
  harvest: Harvest;
  isFarmer?: boolean;
  onEdit?: (harvest: Harvest) => void;
  onDelete?: (id: string) => void;
}

const HarvestCard = ({
  harvest,
  isFarmer = false,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <div className="harvest-card">
      <img
        src={harvest.image || "https://placehold.co/600x300?text=Harvest"}
        alt={harvest.crop}
        className="harvest-image"
      />

      <div className="harvest-content">
        <h2>{harvest.crop}</h2>

        <div className="harvest-details">
          <p>
            <strong>Farmer:</strong> {harvest.farmerName}
          </p>

          <p>
            <strong>Quantity:</strong> {harvest.quantity} KG
          </p>

          <p>
            <strong>Harvest Date:</strong> {harvest.harvestDate}
          </p>

          <p>
            <strong>Quality:</strong> {harvest.quality}
          </p>

          <p>
            <strong>Status:</strong>

            <span className="submitted">{harvest.status}</span>
          </p>
        </div>

        {harvest.notes && (
          <div className="notes">
            <strong>Notes</strong>

            <p>{harvest.notes}</p>
          </div>
        )}

        {isFarmer && (
          <div className="harvest-actions">
            <button className="edit-btn" onClick={() => onEdit?.(harvest)}>
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => onDelete?.(harvest.id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HarvestCard;
