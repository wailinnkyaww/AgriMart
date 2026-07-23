// import { Link } from "react-router-dom";
// import "./Sidebar.css";
// import { useAuth } from "../../context/AuthContext";

// function Sidebar() {
//   const { user } = useAuth();

//   return (
//     <>
//       <aside className="sidebar">
//         {user ? (
//           <ul>
//             {user.role === "Buyer" && (
//               <>
//                 <li>
//                   <Link className="link" to="/admin/dashboard">
//                     Admin Dashboard
//                   </Link>
//                 </li>
//                 <li>
//                   <Link className="link" to="/AdminProfile">
//                     Admin Profile
//                   </Link>
//                 </li>
//               </>
//             )}

//             {user.role === "Farmer" && (
//               <>
//                 <li>
//                   <Link className="link" to="/user/dashboard">
//                     User Dashboard
//                   </Link>
//                 </li>
//                 <li>
//                   <Link className="link" to="/userProfile">
//                     User Profile
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         ) : (
//           <div style={{ padding: "20px", fontSize: "14px", color: "#666" }}>
//             Please <Link to="/login" style={{ color: "#4f46e5", fontWeight: "bold" }}>login</Link> to access your dashboard.
//           </div>
//         )}
//       </aside>
//     </>
//   );
// }

// export default Sidebar;

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Sidebar.css";
import { useAuth } from "../../context/AuthContext";
import { getUserProfile } from "../../services/userService";

interface SidebarProps {
  className?: string;
}

function Sidebar({ className = "sidebar" }: SidebarProps) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      try {
        const data = await getUserProfile(user.uid);
        setProfile(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadProfile();
  }, [user]);

  return (
    <aside className={className}>
      <div className="inner-sidebar">
        {profile && (
          <div className="sidebar-user">
            <img
              src={
                profile.profileImage ||
                "https://ui-avatars.com/api/?name=User&background=2e7d32&color=fff"
              }
              alt={profile.fullName}
              className="sidebar-avatar"
            />

            <div className="sidebar-user-info">
              <h3>{profile.fullName}</h3>
              <span>{profile.role}</span>
            </div>
          </div>
        )}

        {user ? (
          <ul className="sidebar-menu">
            {/* ================= ADMIN ================= */}
            {user.role === "Admin" && (
              <>
                <li>
                  <Link className="link" to="/admin/dashboard">
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link className="link" to="/admin/profile">
                    Profile
                  </Link>
                </li>

                <li>
                  <Link className="link" to="/admin/farmers">
                    Manage Farmers
                  </Link>
                </li>

                <li>
                  <Link className="link" to="/admin/buyers">
                    Manage Buyers
                  </Link>
                </li>

                <li>
                  <Link className="link" to="/admin/contracts">
                    Contracts
                  </Link>
                </li>

                <li>
                  <Link className="link" to="/admin/harvests">
                    Harvest Records
                  </Link>
                </li>

                <li>
                  <Link className="link" to="/admin/payment">
                    Payments
                  </Link>
                </li>

                <li>
                  <Link className="link" to="/admin/reports">
                    Reports
                  </Link>
                </li>

                <li>
                  <Link className="link" to="/admin/settings">
                    Settings
                  </Link>
                </li>
              </>
            )}

            {/* ================= BUYER ================= */}
            {user.role === "Buyer" && (
              <>
                <li>
                  <Link className="link" to="/buyer/dashboard">
                    Dashboard
                  </Link>
                </li>

                {/* <li>
                  <Link className="link" to="/buyer/create-contract">
                    Create Contract
                  </Link>
                </li> */}

                <li>
                  <Link className="link" to="/buyer/profile">
                    Profile
                  </Link>
                </li>

                <li>
                  <Link className="link" to="/buyer/contracts">
                    Contract Requests
                  </Link>
                </li>

                {/* <li>
                  <Link className="link" to="/buyer/farmers">
                    Farmers
                  </Link>
                </li> */}

                <li>
                  <Link className="link" to="/buyer/farmer-posts">
                    Farmer Posts
                  </Link>
                </li>

                <li>
                  <Link className="link" to="/buyer/harvestRecords">
                    Harvest Records
                  </Link>
                </li>

                {/* <li>
                  <Link className="link" to="/buyer/purchases">
                    Rice Purchases
                  </Link>
                </li>

                <li>
                  <Link className="link" to="/buyer/payment">
                    Payments
                  </Link>
                </li> */}

                <li>
                  <Link className="link" to="/buyer/reports">
                    Reports
                  </Link>
                </li>

                {/* <li>
                  <Link className="link" to="/buyer/notifications">
                    Notifications
                  </Link>
                </li> */}
              </>
            )}

            {/* ================= FARMER ================= */}
            {user.role === "Farmer" && (
              <>
                <li>
                  <Link className="link" to="/farmer/dashboard">
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link className="link" to="/farmer/profile">
                    Profile
                  </Link>
                </li>

                <li>
                  <Link className="link" to="/farmer/farmer-posts">
                    My Posts
                  </Link>
                </li>

                <li>
                  <Link className="link" to="/farmer/contract-proposals">
                    Contract Proposals
                  </Link>
                </li>

                <li>
                  <Link className="link" to="/farmer/myContracts">
                    My Contracts
                  </Link>
                </li>

                <li>
                  <Link className="link" to="/farmer/myApplications">
                    My Applications
                  </Link>
                </li>

                <li>
                  <Link className="link" to="/farmer/harvestRecords">
                    Harvest Records
                  </Link>
                </li>

                {/* <li>
                  <Link className="link" to="/farmer/payment">
                    Payments
                  </Link>
                </li>

                <li>
                  <Link className="link" to="/farmer/offers">
                    Company Offers
                  </Link>
                </li> */}

                <li>
                  <Link className="link" to="/farmer/reports">
                    Reports
                  </Link>
                </li>

                {/* <li>
                  <Link className="link" to="/farmer/notifications">
                    Notifications
                  </Link>
                </li> */}
              </>
            )}
          </ul>
        ) : (
          <div className="sidebar-login-message">
            Please{" "}
            <Link className="login-link" to="/login">
              login
            </Link>{" "}
            to access your dashboard.
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
