import React, { useContext, useState } from "react";
import SubmitButton from "./SubmitButton";
import { Router } from "next/router";
import { CartContext, CartContextType } from "@/CartProvider";

interface Product {
  id: number;
  name: string;
  href: string;
  color: string;
  price: string;
  quantity: number;
  imageSrc: string;
  imageAlt: string;
}

interface CartProps {
  onClose: () => void;
  cart: Product[];
}

const Cart: React.FC<CartProps> = ({ onClose, cart }) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const router = Router;
  const cartContext = useContext(CartContext) as CartContextType;
  const { dispatch } = cartContext;
  const removeProduct = (productId: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id: productId } });
    console.log("Removing product with id: ", productId);
  };

  const calculateSubtotal = (): number => {
    let subtotal = 0;

    cart.forEach((product) => {
      const price = Number(product.price.replace("$", ""));
      subtotal += price * product.quantity;
    });
    return subtotal;
  };

  const Checkout: React.FC = () => {
    return <div className="leading-loose">{/* Checkout form */}</div>;
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
      <div className="mt-8">
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {cart.map((product) => (
              <li key={product.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href={product.href}>{product.name}</a>
                      </h3>
                      <p className="ml-4">{product.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">
                      Quantity : {product.quantity}
                    </p>
                    <div className="flex">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={() => removeProduct(product.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {!isCheckout && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-base font-medium text-gray-900">Subtotal</p>
            <p className="text-gray-700">${calculateSubtotal().toFixed(2)}</p>
          </div>

          {cart.length > 0 && (
            <SubmitButton onClick={() => setIsCheckout(true)}>
              Checkout
            </SubmitButton>
          )}

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

      {cart.length > 0 && isCheckout && <Checkout />}
    </div>
  );
};

export default Cart;
