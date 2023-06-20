import React, { useEffect, useState } from "react";
import SubmitButton from "../SubmitButton";
import axios from "axios";
import Cookies from "js-cookie";

type Customer = {
  id: string;
  role: string;
  phone: string;
};

const CustomersList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("/api/users");
      console.log("Customers:", response.data.customers);
      setCustomers(response.data.users);
    } catch (error) {
      console.log("Error fetching customers:", error);
    }
  };

  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "phone") {
      setPhone(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "role") {
      setRole(e.target.value.toLowerCase());
    }
  };

  const handleCustomerSubmit = async () => {
    const customer = {
      phone,
      password,
      role,
    };
    console.log("The customer is : ", customer);
    try {
      axios
        .post("/api/users/user", customer, {
          headers: {
            Authorization: Cookies.get("token"),
          },
        })
        .then((res) => {
          console.log(res);
          setCustomers(res.data.users);
        });
    } catch (error) {
      console.log("Error creating customer:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h2 className="text-xl font-bold mb-4">Customers List</h2>
      <div className="max-h-60 overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr>
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
              onChange={(e) => onFieldChange(e)}
              name="phone"
              placeholder="Customer Phone"
              type="text"
              className="border border-gray-300 rounded px-4 py-2 mb-2"
            />
            <input
              onChange={(e) => onFieldChange(e)}
              name="password"
              placeholder="Password"
              type="text"
              className="border border-gray-300 rounded px-4 py-2 mb-2"
            />
          </div>
          <select
            value={role}
            name="role"
            onChange={(e) => onFieldChange(e)}
            className="border border-gray-300 rounded px-4 py-2 mr-2"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="mt-4">
          <SubmitButton onClick={() => handleCustomerSubmit()}>
            Add Customer or Admin
          </SubmitButton>
        </div>
      </div>
    </div>
  );
};

export default CustomersList;
