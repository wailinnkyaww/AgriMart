import { useState } from "react";
import "./EditHarvestModal.css";

import { updateHarvest } from "../../../services/harvestService";
import { uploadImage } from "../../../services/cloudinaryService";

import type { Harvest } from "../../../types/Harvest";

interface Props {
  harvest: Harvest;
  onClose: () => void;
  onSuccess: () => void;
}

const EditHarvestModal = ({ harvest, onClose, onSuccess }: Props) => {
  const [formData, setFormData] = useState({
    crop: harvest.crop,
    quantity: harvest.quantity,
    harvestDate: harvest.harvestDate,
    quality: harvest.quality,
    notes: harvest.notes,
    image: harvest.image,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const imageUrl = await uploadImage(file);

      setFormData((prev) => ({
        ...prev,
        image: imageUrl,
      }));
    } catch (error) {
      console.error(error);
      alert("Image upload failed.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      await updateHarvest(harvest.id, formData);

      alert("Harvest updated successfully.");

      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Failed to update harvest.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Harvest</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="crop"
            value={formData.crop}
            onChange={handleChange}
            placeholder="Crop"
            required
          />

          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            required
          />

          <input
            type="date"
            name="harvestDate"
            value={formData.harvestDate}
            onChange={handleChange}
            required
          />

          <select
            name="quality"
            value={formData.quality}
            onChange={handleChange}
          >
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Average">Average</option>
            <option value="Poor">Poor</option>
          </select>

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Notes"
            rows={4}
          />

          {formData.image && (
            <img src={formData.image} alt="Harvest" className="preview-image" />
          )}

          <input type="file" accept="image/*" onChange={handleImageUpload} />

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHarvestModal;
