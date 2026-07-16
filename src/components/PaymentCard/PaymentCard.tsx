import "./PaymentCard.css";
import { useEffect, useState } from "react";
import type { Contract } from "../../types/Contract";
import {
  createPayment,
  paymentExists,
  getPaymentByContract,
} from "../../services/paymentService";

interface PaymentCardProps {
  contract: Contract;
}

const PaymentCard = ({ contract }: PaymentCardProps) => {
  const acceptedFarmer = contract.applicants.find(
    (applicant) => applicant.status === "Accepted",
  );

  const [amount, setAmount] = useState(contract.price * contract.quantity);
  const [alreadyPaid, setAlreadyPaid] = useState(false);

  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const [loading, setLoading] = useState(false);

  if (!acceptedFarmer) return null;

  useEffect(() => {
    loadPayment();
  }, []);

  const loadPayment = async () => {
    const payment = await getPaymentByContract(contract.id);

    if (payment) {
      setAlreadyPaid(true);
      setPaymentStatus(payment.status);
    }
  };
  const handleCreatePayment = async () => {
    try {
      setLoading(true);
      const exists = await paymentExists(contract.id);

      if (exists) {
        alert("Payment already exists.");
        return;
      }
      await createPayment({
        contractId: contract.id,
        contractTitle: contract.title,

        buyerId: contract.creator.uid,
        buyerName: contract.creator.fullName,

        farmerId: acceptedFarmer.userId,
        farmerName: acceptedFarmer.name,

        amount,

        paymentMethod,

        status: "Pending",

        createdAt: new Date().toISOString(),
      });

      setAlreadyPaid(true);
      setPaymentStatus("Pending");
      alert("Payment created successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to create payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-card">
      <h2>{contract.title}</h2>

      <div className="payment-info">
        <p>
          <strong>Farmer:</strong> {acceptedFarmer.name}
        </p>

        <p>
          <strong>Crop:</strong> {contract.crop}
        </p>

        <p>
          <strong>Quantity:</strong> {contract.quantity} {contract.unit}
        </p>

        <p>
          <strong>Price:</strong> ${contract.price}/Kg
        </p>
      </div>

      <div className="payment-form">
        <label>Amount</label>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <label>Payment Method</label>

        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option>Cash</option>
          <option>Bank Transfer</option>
          <option>KBZ Pay</option>
          <option>Wave Money</option>
        </select>
      </div>

      {alreadyPaid ? (
        <button className="payment-created" disabled>
          Payment {paymentStatus}
        </button>
      ) : (
        <button
          className="payment-btn"
          onClick={handleCreatePayment}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Payment"}
        </button>
      )}
    </div>
  );
};

export default PaymentCard;
