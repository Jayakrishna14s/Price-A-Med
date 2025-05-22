import Navbar from "../../Components-Common/Navbar";
import PlacedOrders from "./components/PlacedOrders";

const Orders = () => {
  return (
    <div className="flex flex-col h-screen ">
      <Navbar index={2} className="flex-none " />
      {/* <Footer /> */}
      <div className="flex-1 overflow-scroll pt-4">
        <PlacedOrders />
      </div>
    </div>
  );
};

export default Orders;
