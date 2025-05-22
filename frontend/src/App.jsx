import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "/src/pages/index/Index";
import Signup from "/src/pages/signup/Signup";
import Login from "/src/pages/login/Login";
import Error from "/src/pages/error/Error";
import ForgotPassword from "/src/pages/forgotpassword/ForgotPassword";
import Home from "/src/pages/home/Home";
import Search from "/src/pages/search/Search";
import Profile from "/src/pages/profile/Profile";
import Prescription from "/src/pages/prescription/Prescription";
import Dashboard from "/src/pages/dashboard/Dashboard";
// import Help from "/src/pages/help/Help";
import Cart from "/src/pages/cart/Cart";
import Settings from "/src/pages/settings/Settings";
import FAQs from "/src/pages/faqs/FAQs";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import Orders from "/src/pages/orders/Orders";
import OrderTracking from "./pages/ordertracking/OrderTracking";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/prescription" element={<Prescription />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/help" element={<Help />} /> */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orderTracking" element={<OrderTracking />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
