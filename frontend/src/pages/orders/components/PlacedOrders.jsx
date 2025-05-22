import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// const placedOrders = [
//   {
//     id: 1,
//     items: ["Pain Reliever", "Vitamin C"],
//     total: 25.0,
//     status: "Processing",
//   },
//   { id: 2, items: ["Cough Syrup"], total: 10.0, status: "Shipped" },
//   {
//     id: 3,
//     items: ["Bandages", "Antiseptic Cream"],
//     total: 18.5,
//     status: "Delivered",
//   },
// ];

const PlacedOrders = () => {
  const [placedOrders, setPlacedOrders] = useState([]);
  const backend = import.meta.env.VITE_BACKEND;

  const navigate = useNavigate();

  // console.log('res')

  useEffect(() => {
    fetch(`${backend}/api/getOrderItems`, { credentials: "include" })
      .then((res) => res.text())
      .then((res) => JSON.parse(res))
      .then((res) => {
        // console.log(res);
        const ordersMap = {};

        res.forEach((item) => {
          if (!ordersMap[item.userOrders.orderId]) {
            ordersMap[item.userOrders.orderId] = [];
          }

          ordersMap[item.userOrders.orderId].push(item);
        });

        setPlacedOrders(
          Object.keys(ordersMap).map((orderId) => {
            const order = ordersMap[orderId];
            const items = order.map(
              (item) => item.pharmMedInfo.medication.name
            );
            // console.log(items,'ss')

            return {
              id: orderId,
              items: items,
              total: order[0].userOrders.price,
              status: order[0].userOrders.status,
            };
          })
        );

        // console.log(ordersMap)
      });
  }, []);

  const pendingOrders = placedOrders.filter(
    (order) => order.status !== "Delivered"
  );
  const finishedOrders = placedOrders.filter(
    (order) => order.status === "Delivered"
  );

  return (
    <div className="p-6 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Placed Orders</h1>

      <div className="w-full max-w-4xl flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Pending</h2>
          <div className="flex flex-col gap-4">
            {pendingOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-4 rounded-lg shadow-md"
                onClick={() => navigate(`/ordertracking?orderID=${order.id}`)}
              >
                <h2 className="text-xl font-semibold mb-2">
                  Order #{order.id}
                </h2>
                <p className="text-gray-700">Items: {order.items.join(", ")}</p>
                <p className="font-bold mt-2">
                  Total: ${order.total.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Status: {order.status}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Delivered</h2>
          <div className="flex flex-col gap-4">
            {finishedOrders.map((order) => (
              <div key={order.id} className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">
                  Order #{order.id}
                </h2>
                <p className="text-gray-700">Items: {order.items.join(", ")}</p>
                <p className="font-bold mt-2">
                  Total: ${order.total.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Status: {order.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacedOrders;
