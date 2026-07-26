import { styles } from "./Styles";

interface Contract {
  farmerName: string;
  companyName: string;
  cropType: string;
  quantity: number;
  agreedPrice: number;
  startDate: string;
  endDate: string;
  status: string;
}

export const ContractCards = ({ contract }: { contract: Contract }) => (
  <div style={styles.card}>
    <h3>{contract.cropType}</h3>
    <p>
      <span style={styles.label}>Farmer:</span> {contract.farmerName}
    </p>
    <p>
      <span style={styles.label}>Company:</span> {contract.companyName}
    </p>
    <p>
      <span style={styles.label}>Quantity:</span> {contract.quantity} kg
    </p>
    <p>
      <span style={styles.label}>Price:</span> {contract.agreedPrice} MMK
    </p>
    <p>
      <span style={styles.label}>Duration:</span> {contract.startDate} to{" "}
      {contract.endDate}
    </p>
    <p>
      <span style={styles.label}>Status:</span> {contract.status}
    </p>
  </div>
);
