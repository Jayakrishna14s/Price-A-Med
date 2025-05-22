import { useEffect, useState } from "react";
import Navbar from "/src/Components-Common/Navbar";
import Medicines from "/src/pages/home/components/Medicines";
import axios from "axios";

const Home = () => {
  const [authorized, setAuthorized] = useState(0);
  const [countdown, setCountdown] = useState(5);

  const [cartCount, setCartCount] = useState(0);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const checkUserValidity = async () => {
      try {
        const response = await axios.get(BACKEND_URL + "/auth/user", {
          withCredentials: true,
        });

        setAuthorized(2);

        console.log(response.data);
      } catch (error) {
        console.log(error);
        setAuthorized(1);
      }

      // setTimeout(() => {
      // setAuthorized(response.data ? 2 : 1);
      // }, 6000);
    };

    checkUserValidity();
  }, []);

  useEffect(() => {
    if (authorized == 1) {
      // localStorage.removeItem("token");
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        window.location.href = "/login";
      }
    }
  }, [countdown, authorized]);

  return (
    <>
      {authorized == 0 ? (
        <div className="h-screen flex justify-center mt-4 items-center ">
          <img
            src="https://res.cloudinary.com/dkezdazmt/image/upload/v1737912774/Evernorth/loading.svg"
            alt="Loading..."
            className="h-24"
          />{" "}
        </div>
      ) : authorized == 1 ? (
        <div className="h-screen flex justify-center mt-4 items-center ">
          <div className="flex gap-2 flex-1 items-center justify-center flex-col">
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
        </div>
      ) : (
        <div className="flex flex-col justify-between h-screen">
          <Navbar index={0} className="flex-none" cartCount={cartCount} />
          <div className="flex gap-2 flex-1 overflow-scroll">
            {/*<Filter />*/}
            <Medicines setCartCount={setCartCount} />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;

// const token = localStorage.getItem("jwtToken");
//   const Token = `${token}jhadsjs`;
//   try {
//     const response = await fetch("/api/validateUser", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${Token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     console.log("jagsdhsa");

//     if (response.ok) {
//       const contentType = response.headers.get("Content-Type");
//       if (contentType && contentType.includes("application/json")) {
//         const data = await response.json();
//         console.log(data);
//       } else {
//         console.log("Mahchjsdhjas");
//         throw new Error("Expected JSON, but got: " + contentType);
//       }
//     } else {
//       throw new Error("User is not valid or token has expired");
//     }
//   } catch (error) {
//     console.log(error.message);
//     console.log("caught - 10000000000000001");
//   }
// };
