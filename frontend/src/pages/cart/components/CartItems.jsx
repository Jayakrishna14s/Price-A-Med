import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CartItems = () => {
  const backend = import.meta.env.VITE_BACKEND;
  const [cartItems, setCartItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [showDialog, setShowDialog] = useState(false); // Dialog state

  const navigate = useNavigate();

  function handleRemove(id) {
    setCartItems(cartItems.filter((item) => item.medId !== id));

    fetch(`${backend}/api/removeItem?memberID=${"ENM$Hduu5wFX"}&itemID=${id}`, {
      method: "POST",
      credentials: "include",
    }).then((res) => console.log(res));
  }

  function handlePlaceOrder() {
    navigate("/checkout");
  }

  function handleQuantityChange(id, operation) {
    fetch(
      `${backend}/api/updateCartQuantity?memberID=${"ENM$Hduu5wFX"}&itemID=${id}&operation=${encodeURIComponent(
        operation
      )}`,
      {
        method: "POST",
        credentials: "include",
      }
    )
      .then((res) => res.text())
      .then((res) => JSON.parse(res))
      .then((updatedItem) => {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.medId === id
              ? { ...item, quantity: updatedItem.quantity }
              : item
          )
        );
      })
      .catch((error) => console.error("Error updating quantity:", error));
  }

  useEffect(() => {
    fetch(`${backend}/api/getuserCart?memberId=${"ENM$Hduu5wFX"}`, {
      credentials: "include",
    })
      .then((res) => res.text())
      .then((res) => JSON.parse(res))
      .then((res) => {
        console.log(res);

        setDiscount(res.discount);
        const userCart = res.cartItems.map((item) => ({
          id: item.id,
          image: item.item.medication.medImage,
          price: item.item.unitPrice,
          quantity: item.quantity,
          name: item.item.medication.name,
          description: item.item.medication.description,
          deliveryExpectancy: "Thu October 18",
          medId: item.item.id,
        }));

        setCartItems(userCart);
      });
  }, []);
  // const cartItems = [
  //   {
  //     id: 1,
  //     image:
  //       "https://res.cloudinary.com/dkezdazmt/image/upload/v1737921754/Evernorth/lipitor.png",
  //     price: 23.7,
  //     name: "Lipitor",
  //     description: "It is a drug and also a drug",
  //     deliveryExpectancy: "Thu October 18",
  //   },
  //   {
  //     id: 2,
  //     image:
  //       "https://res.cloudinary.com/dkezdazmt/image/upload/v1737921754/Evernorth/lipitor.png",
  //     price: 23.5,
  //     name: "Lipitor",
  //     description: "It is a drug and also a drug",
  //     deliveryExpectancy: "Thu October 18",
  //   },
  //   {
  //     id: 3,
  //     image:
  //       "https://res.cloudinary.com/dkezdazmt/image/upload/v1737921754/Evernorth/lipitor.png",
  //     price: 19.6,
  //     name: "Lipitor",
  //     description: "It is a drug and also a drug",
  //     deliveryExpectancy: "Thu October 18",
  //   },
  // ];
  return (
    <div className=" w-[80%] m-4 p-8  ">
      <h1 className="font-bold text-3xl text-center bg-white py-4 underline rounded-lg shadow-md">
        My Cart
      </h1>

      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
              className="w-16 mx-auto"
              alt="Checkmark"
            />
            <h2 className="text-xl font-semibold mt-4">
              Order Placed Successfully!
            </h2>
          </div>
        </div>
      )}

      <ul className="flex flex-col gap-4 my-8">
        {cartItems.map((item) => {
          return (
            <li
              key={item.id}
              className="bg-white p-4 shadow-lg flex gap-8 rounded-lg"
            >
              <img
                src={item.image}
                className="h-[250px] w-[250px] rounded-lg"
              />

              <div className="flex flex-col w-full p-2">
                {/* Header Section */}
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-xl">{item.name}</h1>
                  <span className="flex items-center gap-4">
                    <img
                      src="https://res.cloudinary.com/dkezdazmt/image/upload/v1737924542/Evernorth/truck.svg"
                      className="h-[25px] inline"
                    />
                    <span>
                      Delivery by |{" "}
                      <span className="text-[#3EFF66] font-semibold">
                        {item.deliveryExpectancy}
                      </span>
                    </span>
                  </span>
                </div>

                {/* Description */}
                <p className="mt-4 mb-4">{item.description}</p>

                {/* Price Calculation with Quantity */}
                <span className="font-semibold text-2xl flex items-center gap-2">
                  <span className="line-through text-gray-500">
                    ${(item.price * item.quantity).toFixed(2)}{" "}
                    {/* Original total price */}
                  </span>
                  <span className="font-bold text-green-600">
                    $
                    {(
                      item.price *
                      (1 - discount / 100) *
                      item.quantity
                    ).toFixed(2)}{" "}
                    {/* Discounted total price */}
                  </span>
                </span>

                <div className="flex items-center gap-4 mt-4">
                  <span className="font-semibold">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 bg-gray-300 rounded-md hover:bg-gray-400"
                      onClick={() => handleQuantityChange(item.medId, "-")}
                      disabled={item.quantity == 1}
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      className="p-2 bg-gray-300 rounded-md hover:bg-gray-400"
                      onClick={() => handleQuantityChange(item.medId, "+")}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex-grow"></div>

                {/* Remove Button */}
                <button className="text-left mt-4">
                  <span
                    className="p-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-200"
                    onClick={() => handleRemove(item.medId)}
                  >
                    REMOVE
                  </span>
                </button>
              </div>
            </li>
          );
        })}

        {cartItems.length == 0 && (
          <li className="flex flex-col items-center justify-center bg-white p-8 h-[200px]">
            <img
              src="https://res.cloudinary.com/dkezdazmt/image/upload/v1737902486/Evernorth/history.svg"
              className="h-[100px]"
            />
            <span>No items</span>
          </li>
        )}
      </ul>

      {cartItems.length > 0 && (
        <div className="p-2 bg-white rounded-lg shadow-lg flex justify-between items-center">
          <span>
            &nbsp;&nbsp; Total : &nbsp; &nbsp;$
            <span className="font-semibold">
              {cartItems
                .reduce(
                  (total, item) =>
                    total + item.price * (1 - discount / 100) * item.quantity,
                  0
                )
                .toFixed(2)}
            </span>
          </span>
          <button
            className="bg-orange-400 p-2 font-semibold rounded-lg hover:scale-105 hover:bg-orange-300"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      )}

      <br />
      <br />
    </div>
  );
};

export default CartItems;
