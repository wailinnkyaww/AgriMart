import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../../../services/cloudinaryService";
import "./EditBuyerProfile.css";

import { useAuth } from "../../../context/AuthContext";
import {
  getUserProfile,
  updateUserProfile,
} from "../../../services/userService";
import Loader from "../../../components/Common/Loader/Loader";

const EditBuyerProfile = () => {
  const navigate = useNavigate();
  const { firebaseUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    companyName: "",
    businessType: "",
    companyAddress: "",
    preferredCrops: "",
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
            companyName: data.companyName || "",
            businessType: data.businessType || "",
            companyAddress: data.companyAddress || "",
            preferredCrops: data.preferredCrops
              ? data.preferredCrops.join(", ")
              : "",
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
      [name]: value,
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
        companyName: formData.companyName,
        businessType: formData.businessType,
        companyAddress: formData.companyAddress,
        preferredCrops: formData.preferredCrops
          .split(",")
          .map((crop) => crop.trim())
          .filter(Boolean),
        bio: formData.bio,
        profileImage: formData.profileImage,
      });
      alert("Profile updated successfully.");

      navigate("/buyer/profile");
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
        <div className="profile-image-section">
          <img
            src={formData.profileImage || "https://via.placeholder.com/150"}
            alt="Profile"
            className="profile-preview"
          />

          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
        <h2>Edit Buyer Profile</h2>

        <label>Full Name</label>
        <input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />

        <label>Phone</label>
        <input name="phone" value={formData.phone} onChange={handleChange} />

        <label>Company Name</label>
        <input
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
        />

        <label>Business Type</label>
        <input
          name="businessType"
          value={formData.businessType}
          onChange={handleChange}
        />

        <label>Company Address</label>
        <input
          name="companyAddress"
          value={formData.companyAddress}
          onChange={handleChange}
        />

        <label>Preferred Crops</label>
        <input
          name="preferredCrops"
          placeholder="Rice, Beans, Corn"
          value={formData.preferredCrops}
          onChange={handleChange}
        />

        <label>About Company</label>
        <textarea
          rows={5}
          name="bio"
          value={formData.bio}
          onChange={handleChange}
        />

        <div className="button-group">
          <button
            className="cancel-btn"
            type="button"
            onClick={() => navigate("/buyer/profile")}
          >
            Cancel
          </button>

          <button className="create-btn" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBuyerProfile;
