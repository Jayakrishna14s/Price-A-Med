import React, { useEffect, useRef, useState } from "react";

const PrescriptionCard = ({ prescription }) => {
  return (
    <li className="list-none bg-[#f1f5f9] p-4 shadow-lg rounded-md hover:scale-105 transition duration-1000 border-2 border-gray-200">
      <h1 className="text-center font-medium underline mb-4">
        {prescription.condition} Prescribed by {prescription.doctor}
      </h1>

      <div className="flex justify-between text-sm text-[#035c67]">
        <span>
          <strong>Start Date:</strong> {prescription.startDate}
        </span>
        <span>
          <strong>End Date:</strong> {prescription.endDate}
        </span>
      </div>

      <div className="">
        <h2>
          <strong>Hospital:</strong> {prescription.hospital}
        </h2>
        <h2>
          <strong>Doctor:</strong> {prescription.doctor}
        </h2>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold">Medications:</h2>

        <div className="h-[100px] overflow-scroll  p-2 rounded scrollbar overflow-x-hidden scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent">
          {prescription.medicationList.length === 0 && (
            <p className="text-orange-400 "> No Medications</p>
          )}
          {prescription.medicationList.map((medication, index) => {
            return (
              <div key={index} className="flex justify-between ">
                <span>
                  {index + 1}. &nbsp; {medication.name}
                </span>
                <span>{medication.dosageType}</span>
                <span>{medication.strength}</span>
              </div>
            );
          })}
        </div>
      </div>
      <br />

      <div className="flex justify-between">
        <button className="bg-green-200 hover:bg-green-300 p-2 px-4 rounded-lg flex gap-2 items-center">
          <img
            src="https://res.cloudinary.com/dkezdazmt/image/upload/v1737955835/Evernorth/view.svg"
            className="w-[25px]"
            alt="View Icon"
          />
          <span>
            <a href={prescription.prescriptionUrl} target="__blank__">
              View
            </a>
          </span>
        </button>
        {/* <button className="bg-blue-200 hover:bg-blue-300 p-2 px-4 rounded-lg flex gap-2 items-center">
          <img
            src="https://res.cloudinary.com/dkezdazmt/image/upload/v1737923528/Evernorth/gmaps.svg"
            className="w-[20px]"
            alt="Locate Icon"
          />
          <span>Locate</span>
        </button> */}
      </div>
    </li>
  );
};

const Prescriptions = () => {
  const backend = import.meta.env.VITE_BACKEND;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [older, setOlder] = useState([]);
  const [current, setCurrent] = useState([]);

  const [meds, setMeds] = useState([]);
  const [dependents, setDependents] = useState([]);
  const [selectedDependent, setSelectedDependent] = useState("");

  const [selectedMeds, setSelectedMeds] = useState([]);
  console.log(selectedMeds);
  const [medSearch, setMedSearch] = useState("");
  const [isMedDropdownOpen, setIsMedDropdownOpen] = useState(false);
  const medDropdownRef = useRef(null);

  useEffect(() => {
    fetch(`${backend}/api/getMeds`, {
      credentials: "include",
    })
      .then((res) => res.text())
      .then((res) => JSON.parse(res))
      .then((res) => {
        console.log(res);
        setMeds(res);
      });
  }, []);

  useEffect(() => {
    fetch(`${backend}/api/getDependents`, {
      credentials: "include",
    })
      .then((res) => res.text())
      .then((res) => JSON.parse(res))
      .then((res) => {
        console.log(res, "dep");
        setDependents(res);
      });
  }, []);

  const addMed = (med) => {
    if (!selectedMeds.some((selected) => selected.id === med.id)) {
      setSelectedMeds([...selectedMeds, med]);
    }
  };

  const removeMed = (id) => {
    setSelectedMeds(selectedMeds.filter((med) => med.id !== id));
  };
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        medDropdownRef.current &&
        !medDropdownRef.current.contains(event.target)
      ) {
        setIsMedDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetch(`${backend}/api/getPrescriptions?memberId=${"ENM$Hduu5wFX"}`, {
      credentials: "include",
    })
      .then((res) => res.text())
      .then((res) => {
        const resObj = JSON.parse(res);
        console.log(resObj);

        const today = new Date();

        const olderPrescriptions = [];
        const currentPrescriptions = [];

        resObj.forEach((prescriptions) => {
          const prescription = prescriptions.prescription;
          const endDate = new Date(prescription.endDate);

          if (endDate < today) {
            olderPrescriptions.push({
              id: prescription.id,
              condition: prescription.conditionName,
              startDate: prescription.startDate,
              endDate: prescription.endDate,
              hospital: prescription.hospitalName,
              doctor: prescription.doctorName,
              prescriptionUrl: prescription.prescriptionUrl,
              medicationList: prescriptions.prescribedMeds,
            });
          } else {
            currentPrescriptions.push({
              id: prescription.id,
              condition: prescription.conditionName,
              startDate: prescription.startDate,
              endDate: prescription.endDate,
              hospital: prescription.hospitalName,
              doctor: prescription.doctorName,
              prescriptionUrl: prescription.prescriptionUrl,
              medicationList: prescriptions.prescribedMeds,
            });
          }
        });

        setOlder(olderPrescriptions);
        setCurrent(currentPrescriptions);

        console.log(olderPrescriptions, "old");
        console.log(currentPrescriptions, "curr");
      });
  }, []);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    memberId: "ENM$Hduu5wFX",
    startDate: "",
    endDate: "",
    doctorName: "",
    hospitalName: "",
    prescriptionUrl: "",
    conditionName: "",
    dependentID: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  console.log(JSON.stringify(formData));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      setError("End Date cannot be earlier than Start Date.");
      return;
    }
    console.log(formData);
    console.log(formData.startDate < formData.endDate);

    await fetch(`${backend}/api/addPrescription`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        memberId: formData.memberId,
        startDate: formData.startDate,
        endDate: formData.endDate,
        doctorName: formData.doctorName,
        hospitalName: formData.hospitalName,
        prescriptionUrl: formData.prescriptionUrl,
        conditionName: formData.conditionName,
        medications: selectedMeds,
        dependentID: formData.dependentID,
      }),
    }).then((res) => console.log(res.status));

    setFormData({
      memberId: "ENM$Hduu5wFX",
      startDate: "",
      endDate: "",
      doctorName: "",
      hospitalName: "",
      prescriptionUrl: "",
      conditionName: "",
      dependentID: "",
    });
    setShowForm(false);
  };

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "PrescriptionUpload");
    formData.append("resource_type", "raw");

    setLoading(true);
    let data;
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dkezdazmt/raw/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      data = await response.json();
      if (data.secure_url) {
        setFormData((prev) => ({ ...prev, prescriptionUrl: data.secure_url }));
      }
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
    }
    console.log("Done", data.secure_url);
    setLoading(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  useEffect(() => {
    console.log("Updated showForm state:", showForm);
  }, [showForm]);

  return (
    <div className="w-full">
      {/* current */}
      <div className="m-8 p-8 rounded-lg bg-white shadow-lg">
        <h1 className="font-semibold  text-2xl  mb-4 ml-2">Current</h1>
        <ul className="grid grid-cols-3 gap-8">
          {current.map((prescription) => (
            <PrescriptionCard
              key={prescription.id}
              prescription={prescription}
            />
          ))}

          {/* {currentPrescriptions.length === 0 && (
            <img
              src="https://res.cloudinary.com/dkezdazmt/image/upload/v1737902486/Evernorth/history.svg"
              className="w-[60px] pl-2"
            />
          )} */}
          <div
            className="flex flex-col justify-center items-center gap-2"
            onClick={() => setShowForm(true)}
          >
            <img
              src="https://res.cloudinary.com/dkezdazmt/image/upload/v1737899776/add.svg"
              className="h-[80px] hover:scale-110 transition duration-1000 "
            />
            <p>Add a prescription</p>
            {showForm && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                  <h2 className="text-xl font-semibold mb-4">
                    Add Prescription
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="block font-medium">
                        Condition Name
                      </label>
                      <input
                        type="text"
                        name="conditionName"
                        value={formData.conditionName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block font-medium">Start Date</label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block font-medium">End Date</label>
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block font-medium">Doctor Name</label>
                      <input
                        type="text"
                        name="doctorName"
                        value={formData.doctorName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block font-medium">Hospital Name</label>
                      <input
                        type="text"
                        name="hospitalName"
                        value={formData.hospitalName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block font-medium">
                        Upload Prescription (PDF)
                      </label>
                      <input
                        type="file"
                        name="prescriptionFile"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </div>

                    {/* Medications Dropdown */}
                    <div className="relative mt-4" ref={medDropdownRef}>
                      <label className="block font-medium">
                        Select Medications
                      </label>
                      <input
                        type="text"
                        placeholder="Search medications..."
                        value={medSearch}
                        onChange={(e) => setMedSearch(e.target.value)}
                        onFocus={() => setIsMedDropdownOpen(true)}
                        className="w-full p-2 border rounded-lg"
                      />

                      {isMedDropdownOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-52 overflow-y-auto">
                          {meds
                            .filter((med) =>
                              med.name
                                .toLowerCase()
                                .includes(medSearch.toLowerCase())
                            )
                            .map((med) => (
                              <div
                                key={med.id}
                                onClick={() => {
                                  addMed(med);
                                  setIsMedDropdownOpen(false);
                                  setMedSearch(""); // Clear search after selection
                                }}
                                className="p-2 hover:bg-gray-100 cursor-pointer transition-colors"
                              >
                                {med.name} ({med.strength})
                              </div>
                            ))}
                        </div>
                      )}
                    </div>

                    {/* Display Selected Medications */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedMeds.map((med) => (
                        <div
                          key={med.id}
                          className="flex items-center bg-gray-100 text-[#035c67] rounded-full px-3 py-1"
                        >
                          <span className="text-sm">
                            {med.name} ({med.strength})
                          </span>
                          <button
                            onClick={() => removeMed(med.id)}
                            type="button"
                            className="ml-2 text-blue-700 hover:text-blue-900"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="mb-4">
                      <label className="block font-medium">Dependent</label>
                      <select
                        name="dependentID"
                        value={formData.dependentID}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                      >
                        <option value="" disabled>
                          Select a Dependent
                        </option>
                        <option value="Self">Self</option>
                        {dependents.map((dependent) => (
                          <option
                            key={dependent.dependentID}
                            value={dependent.dependentID}
                          >
                            {dependent.dependentName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex justify-end gap-4">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowForm(false);
                          console.log("clicked");
                        }}
                        className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        disabled={loading}
                      >
                        Add
                      </button>
                    </div>
                    {error && (
                      <p className="text-red-500 text-sm mb-2">{error}</p>
                    )}
                  </form>
                </div>
              </div>
            )}
          </div>
        </ul>
      </div>
      {/* older */}

      <div className="m-8 p-8 rounded-lg bg-white shadow-lg">
        <h1 className="font-semibold  text-2xl  mb-4 ml-2">Older</h1>
        <ul className="grid grid-cols-3 gap-8">
          {older.map((prescription) => (
            <PrescriptionCard
              key={prescription.id}
              prescription={prescription}
            />
          ))}

          {older.length === 0 && (
            <img
              src="https://res.cloudinary.com/dkezdazmt/image/upload/v1737902486/Evernorth/history.svg"
              className="w-[60px] pl-2"
            />
          )}
        </ul>
      </div>
    </div>
  );
};

export default Prescriptions;
