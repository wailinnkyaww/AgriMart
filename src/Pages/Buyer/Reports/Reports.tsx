import { useEffect, useState } from "react";
import "./Reports.css";

import DashboardCard from "../../../components/DashboardCard/DashboardCard";

import { useAuth } from "../../../context/AuthContext";

import { getContracts } from "../../../services/contractService";
import { getPayments } from "../../../services/paymentService";
import { getHarvests } from "../../../services/harvestService";
import Loader from "../../../components/Common/Loader/Loader";

const Reports = () => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalContracts: 0,
    openContracts: 0,
    assignedContracts: 0,
    completedContracts: 0,
    totalApplications: 0,
    totalHarvests: 0,
    totalPayments: 0,
    paidPayments: 0,
    pendingPayments: 0,
  });

  useEffect(() => {
    loadReport();
  }, [user]);

  const loadReport = async () => {
    if (!user) return;

    try {
      const contracts = await getContracts();
      const payments = await getPayments();
      const harvests = await getHarvests();

      const myContracts = contracts.filter(
        (contract) => contract.creator.uid === user.uid,
      );

      const contractIds = myContracts.map((contract) => contract.id);

      const myPayments = payments.filter(
        (payment) => payment.buyerId === user.uid,
      );

      const myHarvests = harvests.filter((harvest) =>
        contractIds.includes(harvest.contractId),
      );

      setStats({
        totalContracts: myContracts.length,

        openContracts: myContracts.filter(
          (contract) => contract.status === "Open",
        ).length,

        assignedContracts: myContracts.filter(
          (contract) => contract.status === "Assigned",
        ).length,

        completedContracts: myContracts.filter(
          (contract) => contract.status === "Completed",
        ).length,

        totalApplications: myContracts.reduce(
          (total, contract) => total + contract.applicants.length,
          0,
        ),

        totalHarvests: myHarvests.length,

        totalPayments: myPayments.length,

        paidPayments: myPayments.filter((payment) => payment.status === "Paid")
          .length,

        pendingPayments: myPayments.filter(
          (payment) => payment.status === "Pending",
        ).length,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="reports-page">
      <div className="page-header">
        <h1>Buyer Reports</h1>
        <p>Overview of your farming contracts.</p>
      </div>

      <div className="report-grid">
        <DashboardCard
          title="Contracts"
          value={stats.totalContracts}
          icon="📄"
        />

        <DashboardCard title="Open" value={stats.openContracts} icon="🟢" />

        <DashboardCard
          title="Assigned"
          value={stats.assignedContracts}
          icon="🤝"
        />

        <DashboardCard
          title="Completed"
          value={stats.completedContracts}
          icon="🏁"
        />

        <DashboardCard
          title="Applications"
          value={stats.totalApplications}
          icon="👨‍🌾"
        />

        <DashboardCard title="Harvests" value={stats.totalHarvests} icon="🌾" />

        <DashboardCard title="Payments" value={stats.totalPayments} icon="💰" />

        <DashboardCard title="Paid" value={stats.paidPayments} icon="✅" />

        <DashboardCard
          title="Pending"
          value={stats.pendingPayments}
          icon="⏳"
        />
      </div>
      <div className="report-summary">
        <h2>Summary</h2>

        <table className="summary-table">
          <tbody>
            <tr>
              <td>Total Contracts</td>
              <td>{stats.totalContracts}</td>
            </tr>

            <tr>
              <td>Open Contracts</td>
              <td>{stats.openContracts}</td>
            </tr>

            <tr>
              <td>Assigned Contracts</td>
              <td>{stats.assignedContracts}</td>
            </tr>

            <tr>
              <td>Completed Contracts</td>
              <td>{stats.completedContracts}</td>
            </tr>

            <tr>
              <td>Total Applications</td>
              <td>{stats.totalApplications}</td>
            </tr>

            <tr>
              <td>Harvest Records</td>
              <td>{stats.totalHarvests}</td>
            </tr>

            <tr>
              <td>Total Payments</td>
              <td>{stats.totalPayments}</td>
            </tr>

            <tr>
              <td>Paid Payments</td>
              <td>{stats.paidPayments}</td>
            </tr>

            <tr>
              <td>Pending Payments</td>
              <td>{stats.pendingPayments}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
