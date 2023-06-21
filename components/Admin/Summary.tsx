import axios from "axios";
import React, { useEffect } from "react";

interface summaryDetails {
  totalCustomers: number;
  totalOrders: number;
  totalProducts: number;
}
interface summaryProps {
  summary: summaryDetails | {};
}

const Summary: React.FC<summaryProps> = ({ summary }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard Summary</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-500 text-white p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Total Customers</h3>
          <p className="text-3xl font-bold">{summary.totalCustomers}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Total Orders</h3>
          <p className="text-3xl font-bold">{summary.totalOrders}</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Total Products</h3>
          <p className="text-3xl font-bold">{summary.totalProducts}$</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
