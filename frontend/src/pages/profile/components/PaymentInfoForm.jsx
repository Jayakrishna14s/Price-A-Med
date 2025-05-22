import  { useState } from "react";
import { AwesomeCaptcha } from "react-awesome-captcha";
import axios from "axios";

const PaymentInfoForm = () => {
  const [dataSection, setDataSection] = useState({
      cardHolderName: "",
      cardNumber: "",
      expirationDate: "",
      cvv: ""
  });

  const [alertMessage, setAlertMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDataSection({ ...dataSection, [name]: value });
    };

    const [isCaptchaValid, setIsCaptchaValid] = useState(false);
    const handleCaptchaValidation = (isValid) => {
        setIsCaptchaValid(isValid);
    };

    const handleSubmit = async () => {
        console.log(dataSection);
        if(!isCaptchaValid) {
            setAlertMessage("invalid captcha");
            return;
        }
        if(!dataSection["cardHolderName"] || !dataSection["cardNumber"] || !dataSection["expirationDate"] || !dataSection["cvv"]) {
            setAlertMessage("All fields are required");
            return;
        }

        // Validation
        const cardNumberRegex = /^\d{16}$/;
        if (!cardNumberRegex.test(dataSection["cardNumber"])) {
            setAlertMessage("Invalid card number");
            return;
        }

        const cvvRegex = /^\d{3,4}$/;
        if (!cvvRegex.test(dataSection["cvv"])) {
            setAlertMessage("Invalid CVV");
            return;
        }

        const nameRegex = /^[a-zA-Z\s\-.'`]+$/; // Allows letters, spaces, hyphens, periods, apostrophes, backticks
        if (!nameRegex.test(dataSection["cardHolderName"])) {
            setAlertMessage("Invalid characters in cardholder name");
            return;
        }

        const today = new Date();
        const expirationDate = new Date(dataSection["expirationDate"]);

        if (expirationDate <= today) {
            setAlertMessage("Expiration date must be in the future");
            return;
        }

        const payload = {
            cardHolderName: dataSection["cardHolderName"],
            cardNumber: dataSection["cardNumber"],
            expirationDate: dataSection["expirationDate"],
            cvv: dataSection["cvv"],
        }

        console.log(payload);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/auth/user/mps/paymentinfo`,
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
    }

  return (
    <div className="p-4 flex flex-col">
      <div className="text-white shadow-lg text-center text-2xl font-semibold mb-4 border-b-2 mx-8">
        Add Payment Details
      </div>

      <div className="text-white mt-8 font-semibold flex justify-center">
        <span className="text-left w-[75%] pl-1">Card Holder Name</span>
      </div>
      <div className="flex justify-center">
        <input
          type="text"
          name="cardHolderName"
          autoComplete="cc-chn"
          placeholder="Card Holder name"
          onFocus={() => setAlertMessage("")}
          value={dataSection.cardHolderName}
          onChange={handleInputChange}
          className="w-[75%] p-1 rounded px-2 border-2 border-[#035c67] bg-gray-100 text-[#035c67]"
        />
      </div>
      <div className="text-white mt-8 font-semibold flex justify-center">
        <span className="text-left w-[75%] pl-1">Card Number</span>
      </div>
      <div className="flex justify-center">
        <input
          type="password"
          name="cardNumber"
          autoComplete="cc-cn"
          placeholder="Card Number"
          onFocus={() => setAlertMessage("")}
          value={dataSection.cardNumber}
          onChange={handleInputChange}
          className="w-[75%] p-1 rounded px-2 border-2 border-[#035c67] bg-gray-100 text-[#035c67]"
        />
      </div>
      <div className="text-white mt-8 font-semibold flex justify-center">
        <span className="text-left w-[75%] pl-1">Expiration Date</span>
      </div>
      <div className="flex justify-center">
        <input
          type="date"
          name="expirationDate"
          placeholder="Expiration Date"
          onFocus={() => setAlertMessage("")}
          value={dataSection.expirationDate}
          onChange={handleInputChange}
          className="w-[75%] p-1 rounded px-2 border-2 border-[#035c67] bg-gray-100 text-[#035c67]"
        />
      </div>
      <div className="text-white mt-8 font-semibold flex justify-center">
        <span className="text-left w-[75%] pl-1">CVV</span>
      </div>
      <div className="flex justify-center">
        <input
          type="password"
          name="cvv"
          placeholder="Enter CVV"
          onFocus={() => setAlertMessage("")}
          value={dataSection.cvv}
          onChange={handleInputChange}
          className="w-[75%] p-1 rounded px-2 border-2 border-[#035c67] bg-gray-100 text-[#035c67]"
        />
      </div>

      <div className="flex items-center justify-center px-14" onFocus={() => setAlertMessage("")}>
        <AwesomeCaptcha
          onValidate={handleCaptchaValidation}
          className={" font-medium w-full scale-[70%]"}
        />
      </div>

        {
            alertMessage != "" && (<div className="w-full text-center  text-white px-14  mb-2">
                <p className="rounded-lg bg-red-500">{alertMessage}</p>
            </div>)
        }

      <div className="flex justify-center w-full my-4">
        <button
          onClick={handleSubmit}
          className="bg-[#035c67] p-2 px-4 text-white font-semibold rounded-lg hover:bg-[#035c67dd] hover:scale-110 transition duration-1000"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default PaymentInfoForm;