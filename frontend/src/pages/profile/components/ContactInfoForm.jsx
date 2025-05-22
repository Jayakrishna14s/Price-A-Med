import React from "react";
import { AwesomeCaptcha } from "react-awesome-captcha";
import { useState } from "react";
import axios from "axios";

const ContactInfoForm = ({ initialDataSection }) => {
  const [dataSection, setDataSection] = useState({
    ...initialDataSection
  });

  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataSection((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCaptchaValidation = (isValid) => {
    setIsCaptchaValid(isValid);
  };

  const noChangesDetected = () => {
      return initialDataSection["email"] == dataSection["email"] &&
             initialDataSection["countryCode"] == dataSection["countryCode"] &&
             initialDataSection["phone"] == dataSection["phone"] &&
             initialDataSection["houseNumber"] == dataSection["houseNumber"] &&
             initialDataSection["landmark"] == dataSection["landmark"] &&
             initialDataSection["country"] == dataSection["country"] &&
             initialDataSection["state"] == dataSection["state"] &&
             initialDataSection["city"] == dataSection["city"] &&
             initialDataSection["postalCode"] == dataSection["postalCode"];
  }


  async function updateContactInfo() {
      console.log(initialDataSection);
      console.log(dataSection);

      if(!isCaptchaValid) {
          setAlertMessage("Invalid captcha");
          return;
      }

      if(!noChangesDetected()) {

          const payload = {
              email: dataSection["email"],
              countryCode: dataSection["countryCode"],
              phone: dataSection["phone"],
              houseNumber: dataSection["houseNumber"],
              landmark: dataSection["landmark"],
              state: dataSection["state"],
              city: dataSection["city"],
              country: dataSection["country"],
              postalCode: dataSection["postalCode"],
          }

          console.log(payload);

          try {
              const response = await axios.post(
                  `${import.meta.env.VITE_BACKEND_URL}/auth/user/mps/contactinfo`,
                  payload, {
                      withCredentials: true
                  }
              );


              if (response.status === 200) {
                  alert("Successfully updated");
                  window.location.reload();
              } else {
                  setAlertMessage( "Failed to update contact info");
              }
          } catch (error) {
              console.error("Error updating contact info:", error);
              setAlertMessage("An error occurred while updating.");
          }
      } else {
          setAlertMessage("No changes detected");
      }
  }

  return (
    <div className="p-4">
      <div className="text-white shadow-lg text-center text-2xl font-semibold mb-4 border-b-2 mx-8 ">
        Edit Contact Information
      </div>

      <div className="text-white mt-8 font-semibold flex justify-center">
        <span className="text-left w-[75%] pl-1">Email</span>
      </div>
      <div className="flex justify-center">
        <input
          type="email"
          name="email"
          placeholder = "Enter your email address"
          onFocus={() => setAlertMessage("")}
          value={dataSection.email}
          onChange={handleInputChange}
          className="w-[75%] p-1 rounded px-2 border-2 border-[#035c67] bg-gray-100 text-[#035c67]"
        />
      </div>

      <div className="text-white mt-4 font-semibold flex justify-center">
        <span className="text-left w-[75%] pl-1">Phone</span>
      </div>

      <div className="flex items-center justify-center ">
        <div className="w-[75%] relative flex">
          {/* <span className="relative z-20 left-8 top-1/2 transform -translate-y-1/2 text-[#035c67]">
            +
          </span> */}
          <div className="w-[25%]">
            <span className="absolute flex items-center pl-[4.5%] pt-[6px]">
              <span>+</span>
            </span>
            <input
              type="text"
              name="countryCode"
              value={dataSection.countryCode}
              onFocus={() => setAlertMessage("")}
              onChange={handleInputChange}
              className=" w-full p-1 pr-4 text-center rounded border-2 border-[#035c67] bg-gray-100 text-[#035c67]"
            />
          </div>
          <input
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            value={dataSection.phone}
            onFocus={() => setAlertMessage("")}
            onChange={handleInputChange}
            className="p-1 pl-2  w-[75%]  rounded  border-2 border-[#035c67] bg-gray-100 text-[#035c67]"
          />
        </div>
      </div>

      {/*<div className="text-white mt-8 font-semibold flex justify-center">*/}
      {/*  <span className="text-left w-[75%] pl-1">Address</span>*/}
      {/*</div>*/}
      {/*<div className="flex justify-center">*/}
      {/*  <input*/}
      {/*    type="text"*/}
      {/*    name="address"*/}
      {/*    placeholder="Enter your address"*/}
      {/*    value={dataSection.address}*/}
      {/*    onChange={handleInputChange}*/}
      {/*    className="w-[75%] p-1 rounded px-2 border-2 border-[#035c67] bg-gray-100 text-[#035c67]"*/}
      {/*  />*/}
      {/*</div>*/}

      <div className="flex justify-center ">


          <div className="w-[37.5%] ">
              <div className="text-white mt-8 font-semibold flex justify-center">
                  <span className="text-left w-full pl-1">House No.</span>
              </div>
              <div className="flex justify-center">
                  <input
                      type="text"
                      name="houseNumber"
                      placeholder="House number"
                      value={dataSection.houseNumber}
                      onFocus={() => setAlertMessage("")}
                      onChange={handleInputChange}
                      className="w-full p-1 rounded px-2 border-2 border-[#035c67] bg-gray-100 text-[#035c67]"
                  />
              </div>
              <div className="text-white mt-8 font-semibold flex justify-center">
                  <span className="text-left w-full pl-1">Country</span>
              </div>
              <div className="flex justify-center">
                  <input
                      type="text"
                      name="country"
                      value={dataSection.country}
                      placeholder="Enter Country"
                      onFocus={() => setAlertMessage("")}
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
                      value={dataSection.city}
                      onFocus={() => setAlertMessage("")}
                      onChange={handleInputChange}
                      className="w-full p-1 rounded  border-2 border-[#035c67] bg-gray-100 text-[#035c67]"
                  />
              </div>
          </div>

          <div className="w-[37.5%]">
              <div className="text-white mt-8 font-semibold flex justify-center">
                  <span className="text-left w-full">Landmark</span>
              </div>
              <div className="flex justify-center">
                  <input
                      type="text"
                      name="landmark"
                      placeholder="Enter landmark"
                      value={dataSection.landmark}
                      onFocus={() => setAlertMessage("")}
                      onChange={handleInputChange}
                      className="w-full p-1 rounded px-2 border-2 border-[#035c67] bg-gray-100 text-[#035c67]"
                  />
              </div>
              <div className="text-white mt-8 font-semibold flex justify-center">
                  <span className="text-left w-full">State</span>
              </div>
              <div className="flex justify-center">
                  <input
                      type="text"
                      name="state"
                      value={dataSection.state}
                      placeholder="Enter state"
                      onFocus={() => setAlertMessage("")}
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
                      placeholder="Postal Code"
                      value={dataSection.postalCode}
                      onFocus={() => setAlertMessage("")}
                      onChange={handleInputChange}
                      className="w-full p-1 rounded px-2 border-2 border-[#035c67] bg-gray-100 text-[#035c67]"
                  />
              </div>
          </div>
      </div>

        <div className="flex items-center justify-center mx-12"
             onFocus={() => setAlertMessage("")}
        >
            <AwesomeCaptcha
                onValidate={handleCaptchaValidation}
                className={" font-medium w-full scale-[70%]"}
            />
        </div>

        {
            alertMessage != "" && (<div className="w-full text-center text-white px-14">
                <p className="bg-red-500">{alertMessage}</p>
            </div>)
        }

        <div className="flex justify-center w-full mb-4">
            <button
                onClick={updateContactInfo}
                className="bg-[#035c67] p-2 px-4 text-white font-semibold rounded-lg hover:bg-[#035c67dd] hover:scale-110 transition duration-1000"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default ContactInfoForm;
