import React, { useState, useEffect, useRef } from "react";

interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  order?: Order | null;
  buttonText: string;
}

interface Order {
  id: string;
  customerId: string;
  phone: string;
  items: OrderItem[];
  totalPrice: string;
  status: string;
  totalProduct: number;
}

interface OrderItem {
  product: Product;
  quantity: number;
}

interface Product {
  id: number;
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  price: string;
  color: string;
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
                  <span className="font-medium">Order ID:</span>
                  <span className="text-gray-700 ml-2">{order.id}</span>
                </div>
                <div className="flex">
                  <span className="font-medium">Customer ID:</span>
                  <span className="text-gray-700 ml-2">{order.customerId}</span>
                </div>
                <div className="flex">
                  <span className="font-medium">Phone:</span>
                  <span className="text-gray-700 ml-2">{order.phone}</span>
                </div>
                <div className="flex">
                  <span className="font-medium">Total Products:</span>
                  <span className="text-gray-700 ml-2">
                    {order.totalProduct}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-medium">Total Price:</span>
                  <span className="text-gray-700 ml-2">{order.totalPrice}</span>
                </div>
                <div className="flex">
                  <span className="font-medium">Status:</span>
                  <span className="text-gray-700 ml-2">{order.status}</span>
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <h3 className="text-lg font-medium mb-4">Order Items</h3>
              <div className="flex flex-col">
                {order.items.map((item) => (
                  <div key={item.product.id} className="flex items-center mb-4">
                    <img
                      src={item.product.imageSrc}
                      alt={item.product.imageAlt}
                      className="h-10 w-10 object-cover rounded-full"
                    />
                    <div className="ml-4">
                      <div className="text-sm text-gray-700 font-medium">
                        {item.product.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.product.color}
                      </div>
                      <div className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => {}}
            className={`px-4 py-2 rounded-md ${
              buttonText === "Delete"
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};
export default OrderPopupModal;
