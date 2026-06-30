import { useEffect, useState } from "react";
import "./FarmerProfile.css";
import { getUserProfile } from "../../../services/userService";
import { useAuth } from "../../../context/AuthContext";
import type { Farmer } from "../../../types/Farmer";
import { useNavigate } from "react-router-dom";

const FarmerProfile = () => {
  const { user, firebaseUser } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Farmer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!firebaseUser) {
        setLoading(false);
        return;
      }

      try {
        const data = await getUserProfile(firebaseUser.uid);

        if (data) {
          setProfile(data as Farmer);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [firebaseUser]);

  if (loading) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="profile-loading">Profile not found.</div>;
  }

  return (
    <div className="farmer-profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={profile.photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className="profile-image"
          />

          <h2>{profile.fullName}</h2>
          <p>{profile.email}</p>
        </div>

        <div className="profile-section">
          <h3>Personal Information</h3>

          <p>
            <strong>Phone:</strong> {profile.phone || "-"}
          </p>

          <p>
            <strong>Role:</strong> Farmer
          </p>
        </div>

        <div className="profile-section">
          <h3>Farm Information</h3>

          <p>
            <strong>Farm Name:</strong> {profile.farmName || "-"}
          </p>

          <p>
            <strong>Location:</strong> {profile.farmLocation || "-"}
          </p>

          <p>
            <strong>Farm Size:</strong> {profile.farmSize || 0} Acres
          </p>

          <p>
            <strong>Main Crops:</strong> {profile.mainCrops?.join(", ") || "-"}
          </p>

          <p>
            <strong>Experience:</strong> {profile.farmingExperience || 0} Years
          </p>
        </div>

        <div className="profile-section">
          <h3>About</h3>

          <p>{profile.bio || "No bio added yet."}</p>
        </div>

        <button
          className="edit-profile-btn"
          onClick={() => navigate("/farmer/edit-profile")}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default FarmerProfile;
