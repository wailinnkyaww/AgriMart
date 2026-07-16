import "./BuyerPaymentCard.css";

import { markPaymentPaid } from "../../services/paymentService";
import type { Payment } from "../../types/Payment";

interface Props {
  payment: Payment;
  onRefresh: () => void;
}

const BuyerPaymentCard = ({ payment, onRefresh }: Props) => {
  const handlePaid = async () => {
    try {
      await markPaymentPaid(payment.id);

      alert("Payment marked as Paid.");

      onRefresh();
    } catch (error) {
      console.error(error);
      alert("Failed to update payment.");
    }
  };

  return (
    <div className="buyer-payment-card">
      <h2>{payment.contractTitle}</h2>

      <p>
        <strong>Farmer:</strong> {payment.farmerName}
      </p>

      <p>
        <strong>Amount:</strong> ${payment.amount}
      </p>

      <p>
        <strong>Method:</strong> {payment.paymentMethod}
      </p>

      <p>
        <strong>Status:</strong>

        <span className={`status ${payment.status.toLowerCase()}`}>
          {payment.status}
        </span>
      </p>

      {payment.status === "Pending" ? (
        <button className="paid-btn" onClick={handlePaid}>
          Mark as Paid
        </button>
      ) : (
        <button className="done-btn" disabled>
          ✓ Paid
        </button>
      )}
    </div>
  );
};

export default BuyerPaymentCard;
