const section1 = () => {
  return (
    <div>
      <div className="text-3xl mb-8">Forgot Password ?</div>
      <div className="font-bold h-6 mt-3 text-gray-5 00 text-md leading-8 uppercase">
        {""}
        MEMBER ID
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-500 rounded">
        <input
          type="text"
          onChange={handleChange}
          value={newData["memberID"] || ""}
          name="memberID"
          placeholder="Enter your Member ID"
          onFocus={() => {
            setIsFocused(true);
            setAlertMessage("");
          }}
          onBlur={() => setIsFocused(false)}
          className="p-3 px-5 pr-20 appearance-none outline-none w-full text-gray-800 "
        />
      </div>

      {!isFocused && alertMessage != "" && (
        <p className="text-sm text-center text-[red] mt-5">alertMessage</p>
      )}

      <button
        className="w-full h-[50px] bg-[#0033FF] text-white rounded-md hover:bg-[#0033CC] font-semibold mt-5"
        onClick={ValidateAndSendOTP}
      >
        Send OTP
      </button>
    </div>
  );
};

const section2 = () => {
  return (
    <div>
      <div className="text-3xl mb-8">OTP sent to associated email</div>
      <div className="font-bold h-6 mt-3 text-gray-5 00 text-md leading-8 uppercase">
        {""}
        OTP
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-500 rounded">
        <input
          type="text"
          onChange={handleChange}
          value={newData["otp"] || ""}
          name="otp"
          placeholder="Enter OTP"
          onFocus={() => {
            setIsFocused(true);
            setAlertMessage("");
          }}
          onBlur={() => setIsFocused(false)}
          className="p-3 px-5 pr-20 appearance-none outline-none w-full text-gray-800 "
        />
      </div>

      {!isFocused && alertMessage != "" && (
        <p className="text-sm text-center text-[red] mt-5">alertMessage</p>
      )}

      <button
        className="w-full h-[50px] bg-[#0033FF] text-white rounded-md hover:bg-[#0033CC] font-semibold mt-5"
        onClick={ValidateAndSubmitOTP}
      >
        Submit
      </button>
    </div>
  );
};

const section3 = () => {
  return (
    <div>
      <div className="text-3xl mb-8">Change Password</div>
      <div className="font-bold h-6 mt-3 text-gray-5 00 text-md leading-8 uppercase">
        {""}
        Set Password
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-500 rounded">
        <input
          type="password"
          onChange={handleChange}
          value={newData["password"] || ""}
          name="password"
          placeholder="Enter a password"
          onFocus={() => {
            setIsFocused(true);
            setAlertMessage("");
          }}
          onBlur={() => setIsFocused(false)}
          className="p-3 px-5 pr-20 appearance-none outline-none w-full text-gray-800 "
        />
      </div>

      <div className="font-bold h-6 mt-3 text-gray-5 00 text-md leading-8 uppercase">
        {""}
        Confirm Password
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-500 rounded">
        <input
          type="password"
          onChange={handleChange}
          value={newData["cpassword"] || ""}
          name="cpassword"
          placeholder="Re-enter the password"
          onFocus={() => {
            setIsFocused(true);
            setAlertMessage("");
          }}
          onBlur={() => setIsFocused(false)}
          className="p-3 px-5 pr-20 appearance-none outline-none w-full text-gray-800 "
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
        <p className="text-sm text-center text-[red] mt-5">alertMessage</p>
      )}

      <button
        className="w-full h-[50px] bg-[#0033FF] text-white rounded-md hover:bg-[#0033CC] font-semibold mt-5"
        onClick={ValidateAndChangePassword}
      >
        Reset Password
      </button>
    </div>
  );
};

const section4 = () => {
  return (
    <div className="container md:mt-10">
      <div className="flex flex-col items-center">
        <div className="text-green-400">
          <svg
            className="w-24 h-24"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="https://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <div className="text-lg font-semibold text-gray-500">
          Password is changed successfully.
        </div>
        <a className="mt-10" href="/login">
          <button className="h-10 px-5 text-green-700 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-green-500 hover:text-white">
            Login
          </button>
        </a>
        <a href="/" className="text-sm mt-2 underline">
          Back to Home
        </a>
      </div>
    </div>
  );
};
