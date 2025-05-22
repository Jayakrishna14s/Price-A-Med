import { useState } from "react";
import { AwesomeCaptcha } from "react-awesome-captcha";

import axios from "axios";

export default function LoginForm() {
  const [isFocused, setIsFocused] = useState(false);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loginData, setLoginData] = useState("");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  async function Validate() {
    const memberID = loginData["memberID"] || "";
    const password = loginData["password"] || "";
    const regex = /^ENM\$[A-Za-z0-9]{8}$/;
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    console.log(loginData);

    if (!regex.test(memberID)) {
      setAlertMessage("Invalid Member ID");
      return;
    }

    if (!isCaptchaValid) {
      setAlertMessage("Invalid captcha");
      return;
    }
    // check if entered member id exists in db

    if (!passwordRegex.test(password)) {
      setAlertMessage("Invalid password");
      return;
    }

    const data = {
      memberID: memberID,
      password: password,
    };

    try {
      const response = await axios.post(BACKEND_URL + "/auth/login", data, {
        withCredentials: true,
      });

      console.log(response.data);
      // const { token } = response.data;
      // // document.cookie = `jwtToken=${jwtToken}; Secure; HttpOnly; SameSite=Strict; max-age=${jwtExpiration}; path=/`;
      //
      // // setAlertMessage(jwtToken);
      // localStorage.setItem("token", token);
      window.location.href = "/home";

      return;
    } catch (error) {
      const { message } = error.response.data;
      console.log(message);
      setAlertMessage(message);
      return;
    }

    // const { valid, message } = response.data;
    // console.log(valid + " " + message);

    //member id vs password check
    // console.log(loginData);

    // login jwt
  }

  const handleCaptchaValidation = (isValid) => {
    setIsCaptchaValid(isValid);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  return (
    <div className="flex flex-col">
      <div className="w-full mx-2 flex-1">
        <div className="text-3xl mb-8">Member Login</div>
        <div className="font-bold h-6 mt-3 text-gray-500 text-md leading-8 uppercase">
          {""}
          MEMBER ID
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            type="text"
            onChange={handleChange}
            value={loginData["memberID"] || ""}
            name="memberID"
            placeholder="Enter your Member ID"
            onFocus={() => {
              setIsFocused(true);
              setAlertMessage("");
            }}
            onBlur={() => setIsFocused(false)}
            className="p-3 px-5 pr-20 appearance-none outline-none w-full text-gray-800"
          />
        </div>

        <div className="font-bold h-6 mt-3 text-gray-500 text-md leading-8 uppercase">
          {""}
          Password
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            type="password"
            onChange={handleChange}
            value={loginData["password"] || ""}
            name="password"
            placeholder="Enter the password"
            onFocus={() => {
              setIsFocused(true);
              setAlertMessage("");
            }}
            onBlur={() => setIsFocused(false)}
            className="p-3 px-5 appearance-none outline-none w-full text-gray-800"
          />
        </div>

        <div
          onFocus={() => {
            setIsFocused(true);
            setAlertMessage("");
          }}
          onBlur={() => setIsFocused(false)}
        >
          <AwesomeCaptcha
            onValidate={handleCaptchaValidation}
            className={"flex justify-between w-full font-medium"}
          />
        </div>

        {!isFocused && alertMessage != "" && (
          <p className="text-sm text-center text-[red] mt-5">{alertMessage}</p>
        )}

        <div className="p-1 mt-8 flex items-center justify-center">
          <button
            className="w-full h-[50px] bg-green-500 text-white rounded-md hover:bg-slate-600 font-semibold"
            onClick={Validate}
          >
            Login
          </button>
        </div>

        <div className="p-3 flex flex-row-reverse">
          <a href="/forgotpassword" className="text-sm underline">
            Forgot Password
          </a>
        </div>
      </div>
    </div>
  );
}
