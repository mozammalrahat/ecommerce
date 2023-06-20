import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";

const filePath = path.join(process.cwd(), "data", "orders.json");

interface User {
  phone: string;
  password: string;
  role?: string;
}
type Product = {
  id: number;
  name: string;
  price: string;
  imageSrc: string;
  quantity: number;
};

type Order = {
  phone: string;
  role: string;
  name: string;
  address: string;
  cart: Product[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  } else {
    try {
      let orders: Order[] = [];
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, "utf-8");
        orders = fileData ? JSON.parse(fileData) : [];
      }
      console.log("order", orders);

      orders.forEach((order) => {
        order.totalPrice = calculateTotalPrice(order.cart);
        order.totalQuantity = calculateTotalQuantity(order.cart);
      });

      res.status(200).json({ orders });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

const calculateTotalPrice = (cart: Product[]): number => {
  return cart.reduce((total, product) => {
    const price = parseFloat(product.price.replace("$", ""));
    return total + price * product.quantity;
  }, 0);
};

const calculateTotalQuantity = (cart: Product[]): number => {
  return cart.reduce((total, product) => total + product.quantity, 0);
};
