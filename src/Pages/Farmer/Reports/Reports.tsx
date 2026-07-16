import { useEffect, useState } from "react";
import "./Reports.css";

import DashboardCard from "../../../components/DashboardCard/DashboardCard";

import { useAuth } from "../../../context/AuthContext";

import { getContracts } from "../../../services/contractService";
import { getHarvests } from "../../../services/harvestService";
import { getPayments } from "../../../services/paymentService";

const Reports = () => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    applications: 0,
    accepted: 0,
    rejected: 0,
    activeContracts: 0,
    completedContracts: 0,
    harvests: 0,
    payments: 0,
    paidPayments: 0,
    pendingPayments: 0,
  });

  useEffect(() => {
    loadReports();
  }, [user]);

  const loadReports = async () => {
    if (!user) return;

    try {
      const contracts = await getContracts();
      const harvests = await getHarvests();
      const payments = await getPayments();

      const myApplications = contracts.filter((contract) =>
        contract.applicants.some((applicant) => applicant.userId === user.uid),
      );

      const myHarvests = harvests.filter(
        (harvest) => harvest.farmerId === user.uid,
      );

      const myPayments = payments.filter(
        (payment) => payment.farmerId === user.uid,
      );

      setStats({
        applications: myApplications.length,

        accepted: myApplications.filter((contract) =>
          contract.applicants.some(
            (applicant) =>
              applicant.userId === user.uid && applicant.status === "Accepted",
          ),
        ).length,

        rejected: myApplications.filter((contract) =>
          contract.applicants.some(
            (applicant) =>
              applicant.userId === user.uid && applicant.status === "Rejected",
          ),
        ).length,

        activeContracts: myApplications.filter(
          (contract) =>
            contract.selectedApplicant === user.uid &&
            contract.status === "Assigned",
        ).length,

        completedContracts: myApplications.filter(
          (contract) =>
            contract.selectedApplicant === user.uid &&
            contract.status === "Completed",
        ).length,

        harvests: myHarvests.length,

        payments: myPayments.length,

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
    return <div className="loading">Loading Reports...</div>;
  }

  return (
    <div className="reports-page">
      <div className="page-header">
        <h1>Farmer Reports</h1>
        <p>Your farming activity summary.</p>
      </div>

      <div className="report-grid">
        <DashboardCard
          title="Applications"
          value={stats.applications}
          icon="📝"
        />

        <DashboardCard title="Accepted" value={stats.accepted} icon="✅" />

        <DashboardCard title="Rejected" value={stats.rejected} icon="❌" />

        <DashboardCard
          title="Active Contracts"
          value={stats.activeContracts}
          icon="🌾"
        />

        <DashboardCard
          title="Completed"
          value={stats.completedContracts}
          icon="🏁"
        />

        <DashboardCard
          title="Harvest Records"
          value={stats.harvests}
          icon="🚜"
        />

        <DashboardCard title="Payments" value={stats.payments} icon="💰" />

        <DashboardCard title="Paid" value={stats.paidPayments} icon="💵" />

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
              <td>Applications</td>
              <td>{stats.applications}</td>
            </tr>

            <tr>
              <td>Accepted</td>
              <td>{stats.accepted}</td>
            </tr>

            <tr>
              <td>Rejected</td>
              <td>{stats.rejected}</td>
            </tr>

            <tr>
              <td>Active Contracts</td>
              <td>{stats.activeContracts}</td>
            </tr>

            <tr>
              <td>Completed Contracts</td>
              <td>{stats.completedContracts}</td>
            </tr>

            <tr>
              <td>Harvest Records</td>
              <td>{stats.harvests}</td>
            </tr>

            <tr>
              <td>Total Payments</td>
              <td>{stats.payments}</td>
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
