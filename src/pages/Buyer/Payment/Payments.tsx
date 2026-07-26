import { useEffect, useState } from "react";
import "./Payments.css";

import { useAuth } from "../../../context/AuthContext";
import { getPayments } from "../../../services/paymentService";

import type { Payment } from "../../../types/Payment";

import BuyerPaymentCard from "../../../components/BuyerPaymentCard/BuyerPaymentCard";

const Payments = () => {
  const { user } = useAuth();

  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPayments = async () => {
    if (!user) return;

    try {
      const data = await getPayments();

      const myPayments = data.filter((payment) => payment.buyerId === user.uid);

      setPayments(myPayments);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, [user]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="buyer-payments">
      <div className="page-header">
        <h1>Payments</h1>
        <p>Create and manage payments for farmers.</p>
      </div>

      {payments.length === 0 ? (
        <div className="empty-state">
          <h3>No Payments</h3>
          <p>No payments have been created yet.</p>
        </div>
      ) : (
        <div className="payment-grid">
          {payments.map((payment) => (
            <BuyerPaymentCard
              key={payment.id}
              payment={payment}
              onRefresh={loadPayments}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Payments;
