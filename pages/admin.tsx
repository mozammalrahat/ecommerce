import React from "react";
import Summary from "../components/Admin/Summary";
import CustomerList from "../components/Admin/CustomerList";
import OrderList from "../components/Admin/OrderList";
import ProductList from "../components/Admin/ProductList";

const Admin: React.FC = () => {
  return (
    <div className="bg-gray-200 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-8 ">
        <div className="col-span-2 md:col-span-2">
          <Summary />
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-8 ">
        <div className="col-span-2 md:col-span-1">
          <CustomerList />
        </div>
        <div className="col-span-2 md:col-span-1">
          <ProductList />
        </div>
      </div>
      <div className="mt-5 col-span-2 md:col-span-1">
        <OrderList />
      </div>
    </div>
  );
};

export default Admin;
