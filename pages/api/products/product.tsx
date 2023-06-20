import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";

const filePath = path.join(process.cwd(), "data", "products.json");

type Product = {
  id: number;
  name: string;
  price: string;
  imageSrc: string;
  color: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  } else {
    try {
      const product = req.body;
      console.log("product", req.body);

      if (!product) {
        return res.status(400).json({ message: "Product data is missing" });
      }

      let products: Product[] = [];
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, "utf-8");
        products = fileData ? JSON.parse(fileData) : [];
      }

      const newProduct: Product = {
        id: Date.now(),
        name: product.name,
        price: product.price,
        imageSrc:
          "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
        color: product.color,
      };
      console.log("newProduct", newProduct);
      products.push(newProduct);

      fs.writeFileSync(filePath, JSON.stringify(products));

      res.status(200).json({ message: "Product saved successfully", products });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
