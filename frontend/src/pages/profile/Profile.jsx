import { useEffect, useState } from "react";
import Navbar from "/src/Components-Common/Navbar";
import Dependents from "/src/pages/profile/components/Dependents";
import HealthConditions from "/src/pages/profile/components/HealthConditions";
import axios from "axios";
import CurrentMedications from "./components/CurrentMedications.jsx";
import BasicInfo from "./components/BasicInfo.jsx";
import ContactInfo from "./components/ContactInfo.jsx";
import Allergies from "./components/Allergies.jsx";
import PaymentInfo from "./components/PaymentInfo.jsx";
import DeliveryAddress from "./components/DeliveryAddress.jsx";
import Suggestion from "./components/Suggestion.jsx";
import Countries from "../../Components-Common/Countries.jsx";

const Profile = () => {
  const [data, setData] = useState({});
  const [pageContent, setPageContent] = useState(0);

  const [countdown, setCountdown] = useState(5);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const validateAndFetchData = async () => {
      try {
        const response = await axios.get(
          BACKEND_URL + "/auth/user/getProfileData",
          { withCredentials: true }
        );
        setData(response.data);
        console.log(response.data);
        setTimeout(() => setPageContent(2), 1000);
      } catch (err) {
        console.log(err);
        setPageContent(1);
      }
    };

    validateAndFetchData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (pageContent == 1) {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        window.location.href = "/login";
      }
    }
  }, [pageContent, countdown]);

  const basicInfo = {
    id: "basicInfo",
    image: data["image"] || "",
    name: data["firstName"] + " " + data["lastName"],
    firstName: data["firstName"] || "",
    lastName: data["lastName"] || "",
    memberID: data["memberID"] || "",
    percentage: data["percentage"],
  };



  const contactInfo = {
    id: "contactInfo",
    title: "Contact Information",
    countryCode: data["countryCode"],
    phone: data["mobileNumber"],
    email: data["email"],
    location: data["country"] || "--",
    // location: data["country"] ? (Countries.find((c) => c.phone === Number(data["country"]))?.name) : "--",
      houseNumber: data["houseNumber"] || "",
      landmark: data["landmark"] || "",
      country: data["country"] || "",
      state: data["state"] || "",
      city: data["city"] || "",
      postalCode: data["postalCode"] || "",
  };


  const currentMedications = {
    id: "currentMedications",
    title: "Current Medications",
    // medications: [
    //   {
    //     medicationID: 1,
    //     name: "Advil"
    //   },
    //   {
    //     medicationID: 2,
    //     name: "Motrin"
    //   },
    // ]
    medications: data["currentMedications"] || []

  };

  const healthConditions = {
    id: "healthConditions",
    title: "Health Conditions",
    // conditions: [
    //   {
    //     conditionID: 1,
    //     name: "Diabetes"
    //   },
    //   {
    //     conditionID: 2,
    //     name: "Hypertension"
    //   }
    // ],
    conditions: data["healthConditions"] || []
  };

  const allergies = {
    id: "allergies",
    title: "Allergies",
    // allergies: [
    //   {allergyID:1, name:"Anesthesia (Lidocaine)"},
    //   {allergyID:2, name:"Aspirin & NSAIDs (Ibuprofen, Naproxen)"}
    // ]
    allergies: data["currentAllergies"] || []
  };

  const paymentInfo = {
    id: "paymentInfo",
    title: "Payment Information",
    // cards: [
    //   {
    //     cardID: 1,
    //     cardHolderName: "Jayakrishna",
    //     cardNumber: "98XXXXXXXXXXXXXX",
    //     expirationDate: "06/26",
    //     cvv: 765
    //   },
    //   {
    //     cardID: 2,
    //     cardHolderName: "JK",
    //     cardNumber: "78XXXXXXXXXXXXXX",
    //     expirationDate: "06/26",
    //     cvv: 765
    //   }
    // ]
    cards: data["cards"] || []
  };

  const deliveryAddress = {
    id: "deliveryAddress",
    title: "Delivery Address",
    // addresses: [
    //   {
    //     deliveryAddressID: 1,
    //     houseNumber: "16-1-337",
    //     landmark: "SRR Thota",
    //     city: "Warangal",
    //     state: "Telangana",
    //     country: "India",
    //     postalCode: "506002",
    //   },
    //   {
    //     deliveryAddressID: 2,
    //     houseNumber: "16-1-337",
    //     landmark: "SRR Thota",
    //     city: "Warangal",
    //     state: "Telangana",
    //     country: "India",
    //     postalCode: "506002",
    //   }
    // ]
    addresses: data["addresses"] || []
  }

  // const subscription = {
  //   id: "subscription",
  //   title: "Current Plan",
  //   plan: "--",
  // };

  const dependents = data["dependents"] || []
  // const dependents = [
  //   {
  //     dependentID: "dpt$cJ0UIwtx",
  //     name: "DependentBro",
  //     healthConditions: [
  //       {
  //         conditionID: 1,
  //         name: "Diabetes"
  //       },
  //       {
  //         conditionID: 2,
  //         name: "Hypertension"
  //       }
  //     ],
  //     allergies: [
  //       {allergyID:1, name:"Anesthesia (Lidocaine)"},
  //       {allergyID:2, name:"Aspirin & NSAIDs (Ibuprofen, Naproxen)"}
  //     ],
  //     medications: [
  //       {
  //         medicationID: 1,
  //         name: "Acetaminophen (Tylenol)"
  //       },
  //       {
  //         medicationID: 2,
  //         name: "Ibuprofen (Advil, Motrin)"
  //       },
  //     ],
  //     image:
  //       "https://res.cloudinary.com/dkezdazmt/image/upload/Evernorth/evernorth_logo",
  //   },
  //   {
  //     dependentID: "dpt$cJ0UIwtx",
  //     name: "DependentBro",
  //
  //     healthConditions: [
  //       {
  //         conditionID: 1,
  //         name: "Diabetes"
  //       },
  //       {
  //         conditionID: 2,
  //         name: "Hypertension"
  //       }
  //     ],
  //     allergies: [
  //       {allergyID:1, name:"Anesthesia (Lidocaine)"},
  //       {allergyID:2, name:"Aspirin & NSAIDs (Ibuprofen, Naproxen)"}
  //     ],
  //     medications: [
  //       {
  //         medicationID: 1,
  //         name: "Acetaminophen (Tylenol)"
  //       },
  //       {
  //         medicationID: 2,
  //         name: "Ibuprofen (Advil, Motrin)"
  //       },
  //     ],
  //     image:
  //         "https://res.cloudinary.com/dkezdazmt/image/upload/Evernorth/evernorth_logo",
  //   },
  // ];



  return (

    <>
      {pageContent == 0 ? (
        <div className="h-screen flex justify-center mt-4 items-center ">
          <img
            src="https://res.cloudinary.com/dkezdazmt/image/upload/v1737912774/Evernorth/loading.svg"
            alt="Loading..."
            className="h-24"
          />{" "}
        </div>
      ) : pageContent == 1 ? (
        <div className="flex gap-2 flex-1 items-center justify-center flex-col h-screen">
          <p className="  text-6xl font-bold">401 UNAUTHORIZED</p>
          <p className="text-center">
            Redirecting to{" "}
            <a href="/login" className="text-blue-500 underline">
              login
            </a>{" "}
            in <span className="font-semibold text-lg">{countdown}</span>{" "}
            seconds...
          </p>
        </div>
      ) : (
          <div className="flex flex-col h-screen justify-between ">
            <Navbar index={5} />
        <div className="h-screen overflow-scroll flex justify-evenly gap-1 m-8 ">
          <div
            id="left"
            className=" w-[30%] bg-[#f1f5f9] flex flex-col gap-4 p-2"
          >
            <BasicInfo data={basicInfo} />
            <ContactInfo data={contactInfo} />

            <CurrentMedications data={currentMedications} />
            <HealthConditions data={healthConditions} />
            <Allergies data={allergies} />

            <br />

          </div>
          <div
            id="right"
            className=" w-[60%] bg-[#f1f5f9] flex flex-col gap-4 p-2"
          >
            <Suggestion percentage = {basicInfo.percentage} />
            <DeliveryAddress data={deliveryAddress}/>

            <PaymentInfo data={paymentInfo} />
            <Dependents
              dependents={dependents}
            />

            <br/>
          </div>

        </div>


          </div>

      )}


    </>

  );
};

export default Profile;

