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
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  } else {
    try {
      const order = req.body;

      let orders: Order[] = [];
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, "utf-8");
        orders = fileData ? JSON.parse(fileData) : [];
      }
      console.log("order", order);
      order.id = Date.now();
      orders.push(order);

      fs.writeFileSync(filePath, JSON.stringify(orders));

      res.status(200).json({ message: "Order Placed Successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
