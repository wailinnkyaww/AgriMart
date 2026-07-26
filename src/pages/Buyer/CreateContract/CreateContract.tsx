import React, { useState } from "react";
import { db } from "../../../config/firebase"; // Ensure this path is correct
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import * as Yup from "yup";
import "./CreateContract.css";

// 1. Define Yup Validation Schema
const contractSchema = Yup.object().shape({
  farmer: Yup.string().required("Farmer name is required"),
  crop: Yup.string().required("Crop name is required"),
  quantity: Yup.number()
    .positive("Quantity must be positive")
    .required("Quantity is required"),
  price: Yup.number()
    .positive("Price must be positive")
    .required("Price is required"),
  deliveryDate: Yup.date().required("Delivery date is required"),
  location: Yup.string().required("Location is required"),
  offers: Yup.string(),
  startDate: Yup.date().nullable(),
  endDate: Yup.date().nullable(),
  notes: Yup.string(),
});

function CreateContract() {
  const initialData = {
    farmer: "",
    crop: "",
    quantity: "",
    price: "",
    deliveryDate: "",
    offers: [],
    startDate: "",
    endDate: "",
    location: "",
    notes: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const [currentOffer, setCurrentOffer] = useState(""); // Temporary input state

  const handleAddOffer = () => {
    if (currentOffer.trim() !== "") {
      setFormData({
        ...formData,
        offers: [...formData.offers, currentOffer.trim()],
      });
      setCurrentOffer(""); // Clear input
    }
  };

  const handleRemoveOffer = (index) => {
    const newOffers = formData.offers.filter((_, i) => i !== index);
    setFormData({ ...formData, offers: newOffers });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload
    const auth = getAuth();
    const user = auth.currentUser;

    try {
      // 2. Validate with Yup
      await contractSchema.validate(formData, { abortEarly: false });
      setErrors({}); // Clear previous errors

      if (!user) {
        alert("You must be logged in to create a contract.");
        return;
      }

      // 3. Save to Firebase
      await addDoc(collection(db, "contracts"), {
        ...formData,
        userId: user.uid,
        createdAt: new Date().toISOString(),
      });

      alert("Contract Created Successfully!");
      setFormData(initialData); // 4. Clear form inputs
    } catch (err) {
      if (err.name === "ValidationError") {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        console.error("Firebase error: ", err);
        alert("Failed to save contract.");
      }
    }
  };

  return (
    <div className="contract-page">
      <div className="contract-container">
        <div className="contract-header">
          <h1>Create Farming Contract</h1>
          <p>
            Create agreements between your company and farmers for crop
            production and delivery.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="contract-card">
            <h3>🌾 Crop Details</h3>

            <div className="form-grid">
              <div>
                <label>Farmer Name</label>
                <input
                  type="text"
                  name="farmer"
                  value={formData.farmer}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
                {errors.farmer && (
                  <span className="error-text">{errors.farmer}</span>
                )}
              </div>

              <div>
                <label>Crop Name</label>
                <input
                  type="text"
                  name="crop"
                  value={formData.crop}
                  onChange={handleChange}
                  placeholder="Rice"
                />
                {errors.crop && (
                  <span className="error-text">{errors.crop}</span>
                )}
              </div>

              <div>
                <label>Quantity (KG)</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="10000"
                />
                {errors.quantity && (
                  <span className="error-text">{errors.quantity}</span>
                )}
              </div>

              <div>
                <label>Price Per KG ($)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="2"
                />
                {errors.price && (
                  <span className="error-text">{errors.price}</span>
                )}
              </div>

              <div className="form-group">
                <label>Offers</label>
                <div className="dynamic-input-row">
                  <input
                    type="text"
                    value={currentOffer}
                    onChange={(e) => setCurrentOffer(e.target.value)}
                    placeholder="e.g., Fertilizer"
                  />
                  <button type="button" onClick={handleAddOffer}>
                    +
                  </button>
                </div>

                {/* List the added items */}
                <ul>
                  {formData.offers.map((offer, index) => (
                    <li key={index}>
                      {offer}{" "}
                      <button
                        type="button"
                        onClick={() => handleRemoveOffer(index)}
                      >
                        x
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <label>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="contract-card">
            <h3>🚚 Delivery Information</h3>
            <div className="form-grid">
              <div>
                <label>Delivery Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Company Warehouse"
                />
                {errors.location && (
                  <span className="error-text">{errors.location}</span>
                )}
              </div>

              <div>
                <label>Delivery Date</label>
                <input
                  type="date"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleChange}
                />
                {errors.deliveryDate && (
                  <span className="error-text">{errors.deliveryDate}</span>
                )}
              </div>
            </div>
          </div>

          <div className="contract-card">
            <h3>📝 Terms & Conditions</h3>

            <textarea
              rows="5"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter contract terms and conditions..."
            />
          </div>

          <div className="btn-group-contract">
            <button
              type="button"
              className="draft-btn"
              onClick={() => alert("Draft saved!")}
            >
              Save Draft
            </button>

            <button type="submit" className="submit-btn">
              Create Contract
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateContract;
