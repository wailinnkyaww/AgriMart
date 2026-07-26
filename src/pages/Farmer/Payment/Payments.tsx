import { useEffect, useState } from "react";
import "./Payments.css";

import { useAuth } from "../../../context/AuthContext";
import { getPayments } from "../../../services/paymentService";

import type { Payment } from "../../../types/Payment";
import Loader from "../../../components/Common/Loader/Loader";

const Payments = () => {
  const { user } = useAuth();

  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPayments = async () => {
    if (!user) return;

    try {
      const data = await getPayments();

      const myPayments = data.filter(
        (payment) => payment.farmerId === user.uid,
      );

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
    return <Loader />;
  }

  return (
    <div className="farmer-payments">
      <div className="page-header">
        <h1>My Payments</h1>
        <p>View payments received from buyers.</p>
      </div>

      {payments.length === 0 ? (
        <div className="empty-state">
          <h3>No Payments</h3>
          <p>You haven't received any payments yet.</p>
        </div>
      ) : (
        <div className="payment-grid">
          {payments.map((payment) => (
            <div className="payment-card" key={payment.id}>
              <h2>{payment.contractTitle}</h2>

              <p>
                <strong>Buyer :</strong> {payment.buyerName}
              </p>

              <p>
                <strong>Amount :</strong> ${payment.amount}
              </p>

              <p>
                <strong>Method :</strong> {payment.paymentMethod}
              </p>

              <p>
                <strong>Status :</strong>

                <span
                  className={`payment-status ${payment.status.toLowerCase()}`}
                >
                  {payment.status}
                </span>
              </p>

              {payment.paidAt && (
                <p>
                  <strong>Paid At :</strong>{" "}
                  {new Date(payment.paidAt).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Payments;
