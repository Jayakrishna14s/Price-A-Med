import { useEffect, useState } from "react";

const Results = ({
  results,
  discount,
  quantities,
  setQuantities,
  increaseQuantity,
  decreaseQuantity,
  filters,
}) => {
  const [data1, setData1] = useState({ type: "Branded", list: [] });
  const [data2, setData2] = useState({ type: "Generic", list: [] });
  const backend = import.meta.env.VITE_BACKEND;

  const handleAddToCart = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: 1 }));

    fetch(`${backend}/api/addToCart?memberID=${"ENM$Hduu5wFX"}&itemID=${id}`, {
      method: "POST",
      credentials: "include",
    }).then((res) => console.log(res.status));
  };

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
    if (!results.medications) return;

    const medicines = [
      ...(results.medications || []),
      ...(results.alternatives || []),
    ];

    if (medicines.length === 0) return;

    // Get user's location and compute distances first
    navigator.geolocation.getCurrentPosition((position) => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;

      const map = {};
      medicines.forEach((med) => {
        if (!map[med.pharmacy.id]) {
          map[med.pharmacy.id] = haversineDistance(
            userLat,
            userLng,
            med.pharmacy.lat,
            med.pharmacy.longitude
          ).toFixed(0);
        }
      });

      setDistanceMap(map);
      // console.log(map)
    });
  }, [results]);

  //   useEffect(() => {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const userLat = position.coords.latitude;
  //       const userLng = position.coords.longitude;

  //       const medicines = data1.list.concat(data2.list);

  //       const map = {};

  //       medicines.forEach((med) => {
  //         if (!map[med.pharmID]) {
  //           map[med.pharmID] = haversineDistance(userLat, userLng, med.destLat, med.destLong).toFixed(0) + " miles";
  //         }
  //       });

  //       // const updatedMedicines = medicines.map((med) => ({
  //       //   ...med,
  //       //   distance: haversineDistance(userLat, userLng, med.desLat, med.destLong).toFixed(2) + " km",
  //       // }));
  //       setDistanceMap(map);
  //       });
  //   }, [data1, data2]);

  // Process medications to classify them into Branded and Generic

  useEffect(() => {
    // Reset the lists when new results are received
    const tempData1 = { type: "Branded", list: [] };
    const tempData2 = { type: "Generic", list: [] };

    if (results.medications === undefined) return;
    // Process medications
    results.medications.forEach((medicine) => {
      const medication = medicine.medication;
      const pharmacy = medicine.pharmacy;
      const medicationData = {
        id: medicine.id,
        title: medication.name,
        description: medication.description,
        image: medication.medImage, // Assuming this is the image URL
        homeDelivery: pharmacy.homeDelivery,
        location: pharmacy.location,
        price: medicine.unitPrice,
        strength: medication.strength,
        dosage: medication.dosageType,
        rating: pharmacy.rating,
        pharmID: pharmacy.id,
        destLat: pharmacy.lat,
        destLong: pharmacy.longitude,
      };

      if (medication.type === "BRANDED") {
        tempData1.list.push(medicationData);
      } else {
        tempData2.list.push(medicationData);
      }
    });

    // Process alternatives
    if (results.alternatives) {
      results.alternatives.forEach((alternative) => {
        const medication = alternative.medication;
        const pharmacy = alternative.pharmacy;
        const medicationData = {
          id: alternative.id,
          title: medication.name,
          description: medication.description,
          image: medication.medImage, // Assuming this is the image URL
          homeDelivery: pharmacy.homeDelivery,
          location: pharmacy.location,
          price: alternative.unitPrice,
          strength: medication.strength,
          dosage: medication.dosageType,
          rating: pharmacy.rating,
          pharmID: pharmacy.id,
          destLat: pharmacy.lat,
          destLong: pharmacy.longitude,
        };

        if (medication.type === "BRANDED") {
          tempData1.list.push(medicationData);
        } else {
          tempData2.list.push(medicationData);
        }
      });
    }

    if (filters.dosageForm !== "none") {
      tempData1.list = tempData1.list.filter(
        (med) => med.dosage.toLowerCase() === filters.dosageForm.toLowerCase()
      );
      tempData2.list = tempData2.list.filter(
        (med) => med.dosage.toLowerCase() === filters.dosageForm.toLowerCase()
      );
    }

    if (filters.deliveryOptions !== "none") {
      if (filters.deliveryOptions === "instore") {
        tempData1.list = tempData1.list.filter((med) => !med.homeDelivery);
        tempData2.list = tempData2.list.filter((med) => !med.homeDelivery);
      } else {
        tempData1.list = tempData1.list.filter((med) => med.homeDelivery);
        tempData2.list = tempData2.list.filter((med) => med.homeDelivery);
      }
    }

    if (filters.distance !== "none") {
      if (filters.distance === "nearest") {
        console.log(distanceMap);
        tempData1.list.sort((a, b) => {
          return distanceMap[a.pharmID] - distanceMap[b.pharmID];
        });
        tempData2.list.sort(
          (a, b) => distanceMap[a.pharmID] - distanceMap[b.pharmID]
        );
      } else if (filters.distance === "farthest") {
        tempData1.list.sort(
          (a, b) => distanceMap[b.pharmID] - distanceMap[a.pharmID]
        );
        tempData2.list.sort(
          (a, b) => distanceMap[b.pharmID] - distanceMap[a.pharmID]
        );
      }
    }
    console.log(tempData1.list);
    // Update the state with the new data
    setData1(tempData1);
    setData2(tempData2);
  }, [results, filters]); // Re-run this effect when `results` changes

  return (
    <div className="w-full m-2 flex flex-col gap-5 h-full ">
      <span className="p-2 px-3 bg-green-300 w-[100px] text-center rounded-full ">
        {data1.type}
      </span>

      <div className="overflow-scroll pr-6">
        <ul className="flex gap-6  w-full w-max overflow-x-auto">
          {data1.list.map((medicineCard) => (
            <li
              key={medicineCard.id}
              className="bg-white p-4 rounded-lg shadow-md w-[700px]"
            >
              <div className="flex gap-4">
                <img
                  className="w-[200px] h-[200px] rounded-lg flex-none"
                  src={medicineCard.image}
                />

                <div className="flex-1">
                  <div className=" flex justify-between mb-2">
                    <h3 className="font-bold text-xl">{medicineCard.title}</h3>
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

                  {/* <h3 className="my-1">
                    <span className="font-semibold">Store:</span>{" "}
                    <span className="font-medium">{medicineCard.dosage}</span>
                  </h3> */}
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
                    Distance: {distanceMap[medicineCard.pharmID] + " miles"}
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
          <li></li>
        </ul>
      </div>

      <span className="p-2 px-3 bg-blue-300 w-[100px] text-center rounded-full ">
        {data2.type}
      </span>

      <div className="overflow-x-auto pr-6 ">
        <ul className="flex gap-6  w-max overflow-scroll">
          {data2.list.map((medicineCard) => (
            <li
              key={medicineCard.id}
              className="bg-white p-4 rounded-lg shadow-md w-[700px]"
            >
              <div className="flex gap-4">
                <img
                  className="w-[200px] h-[200px] rounded-lg flex-none"
                  src={medicineCard.image}
                />

                <div className="flex-1">
                  <div className=" flex justify-between mb-2">
                    <h3 className="font-bold text-xl">{medicineCard.title}</h3>
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
                    Distance: {distanceMap[medicineCard.pharmID] + " miles"}
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
          <li></li>
        </ul>
      </div>
    </div>
  );
};

export default Results;
