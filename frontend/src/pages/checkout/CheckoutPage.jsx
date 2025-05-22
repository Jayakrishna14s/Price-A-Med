import React from "react";
import Navbar from "/src/Components-Common/Navbar";
import Checkout from "/src/pages/checkout/components/Checkout";

const CheckoutPage = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* <Navbar index={2} className="flex-none" /> */}
      <Checkout className="flex-1 overflow-scroll" />
    </div>
  );
};

export default CheckoutPage;
