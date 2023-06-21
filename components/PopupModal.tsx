import React, { useState, useEffect, useRef, useContext } from "react";
import { CartContext, CartContextType } from "../CartProvider";
import { CartProduct } from "@/types";
interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  buttonText: string;
}
interface Product {
  id: number;
  name: string;
  href?: string;
  imageSrc: string;
  imageAlt?: string;
  price: string;
  color: string;
  quantity?: number;
}

const PopupModal: React.FC<PopupModalProps> = ({
  isOpen,
  onClose,
  product,
  buttonText,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const cartContext = useContext(CartContext) as CartContextType;
  const { dispatch } = cartContext;
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  const handleAddToCart = () => {
    if (product) {
      const { id, name, price, imageSrc, color } = product;
      const newProduct: CartProduct = {
        id,
        name,
        price,
        imageSrc,
        quantity: 1,
      };

      dispatch({ type: "ADD_TO_CART", payload: newProduct });
      // setAddedToCart(true);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? "visible" : "hidden"
      } transition-opacity duration-300`}
    >
      <div className="fixed inset-0 bg-black opacity-50" />
      <div className="bg-white rounded-lg p-6 z-10 w-1/3" ref={modalRef}>
        <div className="relative">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product?.imageSrc}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product?.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product?.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product?.price}
                </p>
              </div>
            </div>
            <div className="w-1/2 px-4">
              <div className="bg-gray-100 p-4 rounded-md">
                <h3 className="text-lg font-medium mb-2">
                  Product Description
                </h3>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent at augue luctus.
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className={`mt-4 px-4 py-2 rounded-md  ${
            buttonText === "Delete"
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default PopupModal;
