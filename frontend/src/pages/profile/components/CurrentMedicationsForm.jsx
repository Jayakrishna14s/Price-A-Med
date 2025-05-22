import React, { useState, useRef, useEffect } from "react";
import { MedicationsList } from "./Lists.jsx";
import axios from "axios";
import { AwesomeCaptcha } from "react-awesome-captcha";

const CurrentMedicationsForm = ({ initialSelectedMedications }) => {
    const [isCaptchaValid, setIsCaptchaValid] = useState(false);
    const handleCaptchaValidation = (isValid) => {
        setIsCaptchaValid(isValid);
    };

    const [alertMessage, setAlertMessage] = useState("");

    const [medicationInput, setMedicationInput] = useState("");
    const [selectedMedications, setSelectedMedications] = useState([]); // Store pairs {medicationID, name}
    const [isMedicationsOpen, setIsMedicationsOpen] = useState(false);
    const medicationsRef = useRef(null);

    // Add selected medication to the list
    const addValueToField = (setField, field, value) => {
        if (!field.some(item => item.medicationID === value.medicationID)) {
            setField([...field, value]);
        }
    };

    // Remove medication from the list
    const removeValueFromField = (setField, field, index) => {
        const updatedField = [...field];
        updatedField.splice(index, 1);
        setField(updatedField);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!isCaptchaValid) {
            setAlertMessage("Invalid Captcha");
            return;
        }

        console.log("Selected Medications (Pairs):", selectedMedications);

        try {
            const payload = {
                medications: selectedMedications,
            };

            console.log(payload);

            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/auth/user/mps/currentmedications`,
                payload,
                {withCredentials : true}
            );

            if (response.status === 200) {
                alert("Successfully updated");
                window.location.reload();
            } else {
                setAlertMessage( "Failed to update contact info");
            }

        } catch (error) {
            console.error("Error submitting medications:", error);
            setAlertMessage("Failed to submit medications. ");
        }
    };

    // Close dropdown when clicking outside
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

    // Load initial selected medications from API (objects with medicationID and name)
    useEffect(() => {
        if (initialSelectedMedications && initialSelectedMedications.length > 0) {
            setSelectedMedications(initialSelectedMedications);
        }
    }, [initialSelectedMedications]);

    return (
        <form onSubmit={handleSubmit} className="flex flex-col py-8 px-14">
            <div className="space-y-2 relative" ref={medicationsRef} onFocus={() => setAlertMessage("")}>
                <p className="w-full text-center text-2xl font-semibold mb-6 text-white border-b-2 border-white">
                    Current Medications
                </p>
                <input
                    type="text"
                    value={medicationInput}
                    onChange={(e) => setMedicationInput(e.target.value)}
                    onFocus={() => setIsMedicationsOpen(true)}
                    onBlur={() => setTimeout(() => setIsMedicationsOpen(false), 200)}
                    className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2 mb-4"
                    placeholder="Search for medications..."
                />
                {isMedicationsOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                        <div className="max-h-48 overflow-y-auto">
                            {MedicationsList.filter((m) =>
                                m.name.toLowerCase().includes(medicationInput.toLowerCase())
                            ).map((medication, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        addValueToField(
                                            setSelectedMedications,
                                            selectedMedications,
                                            { medicationID: medication.medicationID, name: medication.name }
                                        );
                                        setMedicationInput("");
                                        setIsMedicationsOpen(false);
                                    }}
                                    className="p-2 hover:bg-gray-100 cursor-pointer transition-colors"
                                >
                                    {medication.name}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Selected Medications (Names) */}
            <div className="flex flex-wrap gap-2 mt-2" onFocus={() => setAlertMessage("")}>
                {selectedMedications.map((medication, index) => (
                    <div
                        key={index}
                        className="flex items-center bg-gray-100 text-[#035c67] rounded-full px-3 py-1"
                    >
                        <span className="text-sm">{medication.name}</span>
                        <button
                            onClick={() => {
                                removeValueFromField(
                                    setSelectedMedications,
                                    selectedMedications,
                                    index
                                );
                            }}
                            type="button"
                            className="ml-2 text-blue-700 hover:text-blue-900"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            <div className="w-full  flex items-center justify-center" onFocus={() => setAlertMessage("")}>
                <AwesomeCaptcha
                    onValidate={handleCaptchaValidation}
                    className={"flex justify-between  font-medium scale-75 "}
                />
            </div>

            {
                alertMessage != "" && (<div className="w-full text-center  text-white  mb-2">
                    <p className="rounded-lg bg-red-500">{alertMessage}</p>
                </div>)
            }

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-[#035c67] text-white py-2 px-4 rounded-lg hover:scale-105 transition duration-1000 "
            >
                Submit
            </button>
        </form>
    );
};

export default CurrentMedicationsForm;