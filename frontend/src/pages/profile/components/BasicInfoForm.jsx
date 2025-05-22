import { AwesomeCaptcha } from "react-awesome-captcha";
import { useState } from "react";
import axios from "axios";

const BasicInfoForm = ({ initialDataSection }) => {
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [dataSection, setDataSection] = useState(initialDataSection);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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
        return initialDataSection.firstName === dataSection.firstName
            && initialDataSection.lastName === dataSection.lastName
            && !imageFile;
    }

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

    async function updateBasicInfo () {
        if(!isCaptchaValid) {
          setAlertMessage("Invalid Captcha");
          return;
        }

        if(!dataSection.firstName || !dataSection.lastName ) {
            setAlertMessage("All fields are required");
            return;
        }

        console.log(imageFile);
        if(!noChangesDetected()) {
            console.log(imageFile);

            // const imageUrl = imageFile ? await throwIntoCloudinaryAndGetLink(imageFile) : null;
            const payload = {
                "image": imageFile ? await throwIntoCloudinaryAndGetLink(imageFile) : null,
                "firstName": dataSection.firstName,
                "lastName": dataSection.lastName
            };

            console.log(payload);
            try {
                const response = await axios.post(
                    `${BACKEND_URL}/auth/user/mps/basicinfo`, // Change to your endpoint
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
        }

        window.location.reload();
    };


    return (
    <div className="p-4">
      <div className="text-white shadow-lg text-center text-2xl font-semibold mb-4 border-b-2 mx-12">
        Edit Personal Details
      </div>

      <h2 className="text-center my-2 text-white font-semibold">
        Update profile
      </h2>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-[70%] h-40 border-2 border-black border-dashed rounded-lg cursor-pointer bg-[#3EFFC0] hover:bg-[#3EFFC0CC]" //dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          {imagePreview != null && (
            <div className=" flex justify-center w-[100%] h-[100%]">
              <img
                src={imagePreview}
                alt="Uploaded file preview"
                className=" w-[100%] h-[100%] object-cover rounded-lg"
              />
            </div>
          )}
          {imagePreview == null && (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
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
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
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
              console.log(file);
              if (file) {
                const fileType = file.type;
                if (
                  fileType !== "image/png" &&
                  fileType !== "image/jpeg" &&
                  fileType !== "image/jpg"
                ) {
                  console.log(file);
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

      <div className="text-white px-12 mt-8 font-semibold">First Name</div>
      <input
        type="text"
        name="firstName"
        value={dataSection.firstName}
        onChange={handleInputChange}
        placeholder="Enter firstname"
        onFocus={() => {
          setAlertMessage("");
        }}
        className="mx-12 w-[80%] p-1 rounded px-2 border-2 border-[#035c67] bg-gray-100 text-[#035c67]"
      />
      <div className="text-white px-12 mt-4 font-semibold">Last Name</div>
      <input
        type="text"
        name="lastName"
        value={dataSection.lastName}
        onChange={handleInputChange}
        placeholder="Enter lastname"
        onFocus={() => {
          setAlertMessage("");
        }}
        className="mx-12 w-[80%] p-1 rounded px-2 border-2 border-[#035c67] bg-gray-100 text-[#035c67]"
      />

      <div className="w-full flex items-center justify-center"
           onFocus={() => {
             setAlertMessage("");
           }}
      >
        <AwesomeCaptcha

          onValidate={handleCaptchaValidation}
          className={"flex justify-between w-[80%] font-medium scale-75 "}
        />
      </div>

      {alertMessage != ""  && (
          <div className="w-full px-14">
            <p className="w-full text-center text-white bg-red-500 text-sm mb-2 ">{alertMessage}</p>
          </div>
      )}

      <div className="flex justify-center w-full mb-4">
        <button
          onClick={() => updateBasicInfo()}
          className=" bg-[#035c67] p-2 px-4 text-white font-semibold rounded-lg hover:bg-[#035c67dd] hover:scale-110 transition duration-1000"
        >
          Update
        </button>
      </div>


    </div>
  );
};

export default BasicInfoForm;
