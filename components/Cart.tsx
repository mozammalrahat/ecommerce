import React, { useState } from "react";
import SubmitButton from "./SubmitButton";
import { Router } from "next/router";

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
}

const products: Product[] = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];

const Cart: React.FC<CartProps> = ({ onClose }) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const router = Router;

  const Checkout: React.FC = () => {
    return (
      <div className="leading-loose">
        <form className="max-w-xl m-4 p-10 bg-white rounded shadow-xl">
          <p className="text-gray-800 font-medium">Customer information</p>
          <div className="">
            <label className="block text-sm text-gray-00" for="cus_name">
              Name
            </label>
            <input
              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
              id="cus_name"
              name="cus_name"
              type="text"
              required=""
              placeholder="Your Name"
              aria-label="Name"
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm text-gray-600" for="cus_email">
              Email
            </label>
            <input
              class="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
              id="cus_email"
              name="cus_email"
              type="text"
              required=""
              placeholder="Your Email"
              aria-label="Email"
            />
          </div>
          <div className="mt-2">
            <label className=" block text-sm text-gray-600" for="cus_email">
              Address
            </label>
            <input
              class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
              id="cus_email"
              name="cus_email"
              type="text"
              required=""
              placeholder="Street"
              aria-label="Email"
            />
          </div>
          <div className="mt-2">
            <label
              className="hidden text-sm block text-gray-600"
              for="cus_email"
            >
              City
            </label>
          </div>
          <p className="mt-4 text-gray-800 font-medium">Payment information</p>
          <div className="flex justify-between items-center">
            <p className="text-base font-medium text-gray-900">Subtotal</p>
            <p className="text-gray-700">$262.00</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-base font-medium text-gray-900">Method</p>
            <p className="text-gray-700">Cash on Delivery</p>
          </div>

          <div className="mt-4">
            <SubmitButton onClick={onClose}>Confirm Order</SubmitButton>
          </div>
        </form>
      </div>
    );
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
            {products.map((product) => (
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
                    <p className="text-gray-500">Qty {product.quantity}</p>

                    <div className="flex">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
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
            <p className="text-gray-700">$262.00</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>

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

      {isCheckout && <Checkout />}
    </div>
  );
};

export default Cart;
