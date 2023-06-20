import React, { useState } from "react";
import SubmitButton from "../SubmitButton";
import OrderPopupModal from "./OrderPopupModal";

type Product = {
  id: number;
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  price: string;
  color: string;
};

type Item = {
  product: Product;
  quantity: number;
};

type Order = {
  id: string;
  customerId: string;
  phone: string;
  items: Item[];
  totalPrice: string;
  status: string;
  totalProduct: number; // Added the totalProduct field
};

const Orders: Order[] = [
  {
    id: "1",
    customerId: "1",
    phone: "1234567890",
    items: [
      {
        product: {
          id: 1,
          name: "Product 1",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
          imageAlt: "Product 1",
          price: "$35",
          color: "Red",
        },
        quantity: 2,
      },
      {
        product: {
          id: 2,
          name: "Product 2",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
          imageAlt: "Product 2",
          price: "$350",
          color: "Blue",
        },
        quantity: 1,
      },
    ],
    totalPrice: "$420",
    status: "Pending",
    totalProduct: 3, // Added the totalProduct value
  },
  {
    id: "2",
    customerId: "2",
    phone: "9876543210",
    items: [
      {
        product: {
          id: 3,
          name: "Product 3",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
          imageAlt: "Product 3",
          price: "$445",
          color: "Green",
        },
        quantity: 3,
      },
      // Add more products here if needed
    ],
    totalPrice: "$1335",
    status: "Delivered",
    totalProduct: 3, // Added the totalProduct value
  },
  // Add more orders here if needed
];

const OrderList: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const openOrderModal = (order: Order) => {
    setSelectedOrder(order);
    setIsOpen(true);
  };

  const closeOrderModal = () => {
    setSelectedOrder(null);
    setIsOpen(false);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h2 className="text-xl font-bold mb-4">Order List</h2>
      <div className="max-h-60 overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="items-center py-2 px-4 border-b text-center">
                Order ID
              </th>
              <th className="items-center py-2 px-4 border-b text-center">
                User ID
              </th>
              <th className="items-center py-2 px-4 border-b text-center">
                Total Amount
              </th>
              <th className="items-center py-2 px-4 border-b text-center">
                Total Product
              </th>
              <th className="items-center py-2 px-4 border-b text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Orders.map((order) => (
              <tr key={order.id} onClick={() => openOrderModal(order)}>
                <td className="items-center py-2 px-4 border-b text-center">
                  {order.id}
                </td>
                <td className="items-center py-2 px-4 border-b text-center">
                  {order.customerId}
                </td>
                <td className="items-center py-2 px-4 border-b text-center">
                  {order.totalPrice}
                </td>
                <td className="items-center py-2 px-4 border-b text-center">
                  {order.totalProduct}
                </td>
                <td className="items-center py-2 px-4 border-b text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <OrderPopupModal
        isOpen={isOpen}
        onClose={closeOrderModal}
        order={selectedOrder} // Pass the order object here
        buttonText={"Delete"}
      />
    </div>
  );
};

export default OrderList;
