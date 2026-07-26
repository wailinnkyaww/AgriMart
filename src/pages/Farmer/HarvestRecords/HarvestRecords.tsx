// import { useState } from "react";
// import "./HarvestRecords.css";

// const HarvestRecords = () => {
//   const [report, setReport] = useState({
//     contractId: "",
//     reportType: "Weekly",
//     quantity: "",
//     condition: "",
//     notes: "",
//   });

//   const contracts = [
//     {
//       id: "C001",
//       buyer: "ABC Rice Company",
//       crop: "Rice",
//     },
//     {
//       id: "C002",
//       buyer: "Green Agro Ltd",
//       crop: "Corn",
//     },
//     {
//       id: "C003",
//       buyer: "Fresh Market",
//       crop: "Tomato",
//     },
//   ];

//   const reports = [
//     {
//       id: 1,
//       contract: "C001",
//       type: "Weekly",
//       quantity: "250kg",
//       date: "20 Jun 2026",
//       status: "Submitted",
//     },
//     {
//       id: 2,
//       contract: "C002",
//       type: "Monthly",
//       quantity: "1200kg",
//       date: "01 Jun 2026",
//       status: "Approved",
//     },
//   ];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(report);
//     alert("Harvest Report Submitted");
//   };

//   return (
//     <div className="harvest-container">
//       <h1>Harvest Reports</h1>

//       {/* Summary Cards */}
//       <div className="stats">
//         <div className="card">
//           <h3>Total Reports</h3>
//           <p>15</p>
//         </div>

//         <div className="card">
//           <h3>Weekly Reports</h3>
//           <p>10</p>
//         </div>

//         <div className="card">
//           <h3>Monthly Reports</h3>
//           <p>5</p>
//         </div>

//         <div className="card">
//           <h3>Total Harvest</h3>
//           <p>4,500kg</p>
//         </div>
//       </div>

//       {/* Form */}
//       <div className="form-section">
//         <h2>Submit Harvest Report</h2>

//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Contract</label>

//             <select
//               value={report.contractId}
//               onChange={(e) =>
//                 setReport({
//                   ...report,
//                   contractId: e.target.value,
//                 })
//               }
//             >
//               <option value="">Select Contract</option>

//               {contracts.map((contract) => (
//                 <option key={contract.id} value={contract.id}>
//                   {contract.id} - {contract.crop}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="form-group">
//             <label>Report Type</label>

//             <select
//               value={report.reportType}
//               onChange={(e) =>
//                 setReport({
//                   ...report,
//                   reportType: e.target.value,
//                 })
//               }
//             >
//               <option>Weekly</option>
//               <option>Monthly</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label>Harvest Quantity (kg)</label>

//             <input
//               type="number"
//               placeholder="Enter quantity"
//               value={report.quantity}
//               onChange={(e) =>
//                 setReport({
//                   ...report,
//                   quantity: e.target.value,
//                 })
//               }
//             />
//           </div>

//           <div className="form-group">
//             <label>Crop Condition</label>

//             <select
//               value={report.condition}
//               onChange={(e) =>
//                 setReport({
//                   ...report,
//                   condition: e.target.value,
//                 })
//               }
//             >
//               <option value="">Select</option>
//               <option>Excellent</option>
//               <option>Good</option>
//               <option>Average</option>
//               <option>Poor</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label>Notes</label>

//             <textarea
//               rows="4"
//               placeholder="Additional comments..."
//               value={report.notes}
//               onChange={(e) =>
//                 setReport({
//                   ...report,
//                   notes: e.target.value,
//                 })
//               }
//             />
//           </div>

//           <button className="submit-btn">Submit Report</button>
//         </form>
//       </div>

//       {/* Report History */}
//       <div className="table-section">
//         <h2>Report History</h2>

//         <table className="report-table">
//           <thead>
//             <tr>
//               <th>Contract</th>
//               <th>Type</th>
//               <th>Quantity</th>
//               <th>Date</th>
//               <th>Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {reports.map((item) => (
//               <tr key={item.id}>
//                 <td>{item.contract}</td>
//                 <td>{item.type}</td>
//                 <td>{item.quantity}</td>
//                 <td>{item.date}</td>
//                 <td>
//                   <span className={`status ${item.status.toLowerCase()}`}>
//                     {item.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default HarvestRecords;

import { useEffect, useState } from "react";
import "./HarvestRecords.css";

import { useAuth } from "../../../context/AuthContext";

import type { Harvest } from "../../../types/Harvest";

import { getHarvests, deleteHarvest } from "../../../services/harvestService";

import HarvestCard from "../../../components/HarvestCard/HarvestCard";
import CreateHarvestModal from "../../../components/Modals/CreateHarvestModal/CreateHarvestModal";
import EditHarvestModal from "../../../components/Modals/EditHarvestModal/EditHarvestModal";
import SkeletonCard from "../../../components/Skeleton/SkeletonCard";

const HarvestRecords = () => {
  const { user } = useAuth();

  const [harvests, setHarvests] = useState<Harvest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHarvest, setSelectedHarvest] = useState<Harvest | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadHarvests = async () => {
    if (!user) return;

    try {
      const data = await getHarvests();

      const myHarvests = data.filter(
        (harvest) => harvest.farmerId === user.uid,
      );

      setHarvests(myHarvests);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHarvests();
  }, [user]);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this harvest record?",
    );

    if (!confirmed) return;

    try {
      await deleteHarvest(id);

      alert("Harvest deleted successfully.");

      loadHarvests();
    } catch (error) {
      console.error(error);
      alert("Failed to delete harvest.");
    }
  };

  if (loading) {
    return (
      <div className="harvest-grid">
        {[1, 2, 3, 4].map((item) => (
          <SkeletonCard key={item} type="harvest" />
        ))}
      </div>
    );
  }

  return (
    <div className="harvest-page">
      <div className="page-header">
        <div>
          <h1>Harvest Records</h1>
          <p>Manage your submitted harvest records.</p>
        </div>

        <button
          className="add-harvest-btn"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Harvest
        </button>
      </div>

      {harvests.length === 0 ? (
        <div className="empty-state">
          <h3>No Harvest Records</h3>
          <p>You haven't submitted any harvest records yet.</p>
        </div>
      ) : (
        <div className="harvest-grid">
          {harvests.map((harvest) => (
            <HarvestCard
              key={harvest.id}
              harvest={harvest}
              isFarmer
              onRefresh={loadHarvests}
              onEdit={(harvest) => {
                setSelectedHarvest(harvest);
                setShowEditModal(true);
              }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <CreateHarvestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={loadHarvests}
      />

      {showEditModal && selectedHarvest && (
        <EditHarvestModal
          harvest={selectedHarvest}
          onClose={() => {
            setShowEditModal(false);
            setSelectedHarvest(null);
          }}
          onSuccess={() => {
            loadHarvests();
            setShowEditModal(false);
            setSelectedHarvest(null);
          }}
        />
      )}
    </div>
  );
};

export default HarvestRecords;
