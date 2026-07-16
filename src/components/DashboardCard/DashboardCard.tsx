import "./DashboardCard.css";

interface DashboardCardProps {
  title: string;
  value: number;
  icon: string;
}

const DashboardCard = ({ title, value, icon }: DashboardCardProps) => {
  return (
    <div className="dashboard-card">
      <div className="dashboard-icon">{icon}</div>

      <div className="dashboard-info">
        <h4>{title}</h4>
        <h2>{value}</h2>
      </div>
    </div>
  );
};

export default DashboardCard;
