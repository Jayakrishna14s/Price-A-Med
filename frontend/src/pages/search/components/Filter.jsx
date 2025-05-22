import React from "react";
import { useState } from "react";

const Filter = ({ setFilters }) => {
  const [price, setPrice] = useState(500);
  const [rating, setRating] = useState(0);

  function clearFilters() {
    setFilters({
      deliveryOptions: "none",
      distance: "none",
      dosageForm: "none",
    });
  }

  function handleDosageFormChange(dosageType) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      dosageForm: dosageType,
    }));
  }

  function handleSortByDistance(distanceType) {
    if (distanceType == "nearest") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        distance: "nearest",
      }));
    } else if (distanceType == "farthest") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        distance: "farthest",
      }));
    }
  }

  function handleDeliveryOption(deliveryType) {
    if (deliveryType == "instore") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        deliveryOptions: "instore",
      }));
    } else if (deliveryType == "homeDelivery") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        deliveryOptions: "homeDelivery",
      }));
    }
  }

  return (
    <div className="w-full h-full bg-[#035c67] p-4 border-1 border-[#aaa] shadow-lg text-white">
      <h1 className="font-semibold text-3xl m-2">Filters</h1>
      <h2 className="m-2 mb-0 font-semibold underline">Delivery Options</h2>
      <ul className="m-2 mb-4">
        <li>
          <input
            type="radio"
            id="instore"
            name="deliveryOption"
            value="instore"
            onClick={() => handleDeliveryOption("instore")}
          />{" "}
          <label htmlFor="instore">In-store Pickup</label>
        </li>
        <li>
          <input
            type="radio"
            id="homeDelivery"
            name="deliveryOption"
            value="homeDelivery"
            onClick={() => handleDeliveryOption("homeDelivery")}
          />{" "}
          <label htmlFor="homeDelivery">Home Delivery</label>
        </li>
      </ul>

      <h2 className="m-2 mb-0 font-semibold underline">Sort by Distance</h2>
      <ul className="m-2 mb-4">
        <li>
          <input
            type="radio"
            id="nearest"
            name="distanceSort"
            value="nearest"
            onClick={() => handleSortByDistance("nearest")}
          />{" "}
          <label htmlFor="nearest">Nearest First</label>
        </li>
        <li>
          <input
            type="radio"
            id="farthest"
            name="distanceSort"
            value="farthest"
            onClick={() => handleSortByDistance("farthest")}
          />{" "}
          <label htmlFor="farthest">Farthest First</label>
        </li>
      </ul>

      <h2 className="m-2 mb-0 font-semibold underline">Dosage Form</h2>
      <ul className="m-2 mb-4">
        {["Tablet", "Capsule", "Syrup", "Powder", "Cream", "Injectable"].map(
          (form) => (
            <li key={form}>
              <input
                type="radio"
                id={form}
                name="dosageForm"
                value={form}
                onClick={() => handleDosageFormChange(form)}
              />{" "}
              <label htmlFor={form}>
                {form.charAt(0).toUpperCase() + form.slice(1)}
              </label>
            </li>
          )
        )}
      </ul>

      <button
        onClick={clearFilters}
        className="mt-4 w-full bg-white text-[#035c67] font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default Filter;
