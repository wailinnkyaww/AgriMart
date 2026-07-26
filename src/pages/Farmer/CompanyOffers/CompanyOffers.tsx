import { useState } from "react";
import "./CompanyOffers.css";

const CompanyOffers = () => {
  const [offers] = useState([
    {
      id: "OFF001",
      buyer: "ABC Rice Company",
      contract: "C001",
      type: "Seeds",
      item: "Premium Rice Seeds",
      quantity: "200 kg",
      value: "$800",
      date: "20 Jun 2026",
      status: "Pending",
    },
    {
      id: "OFF002",
      buyer: "Green Agro Ltd",
      contract: "C002",
      type: "Cash Advance",
      item: "Working Capital",
      quantity: "-",
      value: "$2,000",
      date: "18 Jun 2026",
      status: "Pending",
    },
    {
      id: "OFF003",
      buyer: "Fresh Market",
      contract: "C003",
      type: "Fertilizer",
      item: "Organic Fertilizer",
      quantity: "50 Bags",
      value: "$1,200",
      date: "15 Jun 2026",
      status: "Accepted",
    },
  ]);

  const [history] = useState([
    {
      buyer: "ABC Rice Company",
      contract: "C001",
      item: "Rice Seeds",
      quantity: "150 kg",
      value: "$600",
      receivedDate: "01 Jun 2026",
    },
    {
      buyer: "ABC Rice Company",
      contract: "C001",
      item: "Fertilizer",
      quantity: "50 Bags",
      value: "$1,000",
      receivedDate: "10 Jun 2026",
    },
    {
      buyer: "Green Agro Ltd",
      contract: "C002",
      item: "Cash Advance",
      quantity: "-",
      value: "$2,000",
      receivedDate: "15 Jun 2026",
    },
  ]);

  return (
    <div className="offers-container">
      <div className="offers-header">
        <h1>Company Offers</h1>
      </div>

      {/* Statistics */}
      <div className="stats">
        <div className="stat-card">
          <h3>Pending Offers</h3>
          <p>4</p>
        </div>

        <div className="stat-card">
          <h3>Accepted Offers</h3>
          <p>8</p>
        </div>

        <div className="stat-card">
          <h3>Total Support Value</h3>
          <p>$4,500</p>
        </div>

        <div className="stat-card">
          <h3>Active Buyers</h3>
          <p>3</p>
        </div>
      </div>

      {/* Available Offers */}
      <div className="section">
        <h2>Available Offers</h2>

        <div className="table-wrapper">
          <table className="offers-table">
            <thead>
              <tr>
                <th>Offer ID</th>
                <th>Buyer</th>
                <th>Contract</th>
                <th>Type</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Value</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {offers.map((offer) => (
                <tr key={offer.id}>
                  <td>{offer.id}</td>
                  <td>{offer.buyer}</td>
                  <td>{offer.contract}</td>
                  <td>{offer.type}</td>
                  <td>{offer.item}</td>
                  <td>{offer.quantity}</td>
                  <td>{offer.value}</td>
                  <td>{offer.date}</td>

                  <td>
                    <span className={`status ${offer.status.toLowerCase()}`}>
                      {offer.status}
                    </span>
                  </td>

                  <td>
                    {offer.status === "Pending" ? (
                      <div className="action-buttons">
                        <button className="accept-btn">Accept</button>

                        <button className="reject-btn">Reject</button>
                      </div>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Support History */}
      <div className="section">
        <h2>Support History</h2>

        <div className="table-wrapper">
          <table className="offers-table">
            <thead>
              <tr>
                <th>Buyer</th>
                <th>Contract</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Value</th>
                <th>Received Date</th>
              </tr>
            </thead>

            <tbody>
              {history.map((item, index) => (
                <tr key={index}>
                  <td>{item.buyer}</td>
                  <td>{item.contract}</td>
                  <td>{item.item}</td>
                  <td>{item.quantity}</td>
                  <td>{item.value}</td>
                  <td>{item.receivedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="section">
        <h2>Support Deduction Summary</h2>

        <div className="summary-box">
          <p>
            Contract Value:
            <strong>$10,000</strong>
          </p>

          <p>
            Seeds Support:
            <strong>$800</strong>
          </p>

          <p>
            Fertilizer Support:
            <strong>$500</strong>
          </p>

          <p>
            Cash Advance:
            <strong>$1,000</strong>
          </p>

          <hr />

          <p className="final-payment">
            Final Payment:
            <strong>$7,700</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyOffers;
