import "./ContractFilter.css";

interface FilterProps {
  search: string;
  crop: string;
  status: string;
  location: string;

  onSearchChange: (value: string) => void;
  onCropChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onLocationChange: (value: string) => void;
}

const ContractFilter = ({
  search,
  crop,
  status,
  location,
  onSearchChange,
  onCropChange,
  onStatusChange,
  onLocationChange,
}: FilterProps) => {
  return (
    <div className="contract-filter">
      <input
        type="text"
        placeholder="Search contract..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select value={crop} onChange={(e) => onCropChange(e.target.value)}>
        <option value="">All Crops</option>
        <option value="Rice">Rice</option>
        <option value="Corn">Corn</option>
        <option value="Tomato">Tomato</option>
        <option value="Beans">Beans</option>
        <option value="Potato">Potato</option>
        <option value="Onion">Onion</option>
      </select>

      <select value={status} onChange={(e) => onStatusChange(e.target.value)}>
        <option value="">All Status</option>
        <option value="Open">Open</option>
        <option value="Pending">Pending</option>
        <option value="Closed">Closed</option>
      </select>

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => onLocationChange(e.target.value)}
      />
    </div>
  );
};

export default ContractFilter;
