import React, { useState, useEffect } from "react";
import axios from "axios";
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
  totalQuantity: number;
  name: string;
};

const OrderList: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/api/orders");
      // console.log("Orders:", response.data.orders);
      setOrders(response.data.orders);
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

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
                Phone
              </th>
              <th className="items-center py-2 px-4 border-b text-center">
                Name
              </th>
              <th className="items-center py-2 px-4 border-b text-center">
                Address
              </th>
              <th className="items-center py-2 px-4 border-b text-center">
                Total Product
              </th>
              <th className="items-center py-2 px-4 border-b text-center">
                Total Price
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} onClick={() => openOrderModal(order)}>
                <td className="items-center py-2 px-4 border-b text-center">
                  {order.phone}
                </td>
                <td className="items-center py-2 px-4 border-b text-center">
                  {order.name}
                </td>
                <td className="items-center py-2 px-4 border-b text-center">
                  {order.address}
                </td>
                <td className="items-center py-2 px-4 border-b text-center">
                  {order.totalQuantity}
                </td>
                <td className="items-center py-2 px-4 border-b text-center">
                  {order.totalPrice}
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
        buttonText={"Disable"}
      />
    </div>
  );
};

export default OrderList;
