import React, { useEffect, useState } from "react";
import Navbar from "../../Components-Common/Navbar";
import { useSearchParams } from "react-router-dom";

// const order = {
//   id: 101,
//   items: [
//     { name: "Pain Reliever", quantity: 2, price: 10.0 },
//     { name: "Vitamin C", quantity: 1, price: 5.0 },
//     { name: "Cough Syrup", quantity: 1, price: 12.0 },
//   ],
//   total: 37.0,
//   discount: 5.0,
//   finalTotal: 32.0,
//   status: "Delivered",
//   tracking: [
//     { time: "10:00 AM", date: "Apr 1", status: "Order Validated" },
//     { time: "2:00 PM", date: "Apr 2", status: "Order Shipped" },
//     { time: "5:00 PM", date: "Apr 3", status: "Delivered" },
//   ],
// };

const OrderTracking = () => {
  const [order, setOrder] = useState([]);
  const [tracking, setTracking] = useState(0);
  const [invalid, setInvalid] = useState(false);
  const [feedback, setFeedback] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const orderID = searchParams.get("orderID");
  const backend = import.meta.env.VITE_BACKEND;

  useEffect(() => {
    fetch(`${backend}/api/getOrderItemsByID?orderID=${orderID}`, {
      credentials: "include",
    })
      .then((res) => res.text())
      .then((res) => JSON.parse(res))
      .then((res) => {
        let totalPrice = 0;
        res.forEach((item) => {
          totalPrice += item.pharmMedInfo.unitPrice * item.quantity;
        });
        setOrder({
          id: orderID,
          items: res.map((item) => ({
            name: item.pharmMedInfo.medication.name,
            quantity: item.quantity,
            price: item.pharmMedInfo.unitPrice,
          })),
          total: totalPrice,
          discount: totalPrice - res[0].userOrders.price,
          finalTotal: res[0].userOrders.price,
          status: res[0].userOrders.status,
          tracking: [
            { time: "10:00 AM", date: "Apr 1", status: "Order Confirmed" },
            { time: "2:00 PM", date: "Apr 2", status: "Validation" },
            { time: "5:00 PM", date: "Apr 3", status: "Delivered" },
          ],
        });

        if (res[0].userOrders.status == "Invalid") {
          setFeedback(res[0].userOrders.feedBack);
          setInvalid(true);
        } else if (res[0].userOrders.status == "Validated") {
          setTracking(1);
        } else if (res[0].userOrders.status == "Delivered") {
          setTracking(2);
        }
      });
  }, [orderID]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar index={2} className="flex-none" />
      <div className="flex-1 overflow-scroll p-6">
        <h1 className="text-3xl font-bold mb-6">Order Tracking</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Order #{order.id}</h2>

          <div className="mb-6">
            {order.tracking &&
              order.tracking.map((step, index) => (
                <div key={index} className="flex items-center gap-4 py-2">
                  <div
                    className={`w-6 h-6 flex items-center justify-center rounded-full text-white font-bold ${
                      !invalid
                        ? index <= tracking
                          ? "bg-green-500"
                          : index - 1 === tracking
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                        : index == 0
                        ? "bg-green-500"
                        : index == 1
                        ? "bg-red-500"
                        : "bg-gray-400"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold">{step.status}</span>
                    <span className="text-sm text-gray-500">
                      {!invalid || index != 1
                        ? `${step.date} at ${step.time}`
                        : feedback}
                    </span>
                  </div>
                </div>
              ))}
          </div>

          <h3 className="text-lg font-semibold mb-3">Order Details</h3>
          <ul className="mb-4 border rounded-lg p-4 bg-gray-50">
            {order.items &&
              order.items.map((item, index) => (
                <li key={index} className="flex justify-between border-b py-2">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
          </ul>
          <div className="text-lg font-bold flex justify-between">
            <span>Subtotal:</span>
            <span>${order.total && order.total.toFixed(2)}</span>
          </div>
          <div className="text-lg flex justify-between text-red-500">
            <span>Discount:</span>
            <span>-${order.discount && order.discount.toFixed(2)}</span>
          </div>
          <div className="text-xl font-bold flex justify-between mt-2">
            <span>Final Total:</span>
            <span>${order.finalTotal && order.finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
