import React, { useContext, useEffect, useState } from "react";
import SubmitButton from "./SubmitButton";
import axios from "axios";
import Cookies from "js-cookie";
import { CartContext, CartContextType } from "../CartProvider";
import CartProductList from "./CartProductList";
import Checkout from "./Checkout";

interface Product {
  id: number;
  name: string;
  color: string;
  price: string;
  imageSrc: string;
}
interface User {
  phone: string;
  role?: string;
}
interface CartProps {
  onClose: () => void;
  user: User;
}

const Cart: React.FC<CartProps> = ({ onClose, user }) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [address, setAddress] = useState("");
  const [name, setname] = useState("");
  const cartContext = useContext(CartContext) as CartContextType;
  const { cart, dispatch } = cartContext;

  const onChangehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "name") {
      setname(e.target.value);
    } else if (e.target.name === "address") {
      setAddress(e.target.value);
    }
  };
  const handleOrder = async (e: any) => {
    e.preventDefault();
    console.log("user is :", user);
    const order = {
      ...user,
      name,
      address,
      cart,
    };
    console.log("order", order);
    await axios
      .post("http://localhost:3000/api/orders/order", order, {
        headers: {
          Authorization: Cookies.get("token"),
        },
      })
      .then((res) => {
        dispatch({ type: "CLEAR_CART" });
        onClose();
      });
  };

  const removeProduct = (productId: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id: productId } });
  };

  let subtotal = 0;
  const calculateSubtotal = (): number => {
    cart.forEach((product) => {
      const price = Number(product.price.replace("$", ""));
      subtotal += price * product.quantity;
    });
    return subtotal;
  };

  return (
    <div className="overflow-auto flex flex-col h-full bg-white shadow-xl">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Shopping Cart</h3>
        <button onClick={onClose} className="text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {cart.length > 0 && (
        <CartProductList
          removeProduct={removeProduct}
          cart={cart}
        ></CartProductList>
      )}

      {cart.length > 0 && !isCheckout && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-base font-medium text-gray-900">Subtotal</p>
            <p className="text-gray-700">${calculateSubtotal().toFixed(2)}</p>
          </div>

          <SubmitButton onClick={() => setIsCheckout(true)}>
            Checkout
          </SubmitButton>

          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{" "}
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={onClose}
              >
                Continue Shopping <span aria-hidden="true">&rarr;</span>
              </button>
            </p>
          </div>
        </div>
      )}

      {cart.length > 0 && isCheckout && (
        <Checkout
          name={name}
          address={address}
          onChangehandler={onChangehandler}
          handleOrder={handleOrder}
          calculateSubtotal={calculateSubtotal}
        />
      )}
    </div>
  );
};

export default Cart;
