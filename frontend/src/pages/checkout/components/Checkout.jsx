import React, { useEffect, useState } from "react";
// import Navbar from "/src/Components-Common/Navbar";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  // const cartItems = [
  //   { id: 1, name: "Pain Reliever", quantity: 2, price: 10 },
  //   { id: 2, name: "Vitamin C", quantity: 1, price: 15 },
  // ];
  // const discount = 10;
  // const savedAddresses = [
  //   { id: 1, label: "Home - 123 Main St, City A" },
  //   { id: 2, label: "Work - 456 Elm St, City B" },
  // ];
  // const savedPayments = [
  //   { id: 1, label: "Visa - **** 1234" },
  //   { id: 2, label: "MasterCard - **** 5678" },
  // ];
  // const members = [
  //   { id: 1, name: "John Doe", prescriptions: ["Ibuprofen", "Aspirin"] },
  //   { id: 2, name: "Jane Doe", prescriptions: ["Paracetamol"] },
  // ];

  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState("");

  const [cartItems, setCartItems] = useState([]);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [savedPayments, setSavedPayments] = useState([]);
  const [members, setMembers] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const backend = import.meta.env.VITE_BACKEND;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${backend}/api/getCheckout`, { credentials: "include" })
      .then((res) => res.text())
      .then((res) => JSON.parse(res))
      .then((res) => {
        console.log(res);

        setCartItems(
          res.cartItems.map((item) => ({
            id: item.id,
            name: item.item.medication.name,
            quantity: item.quantity,
            price: item.unitPrice,
          }))
        );

        setSavedAddresses(
          res.deliveryAddresses.map((item) => ({
            id: item.addressID,
            label: `${item.houseNo} - ${item.landmark}`,
          }))
        );

        const map = {};

        res.prescriptions.forEach((item) => {
          if (!map[item.dependentID || -1]) {
            map[item.dependentID || -1] = [];
          }
          map[item.dependentID || -1].push(
            `${item.conditionName} treated by ${item.doctorName}`
          );
        });

        const memberss = res.dependents.map((item) => ({
          id: item.dependentID,
          name: item.dependentName,
          prescriptions: map[item.dependentID || -1] || [],
        }));

        memberss.push({
          id: -1,
          name: "Self",
          prescriptions: map[-1],
        });

        // console.log(memberss)

        setMembers(memberss);

        setSavedPayments(
          res.paymentInfos.map((item) => ({
            id: item.cardID,
            label: `${item.cardHolderName} - ${item.cardNumber}`,
          }))
        );

        setDiscount(res.discount);
      });
  }, []);

  const handleMemberChange = (e) => {
    const member = members.find((m) => m.id == e.target.value);
    setSelectedMember(member);
    setFilteredPrescriptions(
      member && member.prescriptions ? member.prescriptions : []
    );
  };

  const handleCheckout = () => {
    fetch(`${backend}/api/orders/placeOrder`, {
      credentials: "include",
      method: "POST",
    }).then((res) => {
      if (res.ok) {
        setOrderPlaced(true);
        setTimeout(() => navigate("/orders"), 1000);
      }
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4 py-8">
      <div className="flex flex-col items-center flex-1 overflow-scroll gap-4">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>

        {/* Order Summary */}
        <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between border-b py-2">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-lg font-bold flex justify-between">
            <span>Discount:</span>
            <span>
              - $
              {(
                (cartItems.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                ) *
                  discount) /
                100
              ).toFixed(2)}
            </span>
          </div>
          <div className="mt-2 text-lg font-bold flex justify-between">
            <span>Final Price:</span>
            <span>
              $
              {(
                cartItems.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                ) *
                (1 - discount / 100)
              ).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Delivery Address Selection */}
        <div className="w-full max-w-3xl bg-white p-6 mt-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Select Delivery Address
          </h2>
          <select
            onChange={(e) => setSelectedAddress(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          >
            <option value="">Select an address</option>
            {savedAddresses.map((addr) => (
              <option key={addr.id} value={addr.label}>
                {addr.label}
              </option>
            ))}
          </select>
        </div>

        {/* Payment Details Selection */}
        <div className="w-full max-w-3xl bg-white p-6 mt-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
          <select
            onChange={(e) => setSelectedPayment(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          >
            <option value="">Select a payment method</option>
            {savedPayments.map((pay) => (
              <option key={pay.id} value={pay.label}>
                {pay.label}
              </option>
            ))}
          </select>
        </div>

        {/* Member Selection */}
        <div className="w-full max-w-3xl bg-white p-6 mt-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Select Member</h2>
          <select
            onChange={handleMemberChange}
            className="w-full p-2 border rounded mb-2"
          >
            <option value="">Select a member</option>
            {/* <option value={-1}>
                Self
              </option> */}
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        {/* Prescription Selection */}
        {selectedMember && (
          <div className="w-full max-w-3xl bg-white p-6 mt-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Select Prescription</h2>
            <select
              onChange={(e) => setSelectedPrescription(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="">Select a prescription</option>
              {filteredPrescriptions.map((prescription, index) => (
                <option key={index} value={prescription}>
                  {prescription}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          onClick={handleCheckout}
          className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-600 transition"
        >
          Validate & Checkout
        </button>
      </div>
      {orderPlaced && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <svg
              className="w-16 h-16 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h2 className="text-xl font-bold mt-4">Order Placed!</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
