// import React from "react";
// import "./Dashboard.css";

// const Dashboard = () => {
//   const stats = [
//     { title: "Total Farmers", value: 45 },
//     { title: "Active Contracts", value: 12 },
//     { title: "Purchases", value: 28 },
//     { title: "Pending Payments", value: "$5,000" },
//   ];

//   const recentContracts = [
//     {
//       id: "C001",
//       farmer: "John Farmer",
//       riceType: "Paw San",
//       status: "Pending",
//     },
//     {
//       id: "C002",
//       farmer: "David Tun",
//       riceType: "Emata",
//       status: "Accepted",
//     },
//   ];

//   const recentPurchases = [
//     {
//       id: "P001",
//       rice: "Paw San",
//       quantity: "2000kg",
//       status: "Delivered",
//     },
//     {
//       id: "P002",
//       rice: "Emata",
//       quantity: "1000kg",
//       status: "Processing",
//     },
//   ];

//   const notifications = [
//     "Contract C001 accepted",
//     "Payment completed",
//     "New harvest available",
//   ];

//   return (
//     <div className="container-fluid dashboard-container">
//       <h2 className="dashboard-title">Buyer Dashboard</h2>

//       {/* Statistics */}
//       <div className="stats-container">
//         {stats.map((stat, index) => (
//           <div className="stat-card" key={index}>
//             <div className="stat-card-body">
//               <h5>{stat.title}</h5>
//               <h3>{stat.value}</h3>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Recent Contracts */}
//       <div className="card dashboard-card">
//         <div className="card-header">
//           <h5>Recent Contracts</h5>
//         </div>

//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table dashboard-table">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Farmer</th>
//                   <th>Rice Type</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {recentContracts.map((contract) => (
//                   <tr key={contract.id}>
//                     <td>{contract.id}</td>
//                     <td>{contract.farmer}</td>
//                     <td>{contract.riceType}</td>
//                     <td>
//                       <span
//                         className={`status ${
//                           contract.status === "Pending"
//                             ? "status-pending"
//                             : "status-accepted"
//                         }`}
//                       >
//                         {contract.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Recent Purchases */}
//       <div className="card dashboard-card">
//         <div className="card-header">
//           <h5>Recent Purchases</h5>
//         </div>

//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table dashboard-table">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Rice</th>
//                   <th>Quantity</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {recentPurchases.map((purchase) => (
//                   <tr key={purchase.id}>
//                     <td>{purchase.id}</td>
//                     <td>{purchase.rice}</td>
//                     <td>{purchase.quantity}</td>
//                     <td>
//                       <span
//                         className={`status ${
//                           purchase.status === "Delivered"
//                             ? "status-delivered"
//                             : "status-processing"
//                         }`}
//                       >
//                         {purchase.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Notifications */}
//       <div className="card dashboard-card">
//         <div className="card-header">
//           <h5>Notifications</h5>
//         </div>

//         <div className="card-body">
//           <ul className="notification-list">
//             {notifications.map((notification, index) => (
//               <li key={index} className="notification-item">
//                 🔔 {notification}
//               </li>
//             ))}
//           </ul>
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

      const buyerContracts = data.filter(
        (contract) => contract.creator.uid === user.uid,
      );

      setContracts(buyerContracts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const totalContracts = contracts.length;

  const openContracts = contracts.filter((c) => c.status === "Open").length;

  const assignedContracts = contracts.filter(
    (c) => c.status === "Assigned",
  ).length;

  const completedContracts = contracts.filter(
    (c) => c.status === "Completed",
  ).length;

  const totalApplications = contracts.reduce(
    (total, contract) => total + contract.applicants.length,
    0,
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="buyer-dashboard">
      <div className="dashboard-header">
        <h1>Buyer Dashboard</h1>

        <p>Welcome back, {user.fullName}</p>
      </div>

      <div className="dashboard-grid">
        <DashboardCard
          title="Total Contracts"
          value={totalContracts}
          icon="📄"
        />

        <DashboardCard title="Open Contracts" value={openContracts} icon="🌱" />

        <DashboardCard title="Assigned" value={assignedContracts} icon="🤝" />

        <DashboardCard title="Completed" value={completedContracts} icon="✅" />

        <DashboardCard
          title="Applications"
          value={totalApplications}
          icon="👨‍🌾"
        />
      </div>

      <div className="recent-contracts">
        <h2>Recent Contracts</h2>

        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Crop</th>
              <th>Status</th>
              <th>Applicants</th>
            </tr>
          </thead>

          <tbody>
            {contracts.slice(0, 5).map((contract) => (
              <tr key={contract.id}>
                <td>{contract.title}</td>

                <td>{contract.crop}</td>

                <td>{contract.status}</td>

                <td>{contract.applicants.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
