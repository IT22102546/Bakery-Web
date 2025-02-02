import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PayButton from "../Components/PayButton";

export default function OrderSummary() {
  const cart = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const deliveryfee = 300;
  const [paymentMethod, setPaymentMethod] = useState("online");

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCOD = () => {
    navigate("/cod-form", {
      state: {
        userId: currentUser?._id,
        cartItems: cart.cartItems,
        subtotal: cart.cartTotalAmount,
        deliveryfee: deliveryfee,
        totalcost: cart.cartTotalAmount + deliveryfee,
      },
    });
  };

  return (
    <>
      {/* Order Summary UI */}
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 pb-5">
        <div className="px-4 pt-8 lg:pt-16">
          <h2 className="text-xl font-medium">Order Summary</h2>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {cart.cartItems?.map((cartItem) => (
              <div
                className="flex flex-col rounded-lg bg-white sm:flex-row"
                key={cartItem._id}
              >
                <img
                  className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src={cartItem.mainImage}
                  alt={cartItem.title}
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">
                    {cartItem.title} ({cartItem.cartTotalQuantity})
                  </span>
                  <p className="text-lg font-bold">
                    LKR {cartItem.cartTotalQuantity * cartItem.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Options */}
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <h2 className="text-xl font-medium">Payment Methods</h2>
          <form className="mt-8 space-y-3 rounded-lg bg-white px-2 py-4 sm:px-6">
            <div className="flex items-center rounded-lg border border-gray-200 bg-white p-4">
              <input
                id="online-payment"
                type="radio"
                value="online"
                name="payment-method"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
                checked={paymentMethod === "online"}
                onChange={handlePaymentMethodChange}
              />
              <label htmlFor="online-payment" className="ml-2 text-sm font-medium text-gray-900">
                Online Payment
              </label>
            </div>
            <div className="flex items-center rounded-lg border border-gray-200 bg-white p-4">
              <input
                id="cash-on-delivery"
                type="radio"
                value="cod"
                name="payment-method"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
                checked={paymentMethod === "cod"}
                onChange={handlePaymentMethodChange}
              />
              <label htmlFor="cash-on-delivery" className="ml-2 text-sm font-medium text-gray-900">
                Cash on Delivery
              </label>
            </div>
          </form>

          {paymentMethod === "online" ? (
            <PayButton
              cartItems={cart.cartItems}
              cartTotalAmount={cart.cartTotalAmount}
              deliveryfee={deliveryfee}
            />
          ) : (
            <button
              className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg text-lg font-semibold hover:bg-green-700"
              onClick={handleCOD}
            >
              Proceed to Cash on Delivery
            </button>
          )}
        </div>
      </div>
    </>
  );
}
