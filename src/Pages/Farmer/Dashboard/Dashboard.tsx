// import "./Dashboard.css";

// const Dashboard = () => {
//   const recentContracts = [
//     {
//       id: "CTR-001",
//       buyer: "ABC Foods Ltd",
//       crop: "Rice",
//       status: "Active",
//     },
//     {
//       id: "CTR-002",
//       buyer: "Green Agro Co",
//       crop: "Corn",
//       status: "Pending",
//     },
//     {
//       id: "CTR-003",
//       buyer: "Fresh Market",
//       crop: "Tomato",
//       status: "Completed",
//     },
//   ];

//   return (
//     <div className="dashboard-container">
//       <h1 className="dashboard-title">Farmer Dashboard</h1>

//       {/* Stats */}
//       <div className="stats">
//         <div className="card">
//           <h3>Active Contracts</h3>
//           <p>5</p>
//         </div>

//         <div className="card">
//           <h3>Total Harvests</h3>
//           <p>12</p>
//         </div>

//         <div className="card">
//           <h3>Pending Payments</h3>
//           <p>$2,500</p>
//         </div>

//         <div className="card">
//           <h3>Company Offers</h3>
//           <p>3</p>
//         </div>
//       </div>

//       {/* Recent Contracts */}
//       <div className="section">
//         <h2>Recent Contracts</h2>

//         <table className="dashboard-table">
//           <thead>
//             <tr>
//               <th>Contract ID</th>
//               <th>Buyer</th>
//               <th>Crop</th>
//               <th>Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {recentContracts.map((contract) => (
//               <tr key={contract.id}>
//                 <td>{contract.id}</td>
//                 <td>{contract.buyer}</td>
//                 <td>{contract.crop}</td>
//                 <td>
//                   <span className={`status ${contract.status.toLowerCase()}`}>
//                     {contract.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Harvest Schedule */}
//       <div className="section">
//         <h2>Upcoming Harvests</h2>

//         <ul className="harvest-list">
//           <li>🌾 Rice Harvest - 10 July 2026</li>
//           <li>🌽 Corn Harvest - 15 July 2026</li>
//           <li>🍅 Tomato Harvest - 20 July 2026</li>
//         </ul>
//       </div>

//       {/* Notifications */}
//       <div className="section">
//         <h2>Notifications</h2>

//         <div className="notification">
//           New contract offer received from ABC Foods Ltd.
//         </div>

//         <div className="notification">Payment of $1,200 has been approved.</div>

//         <div className="notification">
//           Harvest report submitted successfully.
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useEffect, useState } from "react";
import "./Dashboard.css";

import DashboardCard from "../../../components/DashboardCard/DashboardCard";
import { useAuth } from "../../../context/AuthContext";
import { getContracts } from "../../../services/contractService";
import type { Contract } from "../../../types/Contract";
import Loader from "../../../components/Loader/Loader";

const Dashboard = () => {
  const { user } = useAuth();

  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, [user]);

  const loadDashboard = async () => {
    if (!user) return;

    try {
      const data = await getContracts();

      // Contracts this farmer applied to
      const myApplications = data.filter((contract) =>
        contract.applicants.some((applicant) => applicant.userId === user.uid),
      );

      setContracts(myApplications);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const totalApplications = contracts.length;

  const accepted = contracts.filter((contract) =>
    contract.applicants.some(
      (applicant) =>
        applicant.userId === user.uid && applicant.status === "Accepted",
    ),
  ).length;

  const rejected = contracts.filter((contract) =>
    contract.applicants.some(
      (applicant) =>
        applicant.userId === user.uid && applicant.status === "Rejected",
    ),
  ).length;

  const activeContracts = contracts.filter(
    (contract) =>
      contract.selectedApplicant === user?.uid &&
      contract.status === "Assigned",
  ).length;

  const completedContracts = contracts.filter(
    (contract) =>
      contract.selectedApplicant === user?.uid &&
      contract.status === "Completed",
  ).length;

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="farmer-dashboard">
      <div className="dashboard-header">
        <h1>Farmer Dashboard</h1>
        <p>Welcome back, {user?.fullName}</p>
      </div>

      <div className="dashboard-grid">
        <DashboardCard
          title="Applications"
          value={totalApplications}
          icon="📝"
        />

        <DashboardCard title="Accepted" value={accepted} icon="✅" />

        <DashboardCard title="Rejected" value={rejected} icon="❌" />

        <DashboardCard
          title="Active Contracts"
          value={activeContracts}
          icon="🌾"
        />

        <DashboardCard title="Completed" value={completedContracts} icon="🏁" />
      </div>

      <div className="recent-applications">
        <h2>Recent Applications</h2>

        <table>
          <thead>
            <tr>
              <th>Contract</th>
              <th>Crop</th>
              <th>Status</th>
              <th>Buyer</th>
            </tr>
          </thead>

          <tbody>
            {contracts.slice(0, 5).map((contract) => {
              const applicant = contract.applicants.find(
                (a) => a.userId === user?.uid,
              );

              return (
                <tr key={contract.id}>
                  <td>{contract.title}</td>
                  <td>{contract.crop}</td>
                  <td>
                    <span
                      className={`status ${(applicant?.status ?? "Pending").toLowerCase()}`}
                    >
                      {applicant?.status ?? "Pending"}
                    </span>
                  </td>
                  <td>{contract.creator.fullName}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
