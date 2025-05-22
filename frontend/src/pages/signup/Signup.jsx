import Navbar from "/src/pages/signup/components/Navbar";

import Stepper from "/src/pages/signup/components/Stepper";
import StepperControl from "/src/pages/signup/components/StepperControl";

import { StepperContext } from "/src/pages/signup/components/StepperContext";

import MemberID from "/src/pages/signup/components/MemberID";
import PersonalInformation from "/src/pages/signup/components/PersonalInformation";
import SetPassword from "/src/pages/signup/components/SetPassword";
import Verification from "/src/pages/signup/components/Verification";
import Status from "/src/pages/signup/components/Status";

import Footer from "/src/Components-Common/Footer";
import { useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const taskID = uuid();

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState("");
  // const [finalData, setFinalData] = useState([]);

  const [alertMessage, setAlertMessage] = useState("");
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const steps = [
    "Member ID",
    "Personal Information",
    "Set Password",
    "Verification",
    "Status",
  ];

  // ----------------------------------------------------------------------------------------------

  const displayStep = (step) => {
    switch (step) {
      case 0:
        return (
          <MemberID
            alertMessage={alertMessage}
            setAlertMessage={setAlertMessage}
            isCaptchaValid={isCaptchaValid}
            setIsCaptchaValid={setIsCaptchaValid}
          />
        );
      case 1:
        return (
          <PersonalInformation
            alertMessage={alertMessage}
            setAlertMessage={setAlertMessage}
          />
        );
      case 2:
        return (
          <SetPassword
            alertMessage={alertMessage}
            setAlertMessage={setAlertMessage}
          />
        );
      case 3:
        return (
          <Verification
            alertMessage={alertMessage}
            setAlertMessage={setAlertMessage}
          />
        );
      case 4:
        return <Status />;
    }
  };

  // ------------------------------------------------------------------------------------------------------------------

  async function handleClick(direction) {
    // var formattedDate = "";

    let newStep = currentStep;
    if (direction != "next") {
      newStep--;
      newStep >= 0 && newStep < steps.length && setCurrentStep(newStep);
      setAlertMessage("");
      return;
    }

    if (currentStep === 0) {
      const memberID = userData["memberID"] || "";

      const regex = /^ENM\$[A-Za-z0-9]{8}$/;

      if (!regex.test(memberID)) {
        setAlertMessage("Invalid Member ID");
        return;
      }

      // validate the entered member id --> backend
      if (!isCaptchaValid) {
        console.log(isCaptchaValid + " ");

        setAlertMessage("Invalid Captcha");
        return;
      }
      console.log(isCaptchaValid + " ");

      console.log(BACKEND_URL);
      const response = await axios.get(
        BACKEND_URL + "/public/api/validate/signup",
        {
          params: { memberID: memberID, stage: 1 },
        }
      );

      const { exists, message } = response.data;
      console.log(
        "Status: " + response.status + " Message : " + exists + "   " + message
      );

      if (!exists) {
        setAlertMessage(message);
        return;
      }

      direction === "next" ? newStep++ : newStep--;
      newStep >= 0 && newStep < steps.length && setCurrentStep(newStep);
      //
    }
    // --------------------------------------------------------------------------------------------------------------
    else if (currentStep === 1) {
      // validate mobile number, username, firstName, lastName
      const memberID = userData["memberID"] || "";
      const firstName = userData["firstName"] || "";
      const lastName = userData["lastName"] || "";
      const mobileNumber = userData["mobileNumber"] || "";
      const email = userData["email"] || "";

      const birthDate = userData["birthDate"] || "";

      const nameRegex = /^[a-zA-Z]{2,}$/;
      if (!nameRegex.test(firstName)) {
        setAlertMessage("Invalid Firstname");
        return;
      }

      if (!nameRegex.test(lastName)) {
        setAlertMessage("Invalid Lastname");
        return;
      }

      // const mobileRegex = /^(0|)[1-9]\d{9}$/;
      const mobileRegex = /^[6-9]\d{9}$/;
      if (!mobileRegex.test(mobileNumber)) {
        setAlertMessage("Invalid mobile number");
        return;
      }

      // console.log("+" + userData["country"].phone);

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        setAlertMessage("Invalid Email Address");
        return;
      }

      // check if email matches with member ID.
      // check if birthDate is less than current

      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, "0"); // Add leading zero if needed
      const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
      const year = currentDate.getFullYear();

      // Format as DD-MM-YYYY
      const formattedDate = `${year}-${month}-${day}`;
      setUserData((prevData) => ({
        ...prevData,
        formattedDate: formattedDate,
      }));

      // console.log(birthDate + " " + formattedDate);
      // console.log(birthDate > formattedDate);
      if (birthDate > formattedDate) {
        setAlertMessage("Invalid Date of Birth");
        return;
      }

      const response = await axios.get(
        BACKEND_URL + "/public/api/validate/signup",
        {
          params: { memberID: memberID, email: email, stage: 2 },
        }
      );

      console.log(response);
      const { valid } = response.data;
      if (!valid) {
        setAlertMessage("Entered Email didn't match with MemberID");
        return;
      }

      direction === "next" ? newStep++ : newStep--;
      newStep >= 0 && newStep < steps.length && setCurrentStep(newStep);

      //
    }
    // --------------------------------------------------------------------------------------------------
    else if (currentStep === 2) {
      // check password and cpassword are same or not
      const password = userData["password"] || "";
      const cpassword = userData["cpassword"] || "";

      const email = userData["email"] || "";

      const passwordRegex =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

      if (!passwordRegex.test(password)) {
        setAlertMessage("Choose a strong password");
        return;
      }

      if (password != cpassword) {
        setAlertMessage("Entered passwords did not match");
        return;
      }

      console.log(taskID);

      // send an otp to email
      const data = {
        taskID: taskID,
        type: "signup",
        email: email,
      };
      const response = await axios.post(
        BACKEND_URL + "/public/api/producer/otp",
        data
      );

      console.log(password + " " + cpassword);

      console.log(
        "Status = " + response.status + "  Response = " + response.data
      );

      direction === "next" ? newStep++ : newStep--;
      newStep >= 0 && newStep < steps.length && setCurrentStep(newStep);
    }
    // -----------------------------------------------------------------------------------------------------------------------
    else if (currentStep === 3) {
      const otp = userData["otp"];

      const otpRegex = /^[a-zA-Z0-9]{8}$/;
      if (!otpRegex.test(otp)) {
        setAlertMessage("Enter a valid OTP");
        return;
      }

      // check the entered otp
      // if wrong set alertMessage to --> Enter otp is wrong
      console.log(otp);

      const response1 = await axios.get(
        BACKEND_URL + "/public/api/validate/otp",
        {
          params: { taskID: taskID, otp: otp },
        }
      );

      const { valid } = response1.data;
      console.log("Otp validity: " + valid);

      if (!valid) {
        setAlertMessage("Invalid otp");
        return;
      }

      direction === "next" ? newStep++ : newStep--;
      newStep >= 0 && newStep < steps.length && setCurrentStep(newStep);

      // if otp is correct
      // create a account.

      const data = {
        memberID: userData["memberID"],
        email: userData["email"],
        firstName: userData["firstName"],
        lastName: userData["lastName"],
        countryCode: userData["countryCode"],
        mobileNumber: userData["mobileNumber"],
        dob: userData["formattedDate"],
        password: userData["password"],
      };

      const response2 = await axios.post(
        BACKEND_URL + "/public/api/producer/signup",
        data
      );
      console.log(
        "Status: " + response2.status + " Message: " + response2.data
      );
    }

    // if (currentStep == 4) {
    // setCurrentStep(4);
    // return;
    // }

    // console.log(userData["countryCode"]);
    // console.log(userData);

    // direction === "next" ? newStep++ : newStep--;
    // newStep >= 0 && newStep < steps.length && setCurrentStep(newStep);
    // setAlertMessage("");
  }

  return (
    <div className="h-screen flex flex-col gap-12">
      <Navbar />

      <div className="flex flex-col overflow-scroll gap-12">
        {/* Signup Form */}
        <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
          <div className="container horizontal mt-5 px-8">
            <Stepper steps={steps} currentStep={currentStep} />
            <div className="my-10 p-10">
              <StepperContext.Provider
                value={{
                  userData,
                  setUserData,
                  // finalData,
                  // setFinalData,
                }}
              >
                {displayStep(currentStep)}
              </StepperContext.Provider>
            </div>
          </div>
          {currentStep != steps.length - 1 && (
            <StepperControl
              handleClick={handleClick}
              currentStep={currentStep}
              steps={steps}
            />
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Signup;
