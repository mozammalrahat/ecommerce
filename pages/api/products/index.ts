import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";

const filePath = path.join(process.cwd(), "data", "products.json");

type Product = {
  id: number;
  name: string;
  price: string;
  imageSrc: string;
  quantity: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  } else {
    try {
      let products: Product[] = [];
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, "utf-8");
        products = fileData ? JSON.parse(fileData) : [];
      }

      res.status(200).json({ products });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
