import React from "react";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

const customers: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
  },
  {
    id: "277",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "9876543210",
  },
  {
    id: "11212",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
  },
  {
    id: "222",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "9876543210",
  },
  {
    id: "111",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
  },
  {
    id: "212",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "9876543210",
  },
  {
    id: "121",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
  },
  {
    id: "21",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "9876543210",
  },
  {
    id: "18",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
  },
  {
    id: "232323",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "9876543210",
  },
  {
    id: "1000",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
  },
  {
    id: "298",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "9876543210",
  },
  {
    id: "100",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
  },
  {
    id: "29",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "9876543210",
  },
  {
    id: "19",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
  },
  {
    id: "27",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "9876543210",
  },
  {
    id: "14",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
  },
  {
    id: "22",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "9876543210",
  },
  {
    id: "11",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
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
                Actions
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
                  <button
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Add Customer</h3>
        <div className="flex items-center">
          <input
            placeholder="Customer Phone"
            type="text"
            className="border border-gray-300 rounded px-4 py-2 mr-2"
          />
          <input
            placeholder="Password"
            type="text"
            className="border border-gray-300 rounded px-4 py-2 mr-2"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded">
            Add Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomersList;
