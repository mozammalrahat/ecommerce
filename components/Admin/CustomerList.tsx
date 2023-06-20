import React from "react";
import SubmitButton from "../SubmitButton";

type Customer = {
  id: string;
  role: string;
  phone: string;
};

const customers: Customer[] = [
  {
    id: "1",
    role: "user",
    phone: "1234567890",
  },
  {
    id: "277",
    role: "user",
    phone: "9876543210",
  },
  {
    id: "11212",
    role: "user",
    phone: "1234567890",
  },
  {
    id: "222",
    role: "user",
    phone: "9876543210",
  },
  {
    id: "111",
    role: "user",
    phone: "1234567890",
  },
  {
    id: "212",
    role: "user",
    phone: "9876543210",
  },
  {
    id: "121",
    role: "user",
    phone: "1234567890",
  },
  {
    id: "21",
    role: "user",
    phone: "9876543210",
  },
  {
    id: "18",
    role: "user",
    phone: "1234567890",
  },
  {
    id: "232323",
    role: "user",
    phone: "9876543210",
  },
  {
    id: "1000",
    role: "user",
    phone: "1234567890",
  },
  {
    id: "298",
    role: "admin",
    phone: "9876543210",
  },

  // Add more demo customers here
];

const CustomersList: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h2 className="text-xl font-bold mb-4">Customers List</h2>
      <div className="max-h-60 overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="items-center py-2 px-4 border-b text-center">
                ID
              </th>
              <th className="items-center py-2 px-4 border-b text-center">
                Phone
              </th>
              <th className="items-center py-2 px-4 border-b text-center">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="items-center py-2 px-4 border-b text-center">
                  {customer.id}
                </td>
                <td className="items-center py-2 px-4 border-b text-center">
                  {customer.phone}
                </td>
                <td className="items-center py-2 px-4 border-b text-center">
                  {customer.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Add Customer or Admin</h3>
        <div className="flex items-center">
          <div className="flex flex-col mr-2">
            <input
              placeholder="Customer Phone"
              type="text"
              className="border border-gray-300 rounded px-4 py-2 mb-2"
            />
            <input
              placeholder="Password"
              type="text"
              className="border border-gray-300 rounded px-4 py-2 mb-2"
            />
          </div>
          <select className="border border-gray-300 rounded px-4 py-2 mr-2">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="mt-4">
          <SubmitButton onClick={() => null}>
            Add Customer or Admin
          </SubmitButton>
        </div>
      </div>
    </div>
  );
};

export default CustomersList;
