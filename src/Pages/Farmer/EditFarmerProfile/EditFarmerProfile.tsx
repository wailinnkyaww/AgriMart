import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditFarmerProfile.css";

import { useAuth } from "../../../context/AuthContext";
import { uploadImage } from "../../../services/cloudinaryService";
import {
  getUserProfile,
  updateUserProfile,
} from "../../../services/userService";
import Loader from "../../../components/Loader/Loader";

const EditFarmerProfile = () => {
  const navigate = useNavigate();
  const { firebaseUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    farmName: "",
    farmLocation: "",
    farmSize: 0,
    mainCrops: "",
    farmingExperience: 0,
    bio: "",
    profileImage: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      if (!firebaseUser) return;

      try {
        const data = await getUserProfile(firebaseUser.uid);

        if (data) {
          setFormData({
            fullName: data.fullName || "",
            phone: data.phone || "",
            farmName: data.farmName || "",
            farmLocation: data.farmLocation || "",
            farmSize: data.farmSize || 0,
            mainCrops: data.mainCrops ? data.mainCrops.join(", ") : "",
            farmingExperience: data.farmingExperience || 0,
            bio: data.bio || "",
            profileImage: data.profileImage || "",
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [firebaseUser]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const imageUrl = await uploadImage(file);

      setFormData((prev) => ({
        ...prev,
        profileImage: imageUrl,
      }));
    } catch (error) {
      console.error(error);
      alert("Image upload failed.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "farmSize" || name === "farmingExperience"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firebaseUser) return;

    try {
      setSaving(true);

      await updateUserProfile(firebaseUser.uid, {
        fullName: formData.fullName,
        phone: formData.phone,
        farmName: formData.farmName,
        farmLocation: formData.farmLocation,
        farmSize: formData.farmSize,
        mainCrops: formData.mainCrops
          .split(",")
          .map((crop) => crop.trim())
          .filter(Boolean),
        farmingExperience: formData.farmingExperience,
        bio: formData.bio,
        profileImage: formData.profileImage,
      });

      alert("Profile updated successfully.");

      navigate("/farmer/profile");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="edit-profile-container">
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <h2>Edit Farmer Profile</h2>
        <div className="profile-image-section">
          <img
            src={formData.profileImage || "https://via.placeholder.com/150"}
            alt="Profile"
            className="profile-preview"
          />

          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
        <label>Full Name</label>
        <input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />

        <label>Phone</label>
        <input name="phone" value={formData.phone} onChange={handleChange} />

        <label>Farm Name</label>
        <input
          name="farmName"
          value={formData.farmName}
          onChange={handleChange}
        />

        <label>Farm Location</label>
        <input
          name="farmLocation"
          value={formData.farmLocation}
          onChange={handleChange}
        />

        <label>Farm Size (Acres)</label>
        <input
          type="number"
          name="farmSize"
          value={formData.farmSize}
          onChange={handleChange}
        />

        <label>Main Crops</label>
        <input
          name="mainCrops"
          placeholder="Rice, Corn, Beans"
          value={formData.mainCrops}
          onChange={handleChange}
        />

        <label>Experience (Years)</label>
        <input
          type="number"
          name="farmingExperience"
          value={formData.farmingExperience}
          onChange={handleChange}
        />

        <label>Bio</label>
        <textarea
          rows={5}
          name="bio"
          value={formData.bio}
          onChange={handleChange}
        />

        <div className="button-group">
          <button type="button" onClick={() => navigate("/farmer/profile")}>
            Cancel
          </button>

          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFarmerProfile;
