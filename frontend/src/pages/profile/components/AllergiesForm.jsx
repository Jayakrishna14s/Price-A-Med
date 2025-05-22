import { useState, useRef, useEffect } from "react";
import { AllergiesList } from "./Lists.jsx";
import axios from "axios";
import { AwesomeCaptcha } from "react-awesome-captcha";

const AllergiesForm = ({ initialSelectedAllergies }) => {
    const [isCaptchaValid, setIsCaptchaValid] = useState(false);
    const handleCaptchaValidation = (isValid) => {
        setIsCaptchaValid(isValid);
    };

    const [alertMessage, setAlertMessage] = useState("");
    const [allergyInput, setAllergyInput] = useState("");
    const [selectedAllergies, setSelectedAllergies] = useState([]);
    const [isAllergiesOpen, setIsAllergiesOpen] = useState(false);
    const allergiesRef = useRef(null);

    // Add selected allergy to the list
    const addValueToField = (setField, field, value) => {
        if (!field.some(item => item.allergyID === value.allergyID)) {
            setField([...field, value]);
        }
    };

    // Remove allergy from the list
    const removeValueFromField = (setField, field, index) => {
        const updatedField = [...field];
        updatedField.splice(index, 1);
        setField(updatedField);
    };

    // Submit selected allergies to API
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isCaptchaValid) {
            setAlertMessage("Invalid Captcha");
            return;
        }

        console.log("Selected Allergies (Pairs):", selectedAllergies);

        try {
            const payload = {
                allergies: selectedAllergies,
            };

            console.log(payload);

            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/auth/user/mps/allergies`,
                payload,
                { withCredentials: true }
            );

            if (response.status === 200) {
                alert("Allergies submitted successfully!");
                window.location.reload();
            } else {
                setAlertMessage("Failed to submit allergies. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting allergies:", error);
            setAlertMessage("Failed to submit allergies. Please try again.");
        }
    };

    // Close dropdown when clicking outside
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

    // Load initial selected allergies from API (objects with allergyID and name)
    useEffect(() => {
        if (initialSelectedAllergies && initialSelectedAllergies.length > 0) {
            setSelectedAllergies(initialSelectedAllergies);
        }
    }, [initialSelectedAllergies]);

    return (
        <form onSubmit={handleSubmit} className="flex flex-col py-8 px-14">
            <div className="space-y-2 relative" ref={allergiesRef} onFocus={() => setAlertMessage("")}>
                <p className="w-full text-center text-2xl font-semibold mb-6 text-white border-b-2 border-white">
                    Allergies
                </p>
                <input
                    type="text"
                    value={allergyInput}
                    onChange={(e) => setAllergyInput(e.target.value)}
                    onFocus={() => setIsAllergiesOpen(true)}
                    onBlur={() => setTimeout(() => setIsAllergiesOpen(false), 200)}
                    className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2 mb-4"
                    placeholder="Search for allergies..."
                />
                {isAllergiesOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                        <div className="max-h-48 overflow-y-auto">
                            {AllergiesList.filter((a) =>
                                a.name.toLowerCase().includes(allergyInput.toLowerCase())
                            ).map((allergy, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        addValueToField(
                                            setSelectedAllergies,
                                            selectedAllergies,
                                            { allergyID: allergy.allergyID, name: allergy.name }
                                        );
                                        setAllergyInput("");
                                        setIsAllergiesOpen(false);
                                    }}
                                    className="p-2 hover:bg-gray-100 cursor-pointer transition-colors"
                                >
                                    {allergy.name}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Selected Allergies */}
            <div className="flex flex-wrap gap-2 mt-2" onFocus={() => setAlertMessage("")}>
                {selectedAllergies.map((allergy, index) => (
                    <div
                        key={index}
                        className="flex items-center bg-gray-100 text-[#035c67] rounded-full px-3 py-1"
                    >
                        <span className="text-sm">{allergy.name}</span>
                        <button
                            onClick={() =>
                                removeValueFromField(
                                    setSelectedAllergies,
                                    selectedAllergies,
                                    index
                                )
                            }
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

export default AllergiesForm;