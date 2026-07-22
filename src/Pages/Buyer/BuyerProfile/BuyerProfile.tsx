import { useEffect, useState } from "react";
import "./BuyerProfile.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { getUserProfile } from "../../../services/userService";
import type { Buyer } from "../../../types/Buyer";
import Loader from "../../../components/Loader/Loader";

const BuyerProfile = () => {
  const navigate = useNavigate();
  const { firebaseUser } = useAuth();

  const [profile, setProfile] = useState<Buyer | null>(null);
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
          setProfile(data as Buyer);
        }
      } catch (error) {
        console.error("Error fetching buyer profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [firebaseUser]);

  if (loading) {
    return <Loader />;
  }

  if (!profile) {
    return <div className="profile-loading">Profile not found.</div>;
  }

  return (
    <div className="buyer-profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={profile.profileImage || "https://via.placeholder.com/150"}
            alt="Buyer"
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
            <strong>Role:</strong> Buyer
          </p>
        </div>

        <div className="profile-section">
          <h3>Company Information</h3>

          <p>
            <strong>Company Name:</strong> {profile.companyName || "-"}
          </p>

          <p>
            <strong>Business Type:</strong> {profile.businessType || "-"}
          </p>

          <p>
            <strong>Address:</strong> {profile.companyAddress || "-"}
          </p>

          <p>
            <strong>Preferred Crops:</strong>{" "}
            {profile.preferredCrops?.join(", ") || "-"}
          </p>
        </div>

        <div className="profile-section">
          <h3>About</h3>

          <p>{profile.bio || "No description available."}</p>
        </div>

        <div className="edit-profile-btn">
          <button
            className=" create-btn"
            onClick={() => navigate("/buyer/edit-profile")}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyerProfile;
