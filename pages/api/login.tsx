import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import path from "path";
import fs from "fs";

const filePath = path.join(process.cwd(), "data", "users.json");

interface User {
  phone: string;
  password: string;
  role?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("File Path is: ", filePath);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  } else {
    try {
      const { phone, password } = req.body;

      let users: User[] = [];
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, "utf-8");
        users = fileData ? JSON.parse(fileData) : [];
      }

      const existingUser = users.find((user: User) => user.phone === phone);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { phone, password: existingUser.password },
        process.env.JWT_SECRET || "REPLIQ",
        { expiresIn: "1d" }
      );

      res.status(200).json({ token });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
