import React from "react";

const RicePurchases = () => {
  const purchases = [
    {
      id: "P001",
      farmer: "Mg Mg",
      rice: "Paw San",
      quantity: "2000kg",
      status: "Delivered",
    },
  ];

  return (
    <div className="container mt-4">
      <h2>Rice Purchases</h2>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Farmer</th>
            <th>Rice Type</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {purchases.map((purchase) => (
            <tr key={purchase.id}>
              <td>{purchase.id}</td>
              <td>{purchase.farmer}</td>
              <td>{purchase.rice}</td>
              <td>{purchase.quantity}</td>
              <td>{purchase.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RicePurchases;
