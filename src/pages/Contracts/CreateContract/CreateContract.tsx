import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useAuth } from "../../../context/AuthContext";
import "./CreateContract.css";

const CreateContract = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    contractType: "",
    crop: "",
    quantity: "",
    price: "",
    location: "",
    startDate: "",
    endDate: "",
    deliveryDate: "",
    description: "",
    requirements: "",
    paymentMethod: "Cash",
  });

  const [loading, setLoading] = useState(false);

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

    try {
      setLoading(true);

      await addDoc(collection(db, "contracts"), {
        title: formData.title,
        contractType: formData.contractType,
        crop: formData.crop,
        quantity: Number(formData.quantity),
        price: Number(formData.price),
        location: formData.location,
        description: formData.description,
        requirements: formData.requirements,
        paymentMethod: formData.paymentMethod,
        startDate: formData.startDate,
        endDate: formData.endDate,
        deliveryDate: formData.deliveryDate,

        creator: {
          uid: user!.uid,
          fullName: user!.fullName,
          email: user!.email,
          role: user!.role,
        },

        applicants: [],
        selectedApplicant: null,
        agreementId: null,

        status: "Open",

        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      alert("Contract Created Successfully!");

      setFormData({
        title: "",
        contractType: "",
        crop: "",
        quantity: "",
        price: "",
        location: "",
        startDate: "",
        endDate: "",
        deliveryDate: "",
        description: "",
        requirements: "",
        paymentMethod: "Cash",
      });
    } catch (err) {
      console.log(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-contract-page">
      <div className="contract-form">
        <h2>Create New Contract</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Contract Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <div className="form-group">
              <label>Contract Type</label>

              <select
                name="contractType"
                value={formData.contractType}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="SELL">Sell Crops</option>
                <option value="BUY">Buy Crops</option>
              </select>
            </div>

            <div className="form-group">
              <label>Crop</label>

              <select
                name="crop"
                value={formData.crop}
                onChange={handleChange}
                required
              >
                <option value="">Select Crop</option>
                <option>Rice</option>
                <option>Corn</option>
                <option>Beans</option>
                <option>Sesame</option>
                <option>Groundnut</option>
                <option>Sunflower</option>
                <option>Garlic</option>
                <option>Onion</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Quantity (KG)</label>

              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Price / KG</label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Location</label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <div className="form-group">
              <label>Start Date</label>

              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>End Date</label>

              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Delivery Date</label>

              <input
                type="date"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Requirements</label>

            <textarea
              rows={4}
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Payment Method</label>

            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option>Cash</option>
              <option>Bank Transfer</option>
              <option>KBZ Pay</option>
              <option>Wave Money</option>
            </select>
          </div>

          <button className="submit-btn" disabled={loading}>
            {loading ? "Creating..." : "Create Contract"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateContract;
