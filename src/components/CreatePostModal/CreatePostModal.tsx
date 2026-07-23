import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";
import { uploadImage } from "../../services/cloudinaryService";
import "./CreatePostModal.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => Promise<void>;
}

const CreatePostModal = ({ isOpen, onClose, onCreated }: Props) => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    crop: "",
    quantity: "",
    location: "",
    expectedPrice: "",
    harvestDate: "",
    description: "",
    image: "",
  });

  if (!isOpen) return null;

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setLoading(true);

      const imageUrl = await uploadImage(file);

      setFormData((prev) => ({
        ...prev,
        image: imageUrl,
      }));
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Image upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first.");
      return;
    }

    if (!formData.title || !formData.crop || !formData.quantity) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "posts"), {
        title: formData.title,
        crop: formData.crop,
        quantity: Number(formData.quantity),
        location: formData.location,
        expectedPrice: Number(formData.expectedPrice),
        harvestDate: formData.harvestDate,
        description: formData.description,
        image: formData.image,

        farmer: {
          uid: user.uid,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },

        status: "Available",

        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      alert("Post created successfully!");

      await onCreated();

      setFormData({
        title: "",
        crop: "",
        quantity: "",
        location: "",
        expectedPrice: "",
        harvestDate: "",
        description: "",
        image: "",
      });

      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-modal-overlay">
      <div className="post-modal">
        <div className="post-modal-header">
          <h2>Create New Post</h2>

          <button type="button" className="post-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Post Title *</label>

            <input
              type="text"
              name="title"
              placeholder="Example: Quality Rice Available"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Crop *</label>

              <select
                name="crop"
                value={formData.crop}
                onChange={handleChange}
                required
              >
                <option value="">Select Crop</option>
                <option value="Rice">Rice</option>
                <option value="Corn">Corn</option>
                <option value="Beans">Beans</option>
                <option value="Potato">Potato</option>
                <option value="Groundnut">Groundnut</option>
                <option value="Tomato">Tomato</option>
                <option value="Onion">Onion</option>
              </select>
            </div>

            <div className="form-group">
              <label>Quantity (KG) *</label>

              <input
                type="number"
                name="quantity"
                min="1"
                placeholder="1000"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Location</label>

              <input
                type="text"
                name="location"
                placeholder="Example: Yangon"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Expected Price / KG</label>

              <input
                type="number"
                name="expectedPrice"
                min="0"
                placeholder="1500"
                value={formData.expectedPrice}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Expected Harvest Date</label>

            <input
              type="date"
              name="harvestDate"
              value={formData.harvestDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Post Image</label>

            <input type="file" accept="image/*" onChange={handleImageUpload} />

            {formData.image && (
              <img
                src={formData.image}
                alt="Post preview"
                className="post-image-preview"
              />
            )}
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              rows={5}
              placeholder="Describe your crop, quality, availability, and other information..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="post-modal-buttons">
            <button
              type="button"
              className="post-cancel-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="post-submit-btn"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
