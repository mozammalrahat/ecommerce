import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "orders.json");
const customersFilePath = path.join(process.cwd(), "data", "users.json");
const productsFilePath = path.join(process.cwd(), "data", "products.json");

type Order = {
  id: string;
  customerId: string;
  phone: string;
  items: Product[];
  totalPrice: string;
  status: string;
};

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
};

type Product = {
  id: number;
  name: string;
  price: string;
  imageSrc: string;
  quantity: number;
};

type Summary = {
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Summary>
) {
  const ordersData = readJsonFile<Order[]>(filePath);
  const customersData = readJsonFile<Customer[]>(customersFilePath);
  const productsData = readJsonFile<Product[]>(productsFilePath);

  const totalOrders = ordersData.length;
  const totalCustomers = customersData.length;
  const totalProducts = productsData.length;

  const summary: Summary = {
    totalOrders,
    totalCustomers,
    totalProducts,
  };

  res.status(200).json(summary);
}

function readJsonFile<T>(filePath: string): T {
  const fileData = fs.readFileSync(filePath, "utf-8");
  return fileData ? JSON.parse(fileData) : [];
}
