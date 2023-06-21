import React, { useState, useEffect, useRef } from "react";
import { Product, Item, Order } from "../../types";
interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  buttonText: string;
}

const OrderPopupModal: React.FC<PopupModalProps> = ({
  isOpen,
  onClose,
  order,
  buttonText,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? "visible" : "hidden"
      } transition-opacity duration-300`}
    >
      <div className="fixed inset-0 bg-black opacity-50" />
      <div
        className="bg-white rounded-lg p-6 z-10 w-2/3 max-w-xl"
        ref={modalRef}
      >
        {order && (
          <div className="flex">
            <div className="w-1/2">
              <h3 className="text-lg font-medium mb-4">Order Details</h3>
              <div className="flex flex-col mb-6">
                <div className="flex">
                  <span className="font-medium">Customer Phone:</span>
                  <span className="text-gray-700 ml-2">{order.phone}</span>
                </div>
                <div className="flex">
                  <span className="font-medium">Customer Name:</span>
                  <span className="text-gray-700 ml-2">{order.name}</span>
                </div>
                <div className="flex">
                  <span className="font-medium">Address:</span>
                  <span className="text-gray-700 ml-2">{order.address}</span>
                </div>
                <div className="flex">
                  <span className="font-medium">Total Products:</span>
                  <span className="text-gray-700 ml-2">
                    {order.totalQuantity}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-medium">Total Price:</span>
                  <span className="text-gray-700 ml-2">{order.totalPrice}</span>
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <h3 className="text-lg font-medium mb-4">Order Items</h3>
              <div className="flex flex-col">
                {order.cart.map((item) => (
                  <div key={item.id} className="flex items-center mb-4">
                    <img
                      src={item.imageSrc}
                      // alt={item.imageAlt}
                      className="h-10 w-10 object-cover rounded-full"
                    />
                    <div className="ml-4">
                      <div className="text-sm text-gray-700 font-medium">
                        {item.name}
                      </div>
                      <div className="text-sm text-gray-500">{item.color}</div>
                      <div className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </div>
                      <div className="text-sm text-gray-500">
                        Price: {item.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default OrderPopupModal;
