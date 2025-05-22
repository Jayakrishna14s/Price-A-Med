import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Medicines = ({ setCartCount }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");
  const [searchMedicines, setSearchMedicines] = useState([]);

  const [discount, setDiscount] = useState(0);

  const [medicines, setMedicines] = useState([]);
  const navigate = useNavigate();

  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const [quantities, setQuantities] = useState({}); // Store quantity per item ID
  const backend = import.meta.env.VITE_BACKEND;

  useEffect(() => {
    setCartCount(Object.keys(quantities).length);
  }, [quantities]);

  useEffect(() => {
    fetch(`${backend}/api/getPrescriptions`, { credentials: "include" })
      .then((res) => res.text())
      .then((res) => JSON.parse(res))
      .then((res) => {
        console.log(res);

        setPrescriptions(res);
      });
  }, []);

  function handlePrescriptionSelect(id) {}

  const handleAddToCart = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: 1 }));

    fetch(`${backend}/api/addToCart?itemID=${id}`, {
      method: "POST",
      credentials: "include",
    }).then((res) => console.log(res.status));
  };

  const increaseQuantity = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));

    fetch(
      `${backend}/api/updateCartQuantity?itemID=${id}&operation=${encodeURIComponent(
        "+"
      )}`,
      {
        method: "POST",
        credentials: "include",
      }
    ).then((res) => console.log(res.status));
  };

  const decreaseQuantity = (id) => {
    setQuantities((prev) => {
      const newQuantity = (prev[id] || 0) - 1;
      if (newQuantity <= 0) {
        const { [id]: _, ...rest } = prev; // Remove item from state if 0
        return rest;
      }
      return { ...prev, [id]: newQuantity };
    });

    fetch(
      `${backend}/api/updateCartQuantity?itemID=${id}&operation=${encodeURIComponent(
        "-"
      )}`,
      {
        method: "POST",
        credentials: "include",
      }
    ).then((res) => console.log(res.status));
  };

  // const quantity = quantities[medicineCard.id] || 0;

  function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const toRad = (angle) => (angle * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = R * c; // Distance in km

    return distanceKm * 0.621371; // Convert to miles
  }

  const [distanceMap, setDistanceMap] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;

      const map = {};

      medicines.forEach((med) => {
        if (!map[med.pharmID]) {
          map[med.pharmID] =
            haversineDistance(
              userLat,
              userLng,
              med.desLat,
              med.destLong
            ).toFixed(0) + " miles";
        }
      });

      // const updatedMedicines = medicines.map((med) => ({
      //   ...med,
      //   distance: haversineDistance(userLat, userLng, med.desLat, med.destLong).toFixed(2) + " km",
      // }));
      console.log(map + "mapp");
      setDistanceMap(map);
    });
  }, [medicines]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add search functionality here
  };

  useEffect(() => {
    fetch(
      `${backend}/api/home/getHome?prescriptionID=${
        selectedPrescription || -1
      }`,
      { credentials: "include" }
    )
      .then((res) => res.text())
      .then((res) => {
        console.log(JSON.parse(res));
        const response = JSON.parse(res);
        setQuantities(response.quantities);
        console.log(Object.keys(response.quantities).length);
        setCartCount(Object.keys(response.quantities).length);
        setDiscount(response.memberDiscount);
        setMedicines(
          response.pharmMedInfos.map((ele) => ({
            id: ele.id,
            title: ele.medication.name,
            description: ele.medication.description,
            image: ele.medication.medImage,
            homeDelivery: ele.pharmacy.homeDelivery,
            location: ele.pharmacy.location,
            price: ele.unitPrice,
            strength: ele.medication.strength,
            dosage: ele.medication.dosageType,
            rating: ele.pharmacy.rating,
            desLat: ele.pharmacy.lat,
            destLong: ele.pharmacy.longitude,
            pharmID: ele.pharmacy.id,
          }))
        );
      });
  }, [selectedPrescription]);

  function medicineSearch(id) {
    console.log(discount);
    navigate(
      `/search?id=${id}&discount=${discount}&selectedPrescription=${selectedPrescription}`
    );
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (debounceQuery) {
      console.log("Search Start!");
      fetch(
        `${backend}/api/home/search?query=${debounceQuery}&prescriptionID=${
          selectedPrescription || -1
        }`,
        {
          credentials: "include",
        }
      )
        .then((res) => res.text())
        .then((res) =>
          console.log("Result is ", setSearchMedicines(JSON.parse(res)))
        );
    }
  }, [debounceQuery]);

  // const scrollRef = useRef(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setSearchQuery("");
  //   };

  //   const scrollContainer = scrollRef.current;
  //   if (scrollContainer) {
  //     scrollContainer.addEventListener("scroll", handleScroll);
  //   }

  //   return () => {
  //     if (scrollContainer) {
  //       scrollContainer.removeEventListener("scroll", handleScroll);
  //     }
  //   };
  // }, []);

  return (
    <div className="h-full flex flex-col w-full">
      <div className="flex-none-500 p-4">
        <div className="flex items-center justify-between w-full bg-gray-100 overflow-scroll">
          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-white shadow-lg rounded-full p-2 w-[70%]"
          >
            <div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search for Medicines"
                className="flex-1 outline-none px-4 py-2 text-gray-700 rounded-l-full"
              />
              {/* <button
                type="submit"
                className="bg-[#035c67] hover:bg-[#aaa] text-white rounded-full px-4 py-2 transition duration-300"
              >
                Search
              </button> */}
              {debounceQuery && searchMedicines.length > 0 && (
                <ul className="absolute bg-white w-[65%] border border-gray-300 rounded-b-lg mt-1 z-10 shadow-lg rounded-lg mt-4">
                  {searchMedicines.map((result) => (
                    <li
                      key={result.id}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => medicineSearch(result.id)}
                    >
                      <div className="flex items-center">
                        <img
                          src={`${result.medImage}`} // Replace with actual path
                          alt={result.name}
                          className="w-8 h-8 object-cover mr-2"
                        />
                        <div>
                          <div className="font-semibold">{result.name}</div>
                          <div className="text-sm text-gray-600">
                            {result.description}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </form>

          <div className=" z-10 flex justify-end">
            <div className="w-[300px] p-4 bg-white shadow-lg rounded-lg ml-auto mr-4 text-sm">
              <h2 className="font-bold text-lg mb-2">Select a Prescription</h2>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={selectedPrescription || ""}
                onChange={(e) => {
                  const prescriptionId = e.target.value;
                  setSelectedPrescription(prescriptionId);
                  handlePrescriptionSelect(prescriptionId);
                }}
              >
                <option value="-1">
                  {selectedPrescription == -1
                    ? "Select a Prescription"
                    : "None"}
                </option>
                {prescriptions.map((prescription) => (
                  <option
                    key={prescription.prescription.id}
                    value={prescription.prescription.id}
                  >
                    {prescription.prescription.conditionName} treated by{" "}
                    {prescription.prescription.doctorName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ------------------------------------- */}
      </div>

      <div className="flex-1  overflow-scroll p-4 py-8">
        <ul className="grid grid-cols-2 gap-4">
          {medicines.map((medicineCard) => (
            <li
              key={medicineCard.id}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <div className="flex gap-4">
                <img
                  className="w-[200px] h-[200px] rounded-lg flex-none"
                  src={medicineCard.image}
                />

                <div className="flex-1">
                  <div className=" flex justify-between mb-2">
                    <h3 className="font-bold text-xl">{medicineCard.title}</h3>
                    {/* <h3 className="bg-[#3EFFC066] px-2 rounded-2xl">
                      {medicineCard.price}$
                    </h3> */}
                    <h3 className="bg-[#3EFFC066] px-2 rounded-2xl flex items-center gap-2">
                      <span className="line-through text-gray-500">
                        {medicineCard.price}$
                      </span>
                      <span className="font-bold text-green-600">
                        {(medicineCard.price * (1 - discount / 100)).toFixed(2)}
                        $
                      </span>
                    </h3>
                  </div>
                  <p className="text-gray-700">{medicineCard.description}</p>
                  <div className="my-1 flex gap-1 items-center">
                    <img
                      className="h-[18px]"
                      src="https://res.cloudinary.com/dkezdazmt/image/upload/v1737923702/Evernorth/ratingstar.svg"
                    />
                    <span className="text-yellow-500">
                      {medicineCard.rating}
                    </span>
                  </div>
                  <h3 className="my-1">
                    <span className="font-semibold">Strength:</span>{" "}
                    <span className="font-medium">{medicineCard.strength}</span>
                  </h3>

                  <h3 className="my-1">
                    <span className="font-semibold">Dosage:</span>{" "}
                    <span className="font-medium">{medicineCard.dosage}</span>
                  </h3>
                </div>
              </div>

              <div className="flex justify-between p-2 mt-4 ">
                <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg hover:scale-105 transition duration-1000">
                  <img
                    className="w-[15px]"
                    src="https://res.cloudinary.com/dkezdazmt/image/upload/v1737923528/Evernorth/gmaps.svg"
                  />
                  <span className="text-sm">{medicineCard.location}</span>
                  <h3 className="text-sm text-gray-600">
                    Distance: {distanceMap[medicineCard.pharmID]}
                  </h3>
                </button>
                {medicineCard.homeDelivery && (
                  <div className="flex items-center gap-2 hover:scale-105 transition duration-1000 cursor-pointer">
                    <img
                      className="w-[25px]"
                      src="https://res.cloudinary.com/dkezdazmt/image/upload/v1737924542/Evernorth/truck.svg"
                    />
                    <span className="text-sm">
                      <p> Home Delivery</p>
                    </span>
                  </div>
                )}
                {medicineCard.homeDelivery &&
                  ((quantities[medicineCard.id] || 0) === 0 ? (
                    <button
                      className="flex items-center gap-2 bg-[#035c67] p-2 rounded-lg hover:bg-[#035c67aa] hover:scale-105 transition duration-1000"
                      onClick={() => handleAddToCart(medicineCard.id)}
                    >
                      <img
                        className="w-[22px]"
                        src="https://res.cloudinary.com/dkezdazmt/image/upload/v1737924699/Evernorth/cartt.svg"
                      />
                      <span className="text-sm text-white">Add to Cart</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 border border-gray-300 px-3 py-1 rounded-lg">
                      <button
                        className="text-lg font-bold text-gray-700 hover:text-red-600"
                        onClick={() => decreaseQuantity(medicineCard.id)}
                      >
                        {" "}
                        -{" "}
                      </button>
                      <span className="text-lg font-semibold">
                        {quantities[medicineCard.id] || 0}
                      </span>
                      <button
                        className="text-lg font-bold text-gray-700 hover:text-green-600"
                        onClick={() => increaseQuantity(medicineCard.id)}
                      >
                        {" "}
                        +{" "}
                      </button>
                    </div>
                  ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Medicines;
