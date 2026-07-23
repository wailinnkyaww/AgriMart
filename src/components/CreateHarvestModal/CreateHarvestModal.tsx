import { useEffect, useState } from "react";
import "./CreateHarvestModal.css";

import { useAuth } from "../../context/AuthContext";

import { getContracts } from "../../services/contractService";

import { createHarvest } from "../../services/harvestService";

import type { Contract } from "../../types/Contract";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

const CreateHarvestModal = ({ isOpen, onClose, onCreated }: Props) => {
  const { user } = useAuth();

  const [contracts, setContracts] = useState<Contract[]>([]);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    contractId: "",
    quantity: "",
    harvestDate: "",
    quality: "Good",
    notes: "",
    image: "",
  });

  useEffect(() => {
    if (isOpen) {
      loadContracts();
    }
  }, [isOpen]);

  const loadContracts = async () => {
    if (!user) return;

    const data = await getContracts();

    const myContracts = data.filter(
      (contract) =>
        contract.selectedApplicant === user.uid &&
        contract.status === "Assigned",
    );

    setContracts(myContracts);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    const selectedContract = contracts.find(
      (contract) => contract.id === formData.contractId,
    );

    if (!selectedContract) {
      alert("Please select a contract.");
      return;
    }

    try {
      setLoading(true);

      await createHarvest({
        contractId: selectedContract.id,

        farmerId: user.uid,
        farmerName: user.fullName,

        crop: selectedContract.crop,

        quantity: Number(formData.quantity),

        harvestDate: formData.harvestDate,

        quality: formData.quality,

        notes: formData.notes,

        image: formData.image,

        status: "Submitted",

        createdAt: new Date().toISOString(),
      });

      alert("Harvest submitted successfully.");

      onCreated();

      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to submit harvest.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      {" "}
      <div className="harvest-modal">
        {" "}
        <h2>Add Harvest Record</h2>{" "}
        <form onSubmit={handleSubmit}>
          {" "}
          <label>Contract</label>{" "}
          <select
            name="contractId"
            value={formData.contractId}
            onChange={handleChange}
            required
          >
            {" "}
            <option value="">Select Contract</option>{" "}
            {contracts.map((contract) => (
              <option key={contract.id} value={contract.id}>
                {" "}
                {contract.title}
              </option>
            ))}
          </select>{" "}
          <label>Harvest Quantity (KG)</label>{" "}
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />{" "}
          <label>Harvest Date</label>{" "}
          <input
            type="date"
            name="harvestDate"
            value={formData.harvestDate}
            onChange={handleChange}
            required
          />{" "}
          <label>Quality</label>{" "}
          <select
            name="quality"
            value={formData.quality}
            onChange={handleChange}
          >
            {" "}
            <option>Excellent</option> <option>Good</option>{" "}
            <option>Average</option> <option>Poor</option>{" "}
          </select>{" "}
          <label>Image URL</label>{" "}
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />{" "}
          <label>Notes</label>{" "}
          <textarea
            rows={4}
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />{" "}
          <div className="modal-buttons">
            {" "}
            <button type="button" className="cancel-btn" onClick={onClose}>
              {" "}
              Cancel{" "}
            </button>{" "}
            <button type="submit" className="create-btn" disabled={loading}>
              {" "}
              {loading ? "Submitting..." : "Submit Harvest"}
            </button>{" "}
          </div>{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
};

export default CreateHarvestModal;
