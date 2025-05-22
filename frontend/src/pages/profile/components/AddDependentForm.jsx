import { useEffect, useRef, useState } from "react";
import { AllergiesList, HealthConditionsList, MedicationsList } from "./Lists.jsx";
import axios from "axios";

const AddDependentForm = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [dataSection, setDataSection] = useState({ name: "" });
  const [alertMessage, setAlertMessage] = useState("");

  const [allergyInput, setAllergyInput] = useState("");
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [isAllergiesOpen, setIsAllergiesOpen] = useState(false);
  const allergiesRef = useRef(null);

  const [medicationInput, setMedicationInput] = useState("");
  const [selectedMedications, setSelectedMedications] = useState([]);
  const [isMedicationsOpen, setIsMedicationsOpen] = useState(false);
  const medicationsRef = useRef(null);

  const [conditionInput, setConditionInput] = useState("");
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [isConditionsOpen, setIsConditionsOpen] = useState(false);
  const conditionsRef = useRef(null);

  const addValueToField1 = (setField, field, value) => {
    if (!field.some((item) => item.allergyID === value.allergyID)) {
      setField([...field, value]);
    }
  };

  const removeValueFromField1 = (setField, field, index) => {
    const updatedField = [...field];
    updatedField.splice(index, 1);
    setField(updatedField);
  };

  const addValueToField2 = (setField, field, value) => {
    if (!field.some((item) => item.medicationID === value.medicationID)) {
      setField([...field, value]);
    }
  };

  const removeValueFromField2 = (setField, field, index) => {
    const updatedField = [...field];
    updatedField.splice(index, 1);
    setField(updatedField);
  };

  const addValueToField3 = (setField, field, value) => {
    if (!field.some((item) => item.conditionID === value.conditionID)) {
      setField([...field, value]);
    }
  };

  const removeValueFromField3 = (setField, field, index) => {
    const updatedField = [...field];
    updatedField.splice(index, 1);
    setField(updatedField);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataSection((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (allergiesRef.current && !allergiesRef.current.contains(event.target)) {
        setIsAllergiesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (medicationsRef.current && !medicationsRef.current.contains(event.target)) {
        setIsMedicationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (conditionsRef.current && !conditionsRef.current.contains(event.target)) {
        setIsConditionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const throwIntoCloudinaryAndGetLink = async (img) => {
    if (!img) {
      console.error("No image selected.");
      return null;
    }

    const CLOUD_NAME = "dkezdazmt";
    const UPLOAD_PRESET = "ProfileImages";

    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", UPLOAD_PRESET); // Replace with your preset
    formData.append("cloud_name", CLOUD_NAME); // Replace with your Cloudinary cloud name
    // formData.append("public_id", initialDataSection.memberID);

    try {
      const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          formData
      );

      if (response.data.secure_url) {
        console.log("Image uploaded successfully:", response.data.secure_url);
        return response.data.secure_url;
      } else {
        console.error("Error getting secure URL from Cloudinary.");
        return null;
      }
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      return null;
    }
  };

  const addDependent = async () => {
    if(!dataSection.name || dataSection.name.length === 0 ) {
      setAlertMessage("Enter dependent name");
      return;
    }

    const payload = {
      dependentName: dataSection.name,
      allergies: selectedAllergies,
      conditions: selectedConditions,
      medications: selectedMedications,
      image: imageFile ? await throwIntoCloudinaryAndGetLink(imageFile) : null,
    };
    console.log(payload);


    try {
      const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/auth/user/mps/addDependent`, // Change to your endpoint
          payload, {
            withCredentials: true
          }
      );

      if (response.status === 200) {
        console.log("Profile updated successfully:", response.data);
        alert("Profile updated successfully!");
        window.location.reload();
      } else {
        console.error("Error updating profile:", response.data);
        setAlertMessage("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error in API call:", error);
      setAlertMessage("Error while updating profile. Please check your connection.");
    }

  };

  return (
      <div className="p-4">
        <div className="text-white shadow-lg text-center text-xl font-semibold mb-4 border-b-2 mx-12">
          Add Dependent Details
        </div>

        <h2 className="text-center text-sm text-white font-semibold">
          Create profile
        </h2>
        <div className="flex items-center justify-center w-full">
          <label
              htmlFor="dropzone-file"
              className="p-1 flex flex-col items-center justify-center w-[60%] h-20 border-2 border-black border-dashed rounded-lg cursor-pointer bg-[#3EFFC0] hover:bg-[#3EFFC0CC]"
          >
            {imagePreview != null && (
                <div className="flex justify-center w-[100%] h-[100%]">
                  <img
                      src={imagePreview}
                      alt="Uploaded file preview"
                      className="w-[100%] h-[100%] object-cover rounded-lg"
                  />
                </div>
            )}
            {imagePreview == null && (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                      className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                  >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPEG or JPG (Dimensions allowed: 1/1)
                  </p>
                </div>
            )}
            <input
                type="file"
                id="dropzone-file"
                name="profileImage"
                accept=".png, .jpg, .jpeg"
                className="hidden"
                onFocus={() => {
                  setAlertMessage("");
                }}
                onChange={(event) => {
                  const file = event.target.files[0];
                  if (file) {
                    const fileType = file.type;
                    if (
                        fileType !== "image/png" &&
                        fileType !== "image/jpeg" &&
                        fileType !== "image/jpg"
                    ) {
                      setAlertMessage("Please select a PNG or JPG image.");
                      event.target.value = null;
                    } else {
                      setAlertMessage("");
                      setImagePreview(URL.createObjectURL(file));
                      setImageFile(file);
                    }
                  }
                }}
            />
          </label>
        </div>

        <div className="px-12">
          <div className="text-white text-sm pl-1 mt-8 font-semibold">Dependent Name</div>
          <input
              type="text"
              name="name"
              value={dataSection.name}
              onChange={handleInputChange}
              placeholder="Enter dependent name"
              onFocus={() => {
                setAlertMessage("");
              }}
              className="text-sm w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2 mb-4"
          />
        </div>

        <div className="space-y-1 relative px-12" ref={allergiesRef} onFocus={() => setAlertMessage("")}>
          <p className="w-full pl-1 text-sm font-semibold mt-4 text-white">
            Allergies
          </p>
          <input
              type="text"
              value={allergyInput}
              onChange={(e) => setAllergyInput(e.target.value)}
              onFocus={() => setIsAllergiesOpen(true)}
              onBlur={() => setTimeout(() => setIsAllergiesOpen(false), 200)}
              className="text-sm w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2 mb-4"
              placeholder="Search for allergies..."
          />
          {isAllergiesOpen && (
              <div className="absolute z-10 w-[80%] mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                <div className="max-h-48 overflow-y-auto">
                  {AllergiesList.filter((a) =>
                      a.name.toLowerCase().includes(allergyInput.toLowerCase())
                  ).map((allergy, index) => (
                      <div
                          key={index}
                          onClick={() => {
                            addValueToField1(
                                setSelectedAllergies,
                                selectedAllergies,
                                { allergyID: allergy.allergyID, name: allergy.name }
                            );
                            setAllergyInput("");
                            setIsAllergiesOpen(false);
                          }}
                          className="text-[10px] p-2 hover:bg-gray-100 cursor-pointer transition-colors"
                      >
                        {allergy.name}
                      </div>
                  ))}
                </div>
              </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-2 px-12" onFocus={() => setAlertMessage("")}>
          {selectedAllergies.map((allergy, index) => (
              <div
                  key={index}
                  className="flex items-center bg-gray-100 text-[#035c67] rounded-full px-3 py-1"
              >
                <span className="text-[10px]">{allergy.name}</span>
                <button
                    onClick={() =>
                        removeValueFromField1(setSelectedAllergies, selectedAllergies, index)
                    }
                    type="button"
                    className="text-[10px] ml-2 text-blue-700 hover:text-blue-900"
                >
                  ×
                </button>
              </div>
          ))}
        </div>

        <div className="space-y-1 relative px-12 mt-6" ref={medicationsRef} onFocus={() => setAlertMessage("")}>
          <p className="w-full text-sm font-semibold text-white pl-1">
            Current Medications
          </p>
          <input
              type="text"
              value={medicationInput}
              onChange={(e) => setMedicationInput(e.target.value)}
              onFocus={() => setIsMedicationsOpen(true)}
              onBlur={() => setTimeout(() => setIsMedicationsOpen(false), 200)}
              className="w-full text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2 mb-4"
              placeholder="Search for medications..."
          />
          {isMedicationsOpen && (
              <div className="absolute z-10 w-[80%] mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                <div className="max-h-48 overflow-y-auto">
                  {MedicationsList.filter((m) =>
                      m.name.toLowerCase().includes(medicationInput.toLowerCase())
                  ).map((medication, index) => (
                      <div
                          key={index}
                          onClick={() => {
                            addValueToField2(
                                setSelectedMedications,
                                selectedMedications,
                                { medicationID: medication.medicationID, name: medication.name }
                            );
                            setMedicationInput("");
                            setIsMedicationsOpen(false);
                          }}
                          className="text-[10px] p-2 hover:bg-gray-100 cursor-pointer transition-colors"
                      >
                        {medication.name}
                      </div>
                  ))}
                </div>
              </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-2 px-12" onFocus={() => setAlertMessage("")}>
          {selectedMedications.map((medication, index) => (
              <div
                  key={index}
                  className="flex items-center bg-gray-100 text-[#035c67] rounded-full px-3 py-1"
              >
                <span className="text-[10px]">{medication.name}</span>
                <button
                    onClick={() =>
                        removeValueFromField2(setSelectedMedications, selectedMedications, index)
                    }
                    type="button"
                    className="text-[10px] ml-2 text-blue-700 hover:text-blue-900"
                >
                  ×
                </button>
              </div>
          ))}
        </div>

        <div className="space-y-1 relative px-12 mt-6" ref={conditionsRef} onFocus={() => setAlertMessage("")}>
          <p className="w-full text-sm font-semibold text-white pl-1">
            Health Conditions
          </p>
          <input
              type="text"
              value={conditionInput}
              onChange={(e) => setConditionInput(e.target.value)}
              onFocus={() => setIsConditionsOpen(true)}
              onBlur={() => setTimeout(() => setIsConditionsOpen(false), 200)}
              className="w-full text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2 mb-4"
              placeholder="Search for conditions..."
          />
          {isConditionsOpen && (
              <div className="absolute z-10 w-[80%] mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                <div className="max-h-48 overflow-y-auto">
                  {HealthConditionsList.filter((c) =>
                      c.name.toLowerCase().includes(conditionInput.toLowerCase())
                  ).map((condition, index) => (
                      <div
                          key={index}
                          onClick={() => {
                            addValueToField3(
                                setSelectedConditions,
                                selectedConditions,
                                { conditionID: condition.conditionID, name: condition.name }
                            );
                            setConditionInput("");
                            setIsConditionsOpen(false);
                          }}
                          className="p-2 hover:bg-gray-100 cursor-pointer transition-colors text-[10px]"
                      >
                        {condition.name}
                      </div>
                  ))}
                </div>
              </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-2 px-12" onFocus={() => setAlertMessage("")}>
          {selectedConditions.map((condition, index) => (
              <div
                  key={index}
                  className="flex items-center bg-gray-100 text-[#035c67] rounded-full px-3 py-1"
              >
                <span className="text-[10px]">{condition.name}</span>
                <button
                    onClick={() =>
                        removeValueFromField3(setSelectedConditions, selectedConditions, index)
                    }
                    type="button"
                    className="ml-2 text-blue-700 hover:text-blue-900 text-[10px]"
                >
                  ×
                </button>
              </div>
          ))}
        </div>

        {alertMessage !== "" && (
            <div className="w-full text-center text-white mb-2">
              <p className="rounded-lg bg-red-500">{alertMessage}</p>
            </div>
        )}

        <div className="w-full flex justify-center my-4">
          <button
              type="submit"
              onClick={addDependent}
              className="w-[80%] bg-[#035c67] text-white py-1 px-4 rounded-lg hover:bg-gray-500 transition duration-1000"
          >
            Submit
          </button>
        </div>
      </div>
  );
};

export default AddDependentForm;