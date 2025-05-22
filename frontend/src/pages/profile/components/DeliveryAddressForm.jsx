import React, { useState } from "react";
import { AwesomeCaptcha } from "react-awesome-captcha";
import axios from "axios";

const DeliveryAddressForm = () => {
    const [dataSection, setDataSection] = useState({
        houseNo: "",
        landmark: "",
        country: "",
        city: "",
        state: "",
        postalCode: "",
    });

    const [isCaptchaValid, setIsCaptchaValid] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const handleCaptchaValidation = (isValid) => {
        setIsCaptchaValid(isValid);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDataSection({ ...dataSection, [name]: value });
    };

    const handleSubmit = async () => {
        console.log("Data to be submitted:", dataSection);
        if(!isCaptchaValid) {
            setAlertMessage("Invalid captcha");
            return;
        }

        if(!dataSection["houseNo"] || !dataSection["landmark"] || !dataSection["country"] || !dataSection["city"] || !dataSection["state"] || !dataSection["postalCode"] ) {
            setAlertMessage("All fields are required");
            return;
        }

        const payload = {
            houseNo: dataSection["houseNo"],
            landmark: dataSection["landmark"],
            country: dataSection["country"],
            city: dataSection["city"],
            state: dataSection["state"],
            postalCode: dataSection["postalCode"],
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/auth/user/mps/deliveryaddress`,
                payload,
                {withCredentials: true}
            )

            if (response.status === 200) {
                alert("Successfully updated");
                window.location.reload();
            } else {
                setAlertMessage( "Failed to update contact info");
            }

        } catch(error) {
            console.error("Error updating contact info:", error);
            setAlertMessage("An error occurred while updating.");
        }
    };

    return (
        <>
            <div className="flex flex-col p-4">
                <div className="text-white shadow-lg text-center text-2xl font-semibold mb-4 border-b-2 mx-8 ">
                    Add Delivery Address
                </div>

                <div className="text-white mt-8 font-semibold flex justify-center">
                    <span className="text-left w-[75%] pl-1">House No.</span>
                </div>
                <div className="flex justify-center">
                    <input
                        type="text"
                        name="houseNo"
                        value={dataSection.houseNo}
                        placeholder="House No."
                        onFocus={() => setAlertMessage("")}
                        onChange={handleInputChange}
                        className="w-[75%] p-1 rounded px-2 border-2 border-[#035c67] bg-gray-100 text-[#035c67]"
                    />
                </div>

                <div className="text-white mt-8 font-semibold flex justify-center">
                    <span className="text-left w-[75%] pl-1">Landmark</span>
                </div>
                <div className="flex justify-center">
                    <input
                        type="text"
                        name="landmark"
                        placeholder="Enter landmark"
                        onFocus={() => setAlertMessage("")}
                        value={dataSection.landmark}
                        onChange={handleInputChange}
                        className="w-[75%] p-1 rounded px-2 border-2 border-[#035c67] bg-gray-100 text-[#035c67]"
                    />
                </div>

                <div className="flex justify-center ">
                    <div className="w-[37.5%] ">
                        <div className="text-white mt-8 font-semibold flex justify-center">
                            <span className="text-left w-full pl-1">Country</span>
                        </div>
                        <div className="flex justify-center">
                            <input
                                type="text"
                                name="country"
                                placeholder="Enter country"
                                onFocus={() => setAlertMessage("")}
                                value={dataSection.country}
                                onChange={handleInputChange}
                                className="w-full p-1 rounded px-2 border-2 border-[#035c67] bg-gray-100 text-[#035c67]"
                            />
                        </div>
                        <div className="text-white mt-8 font-semibold flex justify-center">
                            <span className="text-left w-full pl-1">City</span>
                        </div>
                        <div className="flex justify-center">
                            <input
                                type="text"
                                name="city"
                                placeholder="Enter city"
                                onFocus={() => setAlertMessage("")}
                                value={dataSection.city}
                                onChange={handleInputChange}
                                className="w-full p-1 rounded  border-2 border-[#035c67] bg-gray-100 text-[#035c67]"
                            />
                        </div>
                    </div>

                    <div className="w-[37.5%]">
                        <div className="text-white mt-8 font-semibold flex justify-center">
                            <span className="text-left w-full">State</span>
                        </div>
                        <div className="flex justify-center">
                            <input
                                type="text"
                                name="state"
                                placeholder="Enter state"
                                onFocus={() => setAlertMessage("")}
                                value={dataSection.state}
                                onChange={handleInputChange}
                                className="w-full p-1 rounded px-2 border-2 border-[#035c67] bg-gray-100 text-[#035c67]"
                            />
                        </div>

                        <div className="text-white mt-8 font-semibold flex justify-center">
                            <span className="text-left w-full pl-1">Postal Code</span>
                        </div>
                        <div className="flex justify-center">
                            <input
                                type="text"
                                name="postalCode"
                                placeholder="postalCode"
                                onFocus={() => setAlertMessage("")}
                                value={dataSection.postalCode}
                                onChange={handleInputChange}
                                className="w-full p-1 rounded px-2 border-2 border-[#035c67] bg-gray-100 text-[#035c67]"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center px-14">
                    <AwesomeCaptcha onValidate={handleCaptchaValidation} className={" font-medium w-full scale-[70%]"} />
                </div>

                {
                    alertMessage != "" && (<div className="w-full text-center text-white px-14 mb-2">
                        <p className="bg-red-500">{alertMessage}</p>
                    </div>)
                }

                <div className="flex justify-center w-full mb-4">
                    <button
                        onClick={handleSubmit}
                        className="bg-[#035c67] p-2 px-4 text-white font-semibold rounded-lg hover:bg-[#035c67dd] hover:scale-110 transition duration-1000"
                    >
                        Update
                    </button>
                </div>
            </div>
        </>
    );
};

export default DeliveryAddressForm;