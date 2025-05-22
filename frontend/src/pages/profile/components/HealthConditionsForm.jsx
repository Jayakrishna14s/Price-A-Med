import { useState, useRef, useEffect } from "react";
import { HealthConditionsList } from "./Lists.jsx";
import axios from "axios";
import { AwesomeCaptcha } from "react-awesome-captcha";

const HealthConditionsForm = ({ initialSelectedConditions }) => {
    const [isCaptchaValid, setIsCaptchaValid] = useState(false);
    const handleCaptchaValidation = (isValid) => {
        setIsCaptchaValid(isValid);
    };

    const [alertMessage, setAlertMessage] = useState("");
    const [conditionInput, setConditionInput] = useState("");
    const [selectedConditions, setSelectedConditions] = useState([]);
    const [isConditionsOpen, setIsConditionsOpen] = useState(false);
    const conditionsRef = useRef(null);

    // Add selected condition to the list
    const addValueToField = (setField, field, value) => {
        if (!field.some(item => item.conditionID === value.conditionID)) {
            setField([...field, value]);
        }
    };

    // Remove condition from the list
    const removeValueFromField = (setField, field, index) => {
        const updatedField = [...field];
        updatedField.splice(index, 1);
        setField(updatedField);
    };

    // Submit selected conditions to API
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isCaptchaValid) {
            setAlertMessage("Invalid Captcha");
            return;
        }

        console.log("Selected Conditions (Pairs):", selectedConditions);

        try {
            const payload = {
                conditions: selectedConditions,
            };

            console.log(payload);

            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/auth/user/mps/healthconditions`,
                payload,
                { withCredentials: true }
            );

            if (response.status === 200) {
                alert("Health conditions submitted successfully!");
                // window.location.reload();
            } else {
                setAlertMessage("Failed to submit conditions. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting conditions:", error);
            setAlertMessage("Failed to submit conditions. Please try again.");
        }
    };

    // Close dropdown when clicking outside
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

    // Load initial selected conditions from API (objects with conditionID and name)
    useEffect(() => {
        if (initialSelectedConditions && initialSelectedConditions.length > 0) {
            setSelectedConditions(initialSelectedConditions);
        }
    }, [initialSelectedConditions]);

    return (
        <form onSubmit={handleSubmit} className="flex flex-col py-8 px-14">
            <div className="space-y-2 relative" ref={conditionsRef} onFocus={() => setAlertMessage("")}>
                <p className="w-full text-center text-2xl font-semibold mb-6 text-white border-b-2 border-white">
                    Health Conditions
                </p>
                <input
                    type="text"
                    value={conditionInput}
                    onChange={(e) => setConditionInput(e.target.value)}
                    onFocus={() => setIsConditionsOpen(true)}
                    onBlur={() => setTimeout(() => setIsConditionsOpen(false), 200)}
                    className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2 mb-4"
                    placeholder="Search for conditions..."
                />
                {isConditionsOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                        <div className="max-h-48 overflow-y-auto">
                            {HealthConditionsList.filter((c) =>
                                c.name.toLowerCase().includes(conditionInput.toLowerCase())
                            ).map((condition, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        addValueToField(
                                            setSelectedConditions,
                                            selectedConditions,
                                            { conditionID: condition.conditionID, name: condition.name }
                                        );
                                        setConditionInput("");
                                        setIsConditionsOpen(false);
                                    }}
                                    className="p-2 hover:bg-gray-100 cursor-pointer transition-colors"
                                >
                                    {condition.name}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Selected Conditions */}
            <div className="flex flex-wrap gap-2 mt-2" onFocus={() => setAlertMessage("")}>
                {selectedConditions.map((condition, index) => (
                    <div
                        key={index}
                        className="flex items-center bg-gray-100 text-[#035c67] rounded-full px-3 py-1"
                    >
                        <span className="text-sm">{condition.name}</span>
                        <button
                            onClick={() =>
                                removeValueFromField(
                                    setSelectedConditions,
                                    selectedConditions,
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

export default HealthConditionsForm;